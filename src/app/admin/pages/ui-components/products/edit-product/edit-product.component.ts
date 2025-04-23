import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/admin/interface/product.interface';
import { ICategory } from 'src/app/admin/interface/category.interface';
import { productService } from 'src/app/admin/services/apis/product.service';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { CloudinaryService } from 'src/app/admin/common/cloudinary.service';
import { AlertShowcaseComponent } from 'src/app/admin/common/alert.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertShowcaseComponent],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  formData!: FormGroup;
  imageUrl: string = '';
  imageUploading: boolean = false;
  alertMessages: any[] = [];
  categories: ICategory[] = [];
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: productService,
    private categoryService: CategoryService,
    private cloudinaryService: CloudinaryService
  ) {}

  ngOnInit() {
    // Lấy productId từ URL
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategories();
    this.loadProduct();

    // Khởi tạo form
    this.formData = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      salePrice: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      longDescription: new FormControl(''),
      images: new FormControl('') // for preview
    });
  }

  // Hàm tải danh mục sản phẩm
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res?.data ?? res;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  // Hàm tải sản phẩm để chỉnh sửa
  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res: IProduct) => {
        this.imageUrl = res.images;

        // Ép kiểu price và salePrice thành số để xử lý chính xác trong form
        const patchedData = {
          ...res,
          price: Number(res.price),   // Ép kiểu price thành number
          salePrice: Number(res.salePrice),  // Ép kiểu salePrice thành number
          status: String(res.status), // Chuyển đổi trạng thái thành chuỗi nếu là boolean
        };

        // Cập nhật giá trị vào form
        this.formData.patchValue(patchedData);
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  // Hàm xử lý upload ảnh
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

  // Hàm xử lý submit form
  onSubmit() {
    if (this.formData.invalid) {
      this.alertMessages = [{ status: 'danger', message: 'Vui lòng điền đầy đủ thông tin.' }];
      return;
    }

    const updatedProduct: IProduct = {
      ...this.formData.value,
      price: Number(this.formData.value.price), // Ép kiểu price thành number
      salePrice: Number(this.formData.value.salePrice), // Ép kiểu salePrice thành number
      images: this.imageUrl, // Đảm bảo giữ lại URL ảnh
    };

    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: () => {
        this.router.navigate(['/ui-components/products']);
      },
      error: (err) => {
        this.alertMessages = [{ status: 'danger', message: 'Cập nhật sản phẩm thất bại.' }];
        console.error('Error updating product:', err);
      }
    });
  }
}
