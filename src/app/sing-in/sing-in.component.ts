import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'sign-in',
  templateUrl: 'sing-in.component.html',
  styleUrls: ['sing-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl('', Validators.minLength(2)),
    });
  }

  submit() {
    if (!this.signInForm.valid) {
      return;
    }
    this.signIn();
  }

  signIn(): void {
    try {
      this.accountService.logIn(
        this.signInForm.controls.email.value,
        this.signInForm.controls.password.value
      );
      this.router.navigate(['dog-search'], { relativeTo: this.route });
    } catch (err) {
      this._snackBar.open(err.message, 'Close');
    }
  }

  cancel(): void {
    this.signInForm.reset();
    this.router.navigate(['sign-up']);
  }
}
