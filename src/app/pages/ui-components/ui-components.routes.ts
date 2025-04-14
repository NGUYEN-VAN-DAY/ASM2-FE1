import { Routes } from '@angular/router';
// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';

import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { UserListComponent } from './user-list/user-list.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'purchase-history',
        component: PurchaseHistoryComponent
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'edit-category',
        component: EditCategoryComponent,
      },
      {
        path: 'edit-product',
        component: EditProductComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
    ],
  },
];
