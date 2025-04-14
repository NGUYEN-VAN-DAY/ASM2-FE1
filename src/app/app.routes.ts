import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AddProductComponent } from './pages/ui-components/products/add-product/add-product.component';
import { AddCategoryComponent } from './pages/ui-components/categories/add-category/add-category.component';
import { EditProductComponent } from './pages/ui-components/products/edit-product/edit-product.component';
import { EditCategoryComponent } from './pages/ui-components/categories/edit-category/edit-category.component';

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
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
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
