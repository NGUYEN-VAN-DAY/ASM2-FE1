import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterModule } from '@angular/router';
import { ICategory } from 'src/app/admin/interface/category.interface';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { DeleteCategoryComponent } from '../categories/delete-category/delete-category.component';
import { IProduct } from 'src/app/admin/interface/product.interface';
import { productService } from 'src/app/admin/services/apis/product.service';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule,RouterModule,MatDialogModule,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
list: IProduct[] = []
  readonly dialog = inject(MatDialog);

  constructor(private productService: productService,
  ) {
    this.getAll();

  }

  getAll() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;
        console.log("data nè",this.list);

      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    })
  }
  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { name: name, id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getAll();
        
      }

    });
  }
}
