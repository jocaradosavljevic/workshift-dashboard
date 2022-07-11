import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeesResponse } from 'src/app/core/models/emloyee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getEmployees(): Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>('employees');
  }

  saveEmployees(employees: Employee[]): Observable<any> {
    return this.http.put('employees', employees);
  }

}
