import { atom } from 'jotai';

export interface DsmConnectListType {
  host: string;
  port: number;
  quickConnectID: string;
  username: string;
  did: string;
  sid: string;
}

export interface DSTasks {
  id: string;
  size: number;
  status: string | number;
  title: string;
  type: string;
  username?: string;
  additional?: {
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
    seconds_left: string;
  };
}

export const sidebarWidth = atom<number>(240);

export const tasksRetry = atom<number>(3);

// -----------------------------------------------------------------------------

export const hasYaddsSidebarMarginTopAtom = atom<boolean>(true);

const hasYaddsSidebarAtom = atom<boolean>((window.electron?.store.get('hasYaddsSidebar') as boolean) ?? true);
export const hasYaddsSidebarAtomWithPersistence = atom(
  (get) => get(hasYaddsSidebarAtom),
  (_get, set, newBool: boolean) => {
    set(hasYaddsSidebarAtom, newBool);
    window.electron.store.set('hasYaddsSidebar', newBool);
  }
);

const yaddsSidebarCategoryAtom = atom<string>(
  (window.electron?.store.get('yaddsSidebarCategory') as string) ?? '/queueAll'
);
export const yaddsSidebarCategoryAtomWithPersistence = atom(
  (get) => get(yaddsSidebarCategoryAtom),
  (_get, set, newStr: string) => {
    set(yaddsSidebarCategoryAtom, newStr);
    window.electron.store.set('yaddsSidebarCategory', newStr);
  }
);

const yaddsAppearanceAtom = atom<string>((window.electron?.store.get('yaddsAppearance') as string) ?? 'system');
export const yaddsAppearanceAtomWithPersistence = atom(
  (get) => get(yaddsAppearanceAtom),
  (_get, set, newStr: string) => {
    set(yaddsAppearanceAtom, newStr);
    window.electron.store.set('yaddsAppearance', newStr);
  }
);

const yaddsI18nCodeAtom = atom<string>((window.electron?.store.get('yaddsI18nCode') as string) ?? 'en');
export const yaddsI18nCodeAtomWithPersistence = atom(
  (get) => get(yaddsI18nCodeAtom),
  (_get, set, newStr: string) => {
    set(yaddsI18nCodeAtom, newStr);
    window.electron.store.set('yaddsI18nCode', newStr);
  }
);

const isYaddsAutoLaunchAtom = atom<boolean>((window.electron?.store.get('isYaddsAutoLaunch') as boolean) ?? false);
export const isYaddsAutoLaunchAtomWithPersistence = atom(
  (get) => get(isYaddsAutoLaunchAtom),
  (_get, set, newBool: boolean) => {
    set(isYaddsAutoLaunchAtom, newBool);
    window.electron.store.set('isYaddsAutoLaunch', newBool);
  }
);

const isYaddsAutoUpdateAtom = atom<boolean>((window.electron?.store.get('isYaddsAutoUpdate') as boolean) ?? true);
export const isYaddsAutoUpdateAtomWithPersistence = atom(
  (get) => get(isYaddsAutoUpdateAtom),
  (_get, set, newBool: boolean) => {
    set(isYaddsAutoUpdateAtom, newBool);
    window.electron.store.set('isYaddsAutoUpdate', newBool);
  }
);

// -----------------------------------------------------------------------------

const dsmConnectListAtom = atom<DsmConnectListType[]>(
  (window.electron?.store.get('dsmConnectList') as DsmConnectListType[]) ?? []
);
export const dsmConnectListAtomWithPersistence = atom(
  (get) => get(dsmConnectListAtom),
  (_get, set, newArr: DsmConnectListType[]) => {
    set(dsmConnectListAtom, newArr);
    window.electron.store.set('dsmConnectList', newArr);
  }
);

const dsmConnectIndexAtom = atom<number>(0);
export const dsmConnectIndexAtomWithPersistence = atom(
  (get) => get(dsmConnectIndexAtom),
  (_get, set, newNum: number) => {
    set(dsmConnectIndexAtom, newNum);
    window.electron.store.set('dsmConnectIndex', newNum);
  }
);

// -----------------------------------------------------------------------------

export const tasksAtom = atom<DSTasks[]>([]);

export const tasksStatusAtom = atom({
  isLoading: true,
  retry: 0,
});