export interface GradeValue {
    GradeValueID: number;
    NumericValue: number;
    SymbolicValue: string;
    Name: string;
    ShortName: string;
}

export interface UserRole {
    UserRoleID: number;
    RoleName: string;
}

export interface RolePermission {
    UserRoleID: number;
    PermissionID: number;
    RolePermissionID: number;
}

export interface User {
    UserID: number;
    Email: string;
    PasswordHash: Buffer;
    Name: string;
    Surname: string;
    Address: string;
    UserRoleID: number;
    PESEL: string;
}

export interface Class {
    ClassID: number;
    StartYear: number;
    GraduationYear: number;
    Preceptor_UserID: number;
    ProfileID: number;
}

export interface ClassSubjectTeacher {
    PubjectID: number;
    ClassID: number;
    Teacher_UserID: number;
}

export interface Grade {
    GradeID: number;
    GradeValueID: number;
    SubjectID: number;
    Issuer_UserID: number;
    Owner_UserID: number;
    Weight: number;
    IssuedAt: Date;
}

export interface Student {
    UserID: number;
    ClassID: number;
}

export interface Timetable {
    TimetableID: number;
    ReplacementTeacher_UserID: number;
    TimeStart: Date;
    TimeEnd: Date;
    DayNumber: number;
    ClassID: number;
    SubjectID: number;
}
