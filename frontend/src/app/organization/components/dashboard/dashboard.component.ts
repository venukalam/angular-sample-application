import { Component, OnInit } from '@angular/core';
import { OrganizationModel } from 'src/app/core/models/organization.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['organizationName', 'owner', 'address', 'city', 'state', 'country', 'edit', 'delete'];
  dataSource = new MatTableDataSource<OrganizationModel>();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  public getOrganizations = () => {
    this.organizationService.getAll()
      .pipe(first())
      .subscribe({
        next: (organizations: any) => {
          if (organizations && organizations.data && organizations.data.length) {
            var tableData: OrganizationModel[] = [];
            organizations.data.map((org: any) => {
              tableData.push({
                id: org._id,
                organizationName: org.organization_name,
                owner: org.owner, address: org.address,
                city: org.city, state: org.state,
                country: org.country
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
    this.router.navigate(['/organization/update', id]);
  }

  public delete = (id: any) => {
    this.organizationService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          alert("succesfully deleted");
          this.getOrganizations();
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while deleting");
        }
      });
  }
}
