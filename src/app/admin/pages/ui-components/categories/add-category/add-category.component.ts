import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from 'src/app/admin/common/cloudinary.service';
import { IAlertMessage } from 'src/app/admin/interface/alert-message.interface';
import { AlertShowcaseComponent } from 'src/app/admin/common/alert.component';

@Component({
  selector: 'app-add-category',
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule, AlertShowcaseComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  imageUrl: string = '';
  imageUploading: boolean = false;
    alertMessages: IAlertMessage[] = [];

  constructor(
    private CategoryService: CategoryService,
    private router: Router,
    private cloudinary: CloudinaryService
  ) {}

  formData = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    image: new FormControl('', [
      Validators.required
    ]),
    status: new FormControl('', [
      Validators.required
    ])
  });

  // Xử lý upload ảnh
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUploading = true;
      try {
        const res: any = await this.cloudinary.uploadImage(file).toPromise();
        this.imageUrl = res.secure_url;
        console.log('Uploaded:', this.imageUrl);
        this.imageUploading = false;
      } catch (err) {
        console.error('Upload thất bại:', err);
        this.imageUploading = false;
      }
    }
  }

  get name() {
    return this.formData.get('name');
  }

  get image() {
    return this.imageUrl;
  }

  get status() {
    return this.formData.get('status');
  }
onSubmit(){

}
  async add() {
    // Nếu ảnh đang upload thì không cho submit
    if (this.imageUploading) {
      this.alertMessages = [{status: 'warning', message: 'Vui lòng đợi tải ảnh lên'}]
      return;
    }

    const name = this.name?.value;
    const image = this.imageUrl;
    const status = this.status?.value;
    const payload = { name, image, status };

    this.CategoryService.addCategories(payload).subscribe({
      next: (res: any) => {
        this.router.navigate(['/ui-components/categories']);
      },
       error: () => {
            this.alertMessages = [{status: 'danger', message: 'lỗi'}];
          }
    });
  }
}
