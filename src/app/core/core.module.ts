import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesEditDialog } from './dialogs/employees-edit/employees-edit.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MsToHoursPipe } from './pipes/hours.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeesEditDialog,
    LoaderComponent,
    MsToHoursPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule, 
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
  ],
  exports: [
    DashboardComponent,
    LoaderComponent,
  ],
})
export class CoreModule { }
