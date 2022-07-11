import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const shiftValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const clockIn = control.get('clockIn')?.value;
    const clockOut = control.get('clockOut')?.value;
  
    if (clockIn && clockOut && clockIn.getTime() > clockOut.getTime()) {
      control.get('clockIn')?.setErrors({invalid: true});
      control.get('clockOut')?.setErrors({invalid: true});
      return { shiftInvalid: true }
    }
    else {
      control.get('clockIn')?.setErrors(null);
      control.get('clockOut')?.setErrors(null);
      return null;
    }
  };
