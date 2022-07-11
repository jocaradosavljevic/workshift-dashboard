export interface EmployeesResponse {
    summary: Summary,
    employees: Employee[],
}

export interface Summary {
    totalEmployees: number,
    totalClockedInTime: number,
    totalAmountRegular: number,
    totalAmountOvertime: number,
}

export interface Employee {
    id: string,
    name: string,
    email: string,
    hourlyRate: number,
    overtimeHourlyRate: number,
    shifts: Shift[],
    totalClockedInTime?: number,
    totalAmountRegular?: number,
    totalAmountOvertime?: number,
}

export interface Shift {
    clockIn: Date,
    clockOut: Date,
}
