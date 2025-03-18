
export type StudentName = {
    firstName: string
    middleName?: string | undefined
    lastName: string
}

export type StudentGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export type StudentLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type Student = {
    id: string
    name: StudentName
    gender: "male" | "female"
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"
    presentAddress: string
    permanentAddress: string
    guardian: StudentGuardian
    localGuardian: StudentLocalGuardian
    profileImg?: string;
    isActive: 'active' | 'blocked';
}