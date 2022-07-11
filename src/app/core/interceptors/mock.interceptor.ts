import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EMPLOYEES } from '../constants/mock.constants';
import { Employee, EmployeesResponse } from '../models/emloyee.model';
import { MS_IN_HOUR, NORMAL_SHIFT } from '../constants/time.constants';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private employeesResponse!: EmployeesResponse;

  constructor() {
    this.updateAgregateValues();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.method, request.url);
    if (request.method === 'GET' && request.url === 'employees') {
      return of(new HttpResponse({ status: 200, body: this.employeesResponse })).pipe(delay(500));
    }
    if (request.method === 'PUT' && request.url === 'employees') {
      request.body?.employees?.forEach((employee: Employee) => {
        const index = this.employeesResponse.employees.findIndex((x: Employee) => employee.id = x.id);
        if (index !== -1) {
          this.employeesResponse.employees[index] = employee;
        }
      });
      this.updateAgregateValues();
      return of(new HttpResponse({ status: 200, body: null })).pipe(delay(500));
    }
    return of(new HttpResponse({ status: 400, body: null })).pipe(delay(500));
  }

  updateAgregateValues() {
    const employees = EMPLOYEES.map((employee: Employee) => {
      return {...employee, ...this.getAggregateEmployeeInfo(employee)}
    })
    const summary = employees.reduce((previous, current) => {
      return {
        totalEmployees: previous.totalEmployees + 1,
        totalClockedInTime: previous.totalClockedInTime + (current.totalClockedInTime ?? 0),
        totalAmountRegular: previous.totalAmountRegular + (current.totalAmountRegular ?? 0) / MS_IN_HOUR * current.hourlyRate,
        totalAmountOvertime: previous.totalAmountOvertime + (current.totalAmountOvertime ?? 0) / MS_IN_HOUR * current.overtimeHourlyRate,
      }
    }, {
      totalEmployees: 0,
      totalClockedInTime: 0,
      totalAmountRegular: 0,
      totalAmountOvertime: 0,
    });
    this.employeesResponse = {
      summary,
      employees,
    }
  }

  getAggregateEmployeeInfo(x: Employee) {
    return x.shifts.reduce((previous, current) => {
      const workTime = current.clockOut.getTime() - current.clockIn.getTime();
      return {
        totalClockedInTime: previous.totalClockedInTime + workTime,
        totalAmountRegular: previous.totalAmountRegular + (workTime > NORMAL_SHIFT ? NORMAL_SHIFT : workTime),
        totalAmountOvertime: previous.totalAmountOvertime + (workTime > NORMAL_SHIFT ? workTime - NORMAL_SHIFT : 0),
      }
    }, {
      totalClockedInTime: 0,
      totalAmountRegular: 0,
      totalAmountOvertime: 0,
    });
  }
}
