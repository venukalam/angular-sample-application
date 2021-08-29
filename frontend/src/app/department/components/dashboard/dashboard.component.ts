import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DepartmentService } from 'src/app/core/services/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../core/models/department.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['organizationName',
    'departmentOwner',
    'description',
    'workingTime',
    'workingDays', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Department>();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  public getDepartments = () => {
    this.departmentService.getAll()
      .pipe(first())
      .subscribe({
        next: (organizations: any) => {
          if (organizations && organizations.data && organizations.data.length) {
            var tableData: Department[] = [];
            organizations.data.map((dep: any) => {
              tableData.push({
                id: dep._id,
                organizationName: dep.organization_name,
                departmentOwner:dep.department_owner,
                description:dep.description,
                workingDays:dep.working_days,
                workingTime:dep.working_time
              })
            });
            this.dataSource.data = tableData;
          } else {
            this.dataSource.data = [];
          }
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while registering");
        }
      });
  }

  public edit = (id: any) => {
    this.router.navigate(['/department/update', id]);
  }

  public delete = (id: any) => {
    this.departmentService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          alert("succesfully deleted");
          this.getDepartments();
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while deleting");
        }
      });
  }
}
