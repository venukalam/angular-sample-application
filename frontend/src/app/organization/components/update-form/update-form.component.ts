import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OrganizationService } from 'src/app/core/services/organization.service';

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
    private organizationService: OrganizationService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      organizationName: ['', Validators.required],
      owner: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });
    if (this.id) {
      this.getOrganizationDetails();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  public getOrganizationDetails = () => {
    this.organizationService.getById(this.id ? this.id : "")
      .pipe(first())
      .subscribe({
        next: (organization: any) => {
          if (organization && organization.data) {
            let data = organization.data;
            this.registerForm = this.fb.group({
              id: [data._id],
              organizationName: [data.organization_name, Validators.required],
              owner: [data.owner, [Validators.required]],
              address: [data.address, [Validators.required]],
              city: [data.city, Validators.required],
              state: [data.state, Validators.required],
              country: [data.country, Validators.required]
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
    this.organizationService.add(this.registerForm.value)
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
    this.organizationService.update(this.registerForm.value)
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
