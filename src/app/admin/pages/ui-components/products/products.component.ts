import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterModule } from '@angular/router';
import { ICategory } from 'src/app/admin/interface/category.interface';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { DeleteCategoryComponent } from '../categories/delete-category/delete-category.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule,RouterModule,MatDialogModule,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
list: ICategory[] = []
  readonly dialog = inject(MatDialog);

  constructor(private categoryService: CategoryService,
  ) {
    this.getAll();

  }

  getAll() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;
        console.log("data nè",this.list);

      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    })
  }
  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
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
