import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private router: Router,
    private http: HttpClient) { }

  

  add(employee: Employee) {
    return this.http.post<Employee>(`${environment.apiUrl}/employee/`, employee);
  }

  getAll() {
    return this.http.get<Employee>(`${environment.apiUrl}/employee/`);
  }

  getById(id: string) {
    return this.http.get<Employee>(`${environment.apiUrl}/employee/` + id);
  }

  update(employee: Employee) {
    return this.http.patch<Employee>(`${environment.apiUrl}/employee/`, employee);
  }

  delete(id: string) {
    return this.http.delete<Employee>(`${environment.apiUrl}/employee/` + id);
  }
}
