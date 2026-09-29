import type { SalaryAllowance, SalaryDeduction, EmployeeSalary } from "@/src/adapters/models/Employee.js";
import type { ISalaryRepository } from "@/src/application/interfaces/ISalaryRepository.js";

export class AddSalary {
    constructor(private repository: ISalaryRepository) {}

    async execute(data: {
        employeeId: string;
        basicSalary: number;
        allowances?: SalaryAllowance[];
        deductions?: SalaryDeduction[];
    }): Promise<EmployeeSalary> {
        const basicSalary = Number(data.basicSalary);

        const allowances = (data.allowances ?? []).map(allowance => ({
            ...allowance,
            amount: Number((basicSalary * allowance.percentage / 100).toFixed(2))
        }));

        const deductions = (data.deductions ?? []).map(deduction => ({
            ...deduction,
            amount: Number((basicSalary * deduction.percentage / 100).toFixed(2))
        }));

        const totalAllowances = allowances.reduce(
            (total, item) => total + item.amount,
            0
        );

        const totalDeductions = deductions.reduce(
            (total, item) => total + item.amount,
            0
        );

        const totalSalary = basicSalary + totalAllowances - totalDeductions;

        const salary: EmployeeSalary = {
            basicSalary,
            allowances,
            deductions,
            totalAllowances,
            totalDeductions,
            totalSalary
        };

        return await this.repository.create(data.employeeId, salary);
    }
}