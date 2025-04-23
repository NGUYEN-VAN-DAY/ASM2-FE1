
import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,MatDialogModule,
} from '@angular/material/dialog';
import {productService } from 'src/app/admin/services/apis/product.service';
export interface DialogData {
  id: number;
  name: string;
}
@Component({
  selector: 'app-delete-product',
  imports: [MatDialogModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
readonly dialogRef = inject(MatDialogRef<DeleteProductComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor(private ProductService: productService) {

  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  delete() {
    console.log(this.data.id);
    this.ProductService.deleteProduct(this.data.id).subscribe({
      next: (res: any) => {
        this.dialogRef.close(true);
      },

    })

  }
}
