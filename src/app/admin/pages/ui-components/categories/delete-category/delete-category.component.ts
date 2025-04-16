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
import { CategoryService } from 'src/app/admin/services/apis/category.service';
export interface DialogData {
  id: number;
  name: string;
}
@Component({
  selector: 'app-delete-category',
  imports: [MatDialogModule],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss'
})

export class DeleteCategoryComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteCategoryComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor(private CategoryService: CategoryService) {

  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  delete() {
    console.log(this.data.id);
    this.CategoryService.deleteCategory(this.data.id).subscribe({
      next: (res: any) => {
        this.dialogRef.close(true);
      },

    })

  }
}
