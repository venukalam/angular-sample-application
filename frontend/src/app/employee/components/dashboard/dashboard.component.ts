import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['organizationName',
    'departmentName',
    'firstName',
    'lastName',
    'dob',
    'workTitle',
    'totalExperience', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmplouyees();
  }

  public getEmplouyees = () => {
    this.employeeService.getAll()
      .pipe(first())
      .subscribe({
        next: (organizations: any) => {
          if (organizations && organizations.data && organizations.data.length) {
            var tableData: Employee[] = [];
            organizations.data.map((org: any) => {
              tableData.push({
                id: org._id,
                organizationName: org.organization_name,
                departmentName: org.department_name,
                firstName: org.first_name,
                lastName: org.last_name,
                dob: org.dob,
                workTitle: org.work_title,
                totalExperience: org.total_experience,
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
    this.router.navigate(['/employee/update', id]);
  }

  public delete = (id: any) => {
    this.employeeService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.getEmplouyees();
          alert("succesfully deleted");
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while deleting");
        }
      });
  }
}
