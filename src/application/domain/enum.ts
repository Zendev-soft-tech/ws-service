export enum AttendanceStatus {
    PRESENT = "Present",
    LATE = "Late",
    HALF_DAY = "Half Day",
    ABSENT = "Absent",
    CHECKED_IN = "Checked In",
    CHECKED_IN_NOT_CHECKED_OUT = "Checked In Not Checked Out",
    CHECKED_OUT="Checked Out"
}

export enum LeaveType {
    CASUAL = "Casual Leave",
    SICK = "Sick Leave"
}

export enum LeaveDayType {
    FULL_DAY = "Full Day",
    FIRST_HALF = "First Half",
    SECOND_HALF = "Second Half"
}

export enum LeaveStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected"
}

export enum PermissionStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected"
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

export enum MaritalStatus {
    SINGLE = "Single",
    MARRIED = "Married",
    DIVORCED = "Divorced",
    WIDOWED = "Widowed"
}

export enum BloodGroup {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-"
}

export enum UserRole {
    EMPLOYEE = "Employee",
    HR_ADMIN = "HR Admin"
}

export enum EmployeeType {
    FULL_TIME = "Full Time",
    PART_TIME = "Part Time",
    CONTRACT = "Contract",
    INTERN = "Intern"
}

export enum EmployeeStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}

export enum AllowanceType {
    HRA = "HRA",
    MEDICAL = "Medical Allowance",
    COMMUNICATION = "Communication Allowance",
    SPECIAL = "Special Allowance",
    ARREARS = "Arrears",
    OTHER = "Other Earnings"
}

export enum DeductionType {
    PF = "PF",
    ESI = "ESI",
    MEDICAL_CLAIM = "Medical Claim",
    PROFESSION_TAX = "Profession Tax",
    INCOME_TAX = "Income Tax",
    SALARY_ADVANCE = "Salary Advance",
    OTHER = "Other Deductions"
}