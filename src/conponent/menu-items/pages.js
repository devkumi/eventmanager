// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'Reports',
  title: 'Reports',
  // caption: 'Reports Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Credit Reports',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        // {
        //   id: 'util-typography',
        //   title: 'Consumer',
        //   type: 'item',
        //   url: '/utils/utiltypography',
        //   icon: icons.IconTypography,
        //   target: false,
        //   breadcrumbs: false
        // },
        {
          id: 'report-consumer',
          title: 'Consumer',
          type: 'item',
          url: '/reports/consumer',
          icon: icons.IconTypography,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'report-commercial',
          title: 'Commercial',
          type: 'item',
          url: '/reports/commercial',
          icon: icons.IconTypography,
          target: false,
          breadcrumbs: false
        },
        {
          id: 'register2',
          title: 'Mobile',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    }
  ]
};

export default pages;
