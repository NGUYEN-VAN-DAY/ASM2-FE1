import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { CloudinaryService } from 'src/app/admin/common/cloudinary.service';
import { IAlertMessage } from 'src/app/admin/interface/alert-message.interface';
import { AlertShowcaseComponent } from 'src/app/admin/common/alert.component';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
@Component({
  selector: 'app-edit-category',
  imports: [AlertShowcaseComponent, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  imageUrl: string = '';
  imageUploading: boolean = false;
  alertMessages: IAlertMessage[] = [];
  categoryId: string = '';

  // Khai báo form group
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

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cloudinary: CloudinaryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';  // Lấy id từ URL

    if (this.categoryId) {
      this.loadCategory();  // Load dữ liệu của danh mục theo ID
    }
  }

  // Lấy thông tin danh mục từ API
  loadCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res: any) => {
        if (res) {
          // Cập nhật tất cả các trường trong form
          this.formData.setValue({
            name: res.name,
            image: res.image,
            status: res.status
          });
          this.imageUrl = res.image;  // Đặt lại URL ảnh
        } else {
          this.alertMessages = [{ status: 'danger', message: 'Không tìm thấy danh mục này' }];
        }
      },
      error: (err) => {
        this.alertMessages = [{ status: 'danger', message: 'Không thể tải dữ liệu danh mục. Lỗi: ' + err.message }];
      }
    });
  }

  // Xử lý upload ảnh
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUploading = true;
      try {
        const res: any = await this.cloudinary.uploadImage(file).toPromise();
        this.imageUrl = res.secure_url;
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

  // Phương thức sửa danh mục
  async update() {
    // Nếu ảnh đang upload thì không cho submit
    if (this.imageUploading) {
      this.alertMessages = [{ status: 'warning', message: 'Vui lòng đợi tải ảnh lên' }];
      return;
    }

    const name = this.name?.value;
    const image = this.imageUrl;
    const status = this.status?.value;
    const payload = { name, image, status };

    this.categoryService.updateCategory(this.categoryId, payload).subscribe({
      next: (res: any) => {
        this.alertMessages = [{ status: 'success', message: 'Cập nhật danh mục thành công!' }];
        setTimeout(() => {
          this.router.navigate(['/ui-components/categories']);
        }, 3000); // Redirect after 3 seconds
      },
      error: (err) => {
        this.alertMessages = [{ status: 'danger', message: 'Cập nhật danh mục thất bại. Lỗi: ' + err.message }];
      }
    });
  }
}
