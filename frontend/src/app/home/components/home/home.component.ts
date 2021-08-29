import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  basicData: any;
  multiAxisData: any;
  multiAxisOptions: any;
  lineStylesData: any;
  basicOptions: any;
  orgCount: number = 0;
  depCount: number = 0;
  empCount: number = 0;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getReports();
  }

  public getReports = () => {
    this.accountService.getCounts()
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          if (data && data.counts) {
            // data for tiles
            this.orgCount = data.counts.orgCount;
            this.depCount = data.counts.depCount;
            this.empCount = data.counts.empCount;
          }
          if (data && data.reports) {
            this.organizeChart(data);
          }
        },
        error: error => {
          console.log(error);
          alert("Something went wrong while fetching data");
        }
      });
  }

  public organizeChart = (data: any) => {
    var lastMonth = new Date();
    lastMonth.setMonth(new Date().getMonth() - 1);
    let reports = data.reports;
    let dateLabels: any = [];
    let orgData: any = [];
    let depData: any = [];
    let empData: any = [];
    while (lastMonth < new Date()) {
      dateLabels.push(lastMonth.toLocaleDateString());
      // seggregte data based on dates in past month
      orgData.push(reports.orgReport.filter((x: any) => new Date(x.createdAt).toDateString() == lastMonth.toDateString()).length);
      depData.push(reports.depReport.filter((x: any) => new Date(x.createdAt).toDateString() == lastMonth.toDateString()).length);
      empData.push(reports.empReport.filter((x: any) => new Date(x.createdAt).toDateString() == lastMonth.toDateString()).length);
      lastMonth.setDate(lastMonth.getDate() + 1);
    }

    this.lineStylesData = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Organizations',
          data: orgData,
          fill: false,
          borderColor: '#42A5F5'
        },
        {
          label: 'Departments',
          data: depData,
          fill: false,
          borderColor: '#66BB6A'
        },
        {
          label: 'Employees',
          data: empData,
          fill: false,
          borderColor: '#A52A2A'
        }
      ]
    };
  }
}
