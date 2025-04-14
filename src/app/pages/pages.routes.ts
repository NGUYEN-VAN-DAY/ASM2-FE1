import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { NgModule } from '@angular/core';
import { AddProductComponent } from './ui-components/products/add-product/add-product.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
];
