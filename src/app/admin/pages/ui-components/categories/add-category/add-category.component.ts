import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/admin/services/apis/category.service';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from 'src/app/admin/common/cloudinary.service';
@Component({
  selector: 'app-add-category',
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  imageUrl: string = "";

  constructor(private CategoryService: CategoryService, private router: Router,     private cloudinary: CloudinaryService) {

  }
  formData = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)


    ]),
    image: new FormControl('', [
      Validators.required,



    ]),
    status: new FormControl('', [
      Validators.required,



    ]),
  })
  /// lưu file lên host
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cloudinary.uploadImage(file).subscribe((res: any) => {
        console.log('Uploaded:', this.imageUrl);

    return    this.imageUrl = res.secure_url;
      });
    }
  }
  
  get name() {
    return this.formData.get("name");
  }
  get image() {
    // console.log("ảnhghh",this.imageUrl);
    
    return this.imageUrl;
  }
  get status() {
    return this.formData.get("status");
  }
  onSubmit(){
    console.log("dljnf",this.imageUrl);
    
  }
  add() {
    const name = this.formData.get('name')?.value;
    const image = this.imageUrl;
    // console.log("link ảnh:", image);
    
    const status = this.formData.get('status')?.value;
    const payload = { name, image, status };

    this.CategoryService.addCategories(payload).subscribe({
      next: (res: any) => {
        this.router.navigate(['/ui-components/categories']);

      },

    })

  }

}
