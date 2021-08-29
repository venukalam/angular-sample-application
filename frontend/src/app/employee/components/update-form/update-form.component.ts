import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

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
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      organizationName: ['', Validators.required],
      departmentName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      workTitle: ['', Validators.required],
      totalExperience: ['', Validators.required]
    });
    if (this.id) {
      this.getEmployeeDetails();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  public getEmployeeDetails = () => {
    this.employeeService.getById(this.id ? this.id : "")
      .pipe(first())
      .subscribe({
        next: (organization: any) => {
          if (organization && organization.data) {
            let data = organization.data;
            this.registerForm = this.fb.group({
              id: [data._id],
              organizationName: [data.organization_name, Validators.required],
              departmentName: [data.department_name, [Validators.required]],
              firstName: [data.first_name, [Validators.required]],
              lastName: [data.last_name, Validators.required],
              dob: [data.dob, Validators.required],
              workTitle: [data.work_title, Validators.required],
              totalExperience: [data.total_experience, Validators.required]
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
    this.employeeService.add(this.registerForm.value)
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
    this.employeeService.update(this.registerForm.value)
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
