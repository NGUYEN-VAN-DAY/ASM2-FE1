import { Component, inject } from '@angular/core';

import { CoreService } from 'src/app/admin/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IUser } from 'src/app/admin/interface/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { userService } from 'src/app/admin/services/apis/user.service';
@Component({
  selector: 'app-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  list: IUser[] = []
  readonly dialog = inject(MatDialog);
   constructor(private userService: userService,
    ) {

  
    }
}
