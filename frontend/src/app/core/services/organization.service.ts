import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { OrganizationModel } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private router: Router,
    private http: HttpClient) { }


  add(organization: OrganizationModel) {
    return this.http.post<OrganizationModel>(`${environment.apiUrl}/organization/`, organization);
  }

  getAll() {
    return this.http.get<OrganizationModel>(`${environment.apiUrl}/organization/`);
  }

  getById(id: string) {
    return this.http.get<OrganizationModel>(`${environment.apiUrl}/organization/` + id);
  }

  update(organization: OrganizationModel) {
    return this.http.patch<OrganizationModel>(`${environment.apiUrl}/organization/`, organization);
  }

  delete(id: string) {
    return this.http.delete<OrganizationModel>(`${environment.apiUrl}/organization/` + id);
  }
}
