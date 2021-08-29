import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private router: Router,
    private http: HttpClient) { }

  

  add(department: Department) {
    return this.http.post<Department>(`${environment.apiUrl}/department/`, department);
  }

  getAll() {
    return this.http.get<Department>(`${environment.apiUrl}/department/`);
  }

  getById(id: string) {
    return this.http.get<Department>(`${environment.apiUrl}/department/` + id);
  }

  update(department: Department) {
    return this.http.patch<Department>(`${environment.apiUrl}/department/`, department);
  }

  delete(id: string) {
    return this.http.delete<Department>(`${environment.apiUrl}/department/` + id);
  }
}
