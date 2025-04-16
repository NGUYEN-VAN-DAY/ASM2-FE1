import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Thống kê',
  },
  {
    displayName: 'Biểu đồ',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard',
  },


  {
    navCap: 'Điều khiển',
    divider: true
  },
  {
    displayName: 'Danh sách sản phẩm',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/products',
  },
  {
    displayName: 'Danh sách danh mục',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/categories',
  },
  {
    displayName: 'Danh sách người dùng',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/user-list',
  },
  {
    displayName: 'Quản lí bình luận',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Lịch sử mua hàng',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/purchase-history',
  },
  {
    displayName: 'Vận chuyển',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  // {
  //   displayName: 'Tables',
  //   iconName: 'solar:tablet-line-duotone',
  //   route: '/ui-components/tables',
  // },
 

  // {
  //   navCap: 'Extra',
  //   divider: true
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'solar:sticker-smile-circle-2-line-duotone',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'solar:planet-3-line-duotone',
  //   route: '/extra/sample-page',
  // },

  // {
  //   divider: true,
  //   navCap: 'Forms',
  // },
  
 

  // {
  //   divider: true,
  //   navCap: 'Auth',
  // },
  {
    displayName: 'Đăng nhập',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/login',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/ui-components/login',
      },
    
    ],
  },
  {
    displayName: 'Đăng ký',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
     
    ],
  },
 
  
];
