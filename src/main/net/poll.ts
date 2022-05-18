import { net } from 'electron';
import queryString from 'query-string';

interface TasksInfo {
  success: boolean;
  data?: {
    offset: number;
    tasks: {
      id: string;
      size: number;
      status: string;
      title: string;
      type: string;
      username: string;
    }[];
    total: number;
  };
}

interface TasksDetailInfo {
  success: boolean;
  data?: {
    tasks: {
      id: string;
      size: number;
      status: string;
      title: string;
      type: string;
      username: string;
      additional: {
        detail: {
          completed_time: number;
          connected_leechers: number;
          connected_peers: number;
          connected_seeders: number;
          create_time: number;
          destination: string;
          hash: string;
          lastSeenComplete: number;
          priority: string;
          seedelapsed: number;
          started_time: number;
          total_peers: number;
          total_pieces: number;
          unzip_password: string;
          uri: string;
          waiting_seconds: number;
        };
        transfer: {
          downloaded_pieces: number;
          size_downloaded: number;
          size_uploaded: number;
          speed_download: number;
          speed_upload: number;
        };
        seconds_left: number | unknown;
      };
    }[];
  };
}

// ---------------------------------------------------------------------------------------------------------------------

async function requestTasks(args: { host: string; port: number; sid: string }) {
  const { host, port, sid } = args;

  const params = {
    api: 'SYNO.DownloadStation.Task',
    version: 3,
    method: 'list',
  };

  const options = {
    method: 'GET',
    protocol: 'https:',
    hostname: host,
    port,
    path: `webapi/DownloadStation/task.cgi?${queryString.stringify(params)}`,
    headers: {
      cookie: `type=tunnel; Path=/; id=${sid}`,
    },
  };

  return new Promise<TasksInfo>((resolve) => {
    const request = net.request(options);

    setTimeout(() => {
      request.abort();
      resolve({ success: false });
    }, 3000);

    request.on('error', () => {
      console.log(`main: bad request https://${host}/webapi/DownloadStation/task.cgi?${queryString.stringify(params)}`);
      resolve({ success: false });
    });

    request.on('response', (response: Electron.IncomingMessage) => {
      response.on('data', (chunk: Buffer) => {
        try {
          const parsed: TasksInfo = JSON.parse(chunk.toString());
          resolve(parsed);
        } catch {
          resolve({ success: false });
        }
      });
    });

    request.end();
  });
}

// ---------------------------------------------------------------------------------------------------------------------

async function requestTasksDetail(args: { host: string; port: number; sid: string; taskID: string }) {
  const { host, port, sid, taskID } = args;

  const params = {
    api: 'SYNO.DownloadStation.Task',
    version: 3,
    method: 'getinfo',
    id: taskID,
    additional: 'detail,transfer',
  };

  const options = {
    method: 'GET',
    protocol: 'https:',
    hostname: host,
    port,
    path: `webapi/DownloadStation/task.cgi?${queryString.stringify(params)}`,
    headers: {
      cookie: `type=tunnel; Path=/; id=${sid}`,
    },
  };

  return new Promise<TasksDetailInfo>((resolve) => {
    const request = net.request(options);

    setTimeout(() => {
      resolve({ success: false });
    }, 3000);

    request.on('error', () => {
      console.log(`main: bad request https://${host}/webapi/DownloadStation/task.cgi?${queryString.stringify(params)}`);
      resolve({ success: false });
    });

    request.on('response', (response: Electron.IncomingMessage) => {
      response.on('data', (chunk: Buffer) => {
        try {
          const parsed: TasksDetailInfo = JSON.parse(chunk.toString('utf8'));

          parsed.data?.tasks.forEach((task) => {
            const SIZE_LEFT = task.size - task.additional.transfer.size_downloaded;
            const SECENDS_LEFT = SIZE_LEFT / task.additional.transfer.speed_download;
            task.additional.seconds_left = Math.round(SECENDS_LEFT) ?? 0;
          });

          resolve(parsed);
        } catch {
          resolve({ success: false });
        }
      });
    });

    request.end();
  });
}

// ---------------------------------------------------------------------------------------------------------------------

export default async function poll(args: { host: string; port: number; sid: string }) {
  const { host, port, sid } = args;
  if (!(host || port || sid)) {
    return { success: false };
  }

  const tasks = await requestTasks(args);

  if (!tasks.success) {
    return { success: false };
  }

  const getIDs = () => {
    const ids: string[] = [];
    tasks.data?.tasks.forEach((task) => {
      ids.push(task.id);
    });
    return ids.toString();
  };

  const taskDetail = await requestTasksDetail({
    host,
    port,
    sid,
    taskID: getIDs(),
  });

  if (!taskDetail.success) {
    return { success: false };
  }

  return taskDetail;
}
