import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordPatternDirective } from '../shared/directives/password-pattern.directive';
import { MatchPasswordDirective } from '../shared/directives/match-password.directive';
import { ValidateUserNameDirective } from '../shared/directives/validate-user-name.directive';
import {MatTableModule} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LayoutComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule
  ]
})
export class AccountModule { }
