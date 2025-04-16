import { Routes } from '@angular/router';
import { BlankComponent } from './admin/layouts/blank/blank.component';
import { FullComponent } from './admin/layouts/full/full.component';
import { AddProductComponent } from './admin/pages/ui-components/products/add-product/add-product.component';
import { EditProductComponent } from './admin/pages/ui-components/products/edit-product/edit-product.component';
import { EditCategoryComponent } from './admin/pages/ui-components/categories/edit-category/edit-category.component';
import { AddCategoryComponent } from './admin/pages/ui-components/categories/add-category/add-category.component';
export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./admin/pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./admin/pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./admin/pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  
  // {
  //   path: '',
  //   component: BlankComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: () =>
  //         import('./admin/pages/authentication/authentication.routes').then(
  //           (m) => m.AuthenticationRoutes
  //         ),
  //     },
  //   ],
  // },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
  //  {
  //     path: "add-product",
  //     component: AddProductComponent
  //   },
  //   {
  //     path: "add-category",
  //     component: AddCategoryComponent
  //   },
  //   {
  //     path: "edit-product",
  //     component: EditProductComponent
  //   }, {
  //     path: "edit-category",
  //     component: EditCategoryComponent
  //   }
];
