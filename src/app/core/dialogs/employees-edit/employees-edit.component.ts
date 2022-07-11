import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Employee, Shift } from '../../models/emloyee.model';
import { ApiService } from '../../services/api.service';
import { shiftValidator } from '../../validators/shift.validators';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.scss']
})
export class EmployeesEditDialog implements OnInit {

  formGroup = new FormGroup({
    employees: new FormArray([]),
  });

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EmployeesEditDialog>,
    @Inject(MAT_DIALOG_DATA) public employees: Employee[],

  ) { }

  ngOnInit(): void {
    this.employees.forEach((employee: Employee) => {
      const now = new Date();
      const status = employee.shifts?.findIndex((x: Shift) => {
        return x.clockIn < now && now < x.clockOut;
      }) !== -1;
      (this.formGroup.get('employees') as FormArray)?.push(new FormGroup({
        name: new FormControl(employee.name, [Validators.required]),
        hourlyRate: new FormControl(employee.hourlyRate, [Validators.required, Validators.min(0), Validators.pattern('^([0-9]+)(\.[0-9]{2})?$')]),
        status: new FormControl(status),
        overtimeHourlyRate: new FormControl(employee.overtimeHourlyRate, [Validators.required, Validators.min(0), Validators.pattern('^([0-9]+)(\.[0-9]{2})?$')]),
        shifts: new FormArray(employee.shifts?.map((shift: Shift) => {
          return new FormGroup({
            clockIn: new FormControl(shift.clockIn),
            clockOut: new FormControl(shift.clockOut),
          }, { validators: shiftValidator })
        })),
      }))
    });
  }

  async save() {
    const response = await lastValueFrom(this.api.saveEmployees(this.formGroup.value))
      .catch(e => e);
    if (response instanceof Error) {
      this.snackBar.open('Error saving employees!', 'OK');
      return;
    }

    this.dialogRef.close(true);
  }

}
