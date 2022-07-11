import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MS_IN_HOUR } from '../../constants/time.constants';
import { EmployeesEditDialog } from '../../dialogs/employees-edit/employees-edit.component';
import { Employee, EmployeesResponse, Summary } from '../../models/emloyee.model';
import { LoaderService } from '../../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['check', 'name', 'email', 'totalClockedInTime', 'totalAmountRegular', 'totalAmountOvertime'];
  employees!: Employee[];
  summary!: Summary;

  msInHour = MS_IN_HOUR;

  checkedEmployees = new Set<Employee>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  async getEmployees() {
    const response: EmployeesResponse = await lastValueFrom(this.api.getEmployees())
      .catch(e => e);
    if (response instanceof Error) {
      this.snackBar.open('Error getting employees data', 'OK');
      return;
    }

    this.employees = response.employees;
    this.summary = response.summary;
  }

  openEmployeesEditDialog() {
    if (this.checkedEmployees.size === 0) {
      this.snackBar.open('No employees selected!', 'OK');
      return;
    }
    LoaderService.activate();
    setTimeout(() => {
      const dialogRef = this.dialog.open(EmployeesEditDialog, {
        disableClose: true,
        data: Array.from(this.checkedEmployees),
      });
      
      dialogRef.afterOpened().subscribe(() => {
        LoaderService.deactivate();
      })
  
      dialogRef.afterClosed().subscribe((saved: boolean) => {
        if (saved) {
          this.getEmployees();
          this.checkedEmployees.clear();
        }
      });
    }), 1000;
  }

  changeEmployeeStatus(event: MatCheckboxChange, employee: Employee) {
    if (event.checked) {
      this.checkedEmployees.add(employee);
    }
    else {
      this.checkedEmployees.delete(employee);
    }
  }

}
