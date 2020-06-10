create table if not exists szkola.GradeValue
(
	GradeValueID int auto_increment
		primary key,
	NumericValue decimal not null,
	SymbolicValue varchar(3) not null,
	Name varchar(15) not null,
	constraint GradeValue_SymbolicValue_uindex
		unique (SymbolicValue)
);

create table if not exists szkola.UserRole
(
	UserRoleID int auto_increment
		primary key,
	RoleName varchar(100) not null
);

create table if not exists szkola.User
(
	UserID int auto_increment
		primary key,
	Email varchar(100) not null,
	PasswordHash binary(60) not null,
	Name varchar(120) null,
	Surname varchar(120) null,
	Address varchar(200) null,
	UserRoleID int not null,
	constraint User_UserRole_UserRoleID_fk
		foreign key (UserRoleID) references szkola.UserRole (UserRoleID)
)
comment 'Contains all users of the system';

create table if not exists szkola.Class
(
	ClassID int not null,
	FullName varchar(40) null,
	ShortName varchar(10) not null,
	Preceptor_UserID int not null,
	StartYear date not null,
	GraduationYear date not null,
	primary key (ClassID),
	constraint Class_User_UserID_fk
		foreign key (Preceptor_UserID) references szkola.User (UserID)
);

create table if not exists szkola.Student
(
	UserID int not null,
	ClassID int not null,
	primary key (UserID),
	constraint Student_Class_ClassID_fk
		foreign key (ClassID) references szkola.Class (ClassID),
	constraint Student_User_UserID_fk
		foreign key (UserID) references szkola.User (UserID)
			on update cascade on delete cascade
)
comment 'Stores class participation info for users with role Student';

create table if not exists szkola.Subject
(
	SubjectID int auto_increment
		primary key,
	Name varchar(200) not null,
	Teacher_UserID int not null,
	constraint Subject_User_UserID_fk
		foreign key (Teacher_UserID) references szkola.User (UserID)
);

create table if not exists szkola.Grade
(
	GradeID int auto_increment
		primary key,
	GradeValueID int not null,
	SubjectID int not null,
	Issuer_UserID int not null,
	Owner_UserID int not null,
	constraint Grade_GradeValue_GradeValueID_fk
		foreign key (GradeValueID) references szkola.GradeValue (GradeValueID),
	constraint Grade_Subject_SubjectID_fk
		foreign key (SubjectID) references szkola.Subject (SubjectID),
	constraint Grade_User_UserID_fk
		foreign key (Issuer_UserID) references szkola.User (UserID),
	constraint Grade_User_UserID_fk_2
		foreign key (Owner_UserID) references szkola.User (UserID)
);

create table if not exists szkola.Timetable
(
	TimetableID int auto_increment
		primary key,
	ClassID int not null,
	SubjectID int null,
	ReplacementTeacher_UserID int null,
	TimeStart time not null,
	TimeEnd time not null,
	DayNumber int not null,
	constraint Timetable_Class_ClassID_fk
		foreign key (ClassID) references szkola.Class (ClassID),
	constraint Timetable_Subject_SubjectID_fk
		foreign key (SubjectID) references szkola.Subject (SubjectID),
	constraint Timetable_User_UserID_fk
		foreign key (ReplacementTeacher_UserID) references szkola.User (UserID)
);


