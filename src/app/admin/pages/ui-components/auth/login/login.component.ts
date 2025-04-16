import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertShowcaseComponent } from 'src/app/admin/common/alert.component';
import { IAlertMessage } from 'src/app/admin/interface/alert-message.interface';
import { AuthService } from 'src/app/admin/services/apis/auth.service';



import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, AlertShowcaseComponent ,RouterModule,MaterialModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formData!: FormGroup;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }
  handleLogin() {

    if (this.formData.valid) {
      this.auth.login(this.formData.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            localStorage.setItem('token', res.token ?? '');
            this.router.navigate(['/']).then();
            // this.spinner.hide();
          },
          error: () => {
            this.alertMessages = [{status: 'warning', message: 'Tài khoản hoặc mật khẩu không chính xác'}];
          }
        });
    }
  }


  get email() {
    return this.formData.get('email');
  }

  get password() {
    return this.formData.get('password');
  }
}
