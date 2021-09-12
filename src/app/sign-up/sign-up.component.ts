import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/shared/models/account.model';
import { AccountService } from '../services/account.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl('', Validators.minLength(2)),
      passwordConfirm: new FormControl('', Validators.minLength(2)),
    });
  }

  submit() {
    this.passwordMatchValidator();
    if (!this.signUpForm.valid) {
      return;
    }
    this.saveAccount();
  }

  passwordMatchValidator() {
    if (
      this.signUpForm.get('password')?.value !==
      this.signUpForm.get('passwordConfirm')?.value
    ) {
      this.signUpForm.controls.password.setErrors({ mismatch: true });
      this.signUpForm.controls.passwordConfirm.setErrors({ mismatch: true });
    } else {
      this.signUpForm.controls.password.setErrors(null);
      this.signUpForm.controls.passwordConfirm.setErrors(null);
    }
  }

  saveAccount(): void {
    try {
      this.accountService.saveAccount(
        new Account(
          this.signUpForm.controls.firstName.value,
          this.signUpForm.controls.lastName.value,
          this.signUpForm.controls.email.value,
          this.signUpForm.controls.password.value
        )
      );
      this.router.navigate(['dog-search'], { relativeTo: this.route });
    } catch (err) {
      this._snackBar.open(err.message, 'Close');
    }
  }

  cancel(): void {
    this.signUpForm.reset();
    this._snackBar.open('Cleared all fields', 'Close');
  }
}
