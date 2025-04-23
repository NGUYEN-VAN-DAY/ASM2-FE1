import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { productService } from 'src/app/admin/services/apis/product.service';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { ICategory } from 'src/app/admin/interface/category.interface';
import { IProduct } from 'src/app/admin/interface/product.interface';
import { CloudinaryService } from 'src/app/admin/common/cloudinary.service';
import {  ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertShowcaseComponent } from 'src/app/admin/common/alert.component';

@Component({
  selector: 'app-add-product',
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule, AlertShowcaseComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  formData: FormGroup;
  imageUrl: string = '';
  imageUploading: boolean = false;
  alertMessages: any[] = [];
  categories: ICategory[] = [];

  constructor(
    private productService: productService,
    private categoryService: CategoryService,
    private router: Router,
    private cloudinaryService: CloudinaryService
  ) {
    this.formData = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      salePrice: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      longDescription: new FormControl('')
    });

    this.getCategories();  // Load categories when component is initialized
  }

  // Fetch categories from API
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res?.data ?? res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  // Handle file selection for product image upload
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUploading = true;
      try {
        const res: any = await this.cloudinaryService.uploadImage(file).toPromise();
        this.imageUrl = res.secure_url;
        this.imageUploading = false;
      } catch (err) {
        console.error('Upload failed:', err);
        this.imageUploading = false;
      }
    }
  }

  // Form submission handler
  onSubmit() {
    if (this.formData.invalid) {
      this.alertMessages = [{ status: 'danger', message: 'Vui lòng điền đầy đủ thông tin.' }];
      return;
    }

    // Prepare product data to send to the backend
    const productData: IProduct = {
      ...this.formData.value,
      images: this.imageUrl,
    };

    this.productService.addProducts(productData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/ui-components/products']);
      },
      error: (err: any) => {
        this.alertMessages = [{ status: 'danger', message: 'Thêm sản phẩm thất bại. Vui lòng thử lại.' }];
        console.error('Error adding product:', err);
      }
    });
  }
}
