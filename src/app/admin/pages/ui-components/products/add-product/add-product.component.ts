import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertShowcaseComponent } from 'src/app/admin/common/alert.component';
import { IAlertMessage } from 'src/app/admin/interface/alert-message.interface';
import { CloudinaryService } from 'src/app/admin/common/cloudinary.service';
import { CategoryService } from 'src/app/admin/services/apis/category.service';

@Component({
  selector: 'app-add-product',
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule, AlertShowcaseComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
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
      Validators.minLength(6)
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
