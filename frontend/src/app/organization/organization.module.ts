import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { OrganizationRoutingModule } from './organization-routing.module';


@NgModule({
  declarations: [DashboardComponent, UpdateFormComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class OrganizationModule { }
