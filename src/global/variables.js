export const baseUrl = "http://localhost:3001/manageevents";

export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

export const events = [
    {
      name: 'eventName',
      label: 'eventName',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'description',
      label: 'description',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'location',
      label: 'location',
      options: {
        filter: true,
        sort: false
      }
    },
    // {
    //   name: 'username',
    //   label: 'username',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // }
  ];