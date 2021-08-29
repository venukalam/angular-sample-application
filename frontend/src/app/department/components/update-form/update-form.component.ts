import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  id: string | null = this.route.snapshot.paramMap.get('id');
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      organizationName: ['', Validators.required],
      departmentOwner: ['', [Validators.required]],
      description: ['', [Validators.required]],
      workingTime: ['', Validators.required],
      workingDays: ['', Validators.required]
    });
    if (this.id) {
      this.getOrganizationDetails();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  public getOrganizationDetails = () => {
    this.departmentService.getById(this.id ? this.id : "")
      .pipe(first())
      .subscribe({
        next: (organization: any) => {
          if (organization && organization.data) {
            let data = organization.data;
            this.registerForm = this.fb.group({
              id: [data._id],
              organizationName: [data.organization_name, Validators.required],
              departmentOwner: [data.department_owner, [Validators.required]],
              description: [data.description, [Validators.required]],
              workingTime: [data.working_time, Validators.required],
              workingDays: [data.working_days, Validators.required]
            });
          }
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while getting record");
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      if (this.id) {
        this.updateOrganization();
      } else {
        this.addNewOrganization();
      }
    }
  }

  addNewOrganization = () => {
    this.departmentService.add(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert("successfully added")
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while registering");
        }
      });
  }

  updateOrganization = () => {
    this.departmentService.update(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert("successfully updated")
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while registering");
        }
      });
  }
}
