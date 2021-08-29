import { Component, Injector, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account.service';
import { User } from '../../../core/models/user.model';
import { CustomvalidationService } from '../../../shared/services/customvalidation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private customValidator: CustomvalidationService,
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const accountService = this.injector.get(AccountService);
      accountService.register(this.registerForm.value)
        .pipe(first())
        .subscribe({
          next: () => {
            alert("successfully registerd. Login With your credentials")
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: error => {
            console.log(error);
            alert("Something went wrong while registering");
          }
        });
    }
  }

}
