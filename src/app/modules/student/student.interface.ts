export type TStudentName = {
    firstName: string
    middleName?: string | undefined
    lastName: string
}

export type TStudentGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type TStudentLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type TStudent = {
    id: string
    name: TStudentName
    password: string
    gender: "male" | "female"
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"
    presentAddress: string
    permanentAddress: string
    guardian: TStudentGuardian
    localGuardian: TStudentLocalGuardian
    profileImg?: string;
    isActive: 'active' | 'blocked';
}

// For Creating Static Methods
// export interface TStudentMethods extends Model<TStudent> {
//     isUserExist(id: string): Promise<TStudent | null>
// }

// For Creating Instance Methods
// export type TStudentMethods = {
//     isUserExist(id: string): Promise<TStudent | null>
// }
// export type StudentModelExtend = Model<TStudent, Record<string, never>, TStudentMethods>;