import type { Designation }
    from "@/src/adapters/models/Designation.js";

export interface IDesignationRepository {

    create(
        data: Partial<Designation>
    ): Promise<Designation>;

    findAll(): Promise<Designation[]>;

    findById(
        id: string
    ): Promise<Designation | null>;

    findByCode(
        code: string
    ): Promise<Designation | null>;

    findByName(
        name: string
    ): Promise<Designation | null>;

    findByDepartment(
        departmentId: string
    ): Promise<Designation[]>;

    update(
        id: string,
        data: Partial<Designation>
    ): Promise<Designation>;

    delete(
        id: string
    ): Promise<void>;
}