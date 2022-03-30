import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { YaddsCtx } from '../context/YaddsContext';
import SIDEBAR_WIDTH from '../context/sidebarWidth';
import IonShapesOutline from '../components/icons/IonShapesOutline';
import IonShapes from '../components/icons/IonShapes';
import IonArrowDownCircleOutline from '../components/icons/IonArrowDownCircleOutline';
import IonArrowDownCircle from '../components/icons/IonArrowDownCircle';
import IonCheckmarkCircleOutline from '../components/icons/IonCheckmarkCircleOutline';
import IonCheckmarkCircle from '../components/icons/IonCheckmarkCircle';
import IonArrowUpCircleOutline from '../components/icons/IonArrowUpCircleOutline';
import IonArrowUpCircle from '../components/icons/IonArrowUpCircle';
import IonCloseCircleOutline from '../components/icons/IonCloseCircleOutline';
import IonCloseCircle from '../components/icons/IonCloseCircle';
import IonStopCircleOutline from '../components/icons/IonStopCircleOutline';
import IonStopCircle from '../components/icons/IonStopCircle';
import IonCogOutline from '../components/icons/IonCogOutline';
import IcRoundLink from '../components/icons/IcRoundLink';
// import IcRoundLinkOff from '../components/icons/IcRoundLinkOff';
// import EosIconsThreeDotsLoading from '../components/icons/EosIconsThreeDotsLoading';
import IonCog from '../components/icons/IonCog';
import appMenuItemLabelHandler from '../utils/appMenuItemLabelHandler';

interface Category {
  path: string;
  name: string;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
}

const YaddsSidebar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    hasYaddsSidebar,
    hasYaddsSidebarMarginTop,
    setHasYaddsSidebarMarginTop,
    yaddsSidebarCategory,
    persistYaddsSidebarCategory,
    dsmConnectList,
    dsmConnectIndex,
  } = useContext(YaddsCtx);

  const isDarwin = window.electron?.getOS() === 'darwin';

  useLayoutEffect(() => {
    window.electron?.navigateTo(navigate, persistYaddsSidebarCategory); // Init navigation from the top menu
  }, []);

  useLayoutEffect(() => {
    window.electron?.toogleSidebarMarginTop(hasYaddsSidebarMarginTop, setHasYaddsSidebarMarginTop); // handle the margin top of the sidebar

    const appMenuItemLabel = appMenuItemLabelHandler(t, hasYaddsSidebar, hasYaddsSidebarMarginTop);
    window.electron?.setApplicationMenu(appMenuItemLabel); // Init or update application menu
  }, [hasYaddsSidebarMarginTop]);

  const category: Category[] = [
    {
      path: '/queueAll',
      name: t('sidebar.all'),
      activeIcon: <IonShapes />,
      inactiveIcon: <IonShapesOutline />,
    },
    {
      path: '/queueDownloading',
      name: t('sidebar.downloading'),
      activeIcon: <IonArrowDownCircle />,
      inactiveIcon: <IonArrowDownCircleOutline />,
    },
    {
      path: '/queueFinished',
      name: t('sidebar.completed'),
      activeIcon: <IonCheckmarkCircle />,
      inactiveIcon: <IonCheckmarkCircleOutline />,
    },
    {
      path: '/queueActive',
      name: t('sidebar.active'),
      activeIcon: <IonArrowUpCircle />,
      inactiveIcon: <IonArrowUpCircleOutline />,
    },
    {
      path: '/queueInactive',
      name: t('sidebar.inactive'),
      activeIcon: <IonCloseCircle />,
      inactiveIcon: <IonCloseCircleOutline />,
    },
    {
      path: '/queueStopped',
      name: t('sidebar.stopped'),
      activeIcon: <IonStopCircle />,
      inactiveIcon: <IonStopCircleOutline />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      sx={{
        width: SIDEBAR_WIDTH,
        '& .MuiDrawer-paper': {
          backgroundColor: 'transparent',
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      open={hasYaddsSidebar}
    >
      <List
        sx={{
          [(isDarwin && 'mt') as string]: 0,
          ...(hasYaddsSidebarMarginTop && {
            [(isDarwin && 'mt') as string]: theme.spacing(3),
          }),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        {category.map((item: Category) => (
          <ListItem key={item.path}>
            <ListItemButton
              dense
              disableRipple
              selected={yaddsSidebarCategory === item.path}
              sx={{ width: '100%' }}
              onClick={() => {
                persistYaddsSidebarCategory(item.path);
                navigate(item.path);
              }}
            >
              <ListItemIcon sx={{ minWidth: theme.spacing(5), color: theme.palette.text.secondary }}>
                {yaddsSidebarCategory === item.path ? item.activeIcon : item.inactiveIcon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    noWrap
                    variant="button"
                    component="p"
                    fontWeight={600}
                    sx={{
                      mr: theme.spacing(0.5),
                      color:
                        yaddsSidebarCategory === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                    }}
                  >
                    {item.name}
                  </Typography>
                }
              />
              <Typography
                variant="caption"
                fontWeight={500}
                sx={{
                  color: theme.palette.card.default,
                  backgroundColor:
                    yaddsSidebarCategory === item.path ? theme.palette.primary.main : theme.palette.text.disabled,
                  px: theme.spacing(0.5),
                  borderRadius: 0.6,
                }}
              >
                99+
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
          <Stack flexDirection="row" width="100%" pl={theme.spacing(2.5)} pr={theme.spacing(2)}>
            <ListItemText
              primary={
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography
                    noWrap
                    variant="button"
                    component="p"
                    fontWeight={600}
                    color={theme.palette.text.secondary}
                  >
                    {dsmConnectList[dsmConnectIndex]?.host ?? 'null'}
                  </Typography>
                  <IcRoundLink color="success" />
                  {/* <IcRoundLinkOff color="warning" /> */}
                  {/* <EosIconsThreeDotsLoading /> */}
                </Stack>
              }
              secondary={
                <Typography
                  noWrap
                  variant="overline"
                  component="p"
                  fontWeight={600}
                  color={theme.palette.text.secondary}
                >
                  {dsmConnectList[dsmConnectIndex]?.username ?? 'null'}
                </Typography>
              }
            />
          </Stack>
        </ListItem>
        <Divider light sx={{ mb: theme.spacing(1) }} />
        <ListItem>
          <ListItemButton
            disableRipple
            selected={yaddsSidebarCategory === '/settings'}
            sx={{ width: '100%' }}
            onClick={() => {
              persistYaddsSidebarCategory('/settings');
              navigate('/settings');
            }}
          >
            <ListItemIcon sx={{ minWidth: theme.spacing(5), color: theme.palette.text.secondary }}>
              {yaddsSidebarCategory === '/settings' ? <IonCog /> : <IonCogOutline />}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  noWrap
                  variant="button"
                  fontWeight={600}
                  style={{
                    color:
                      yaddsSidebarCategory === '/settings' ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                >
                  {t('sidebar.settings')}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default YaddsSidebar;
