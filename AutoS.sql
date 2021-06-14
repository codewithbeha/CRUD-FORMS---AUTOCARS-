/* Dashboard Administrator  */

Create database AutosalloniDB

Create table Users (
	UserId int not null IDENTITY(1000,1) Primary Key,
	Username varchar(40),
	Password varchar(50),
	Status varchar(100),
	Role varchar(20)
)

insert into Users values ('beharabdyli', 'Behar Abdyli','beha12','Active Admin','Admiminstrator')

/* Employee Database  */
Create table Employee (
    EmployeeId int not null identity(01,1),
	UserId int,
	Department varchar(500),
	EmployeeName varchar(500),
	Birthdate date,
	Country varchar(500),
	City varchar(500),
	Street varchar(500),
	Zip varchar(500),
	Phone varchar(500),
	PhotoFileName varchar(500),

	Foreign Key (UserId) references Users (UserId),
)

INSERT INTO Employee(EmployeeName, Department, Birthdate, Country, City, Street, Zip, Phone, PhotoFileName) 
VALUES ('BEHAR ABDYLI', 'IT' ,'10/10/1997','Kosovo','Prishtine','Rruga H.H','10000-PR','044444444','anonymous.png');

Create table Department (
	DepartmentId int identity (1,1) not null Primary Key,
	DepartmentName varchar(500),
)
Create table Country (
    CountryId int identity (100,1)not null Primary Key,
	CountryName varchar(500),
)
Create table City (
    CityId int identity (01,1) not null Primary Key,
	CityName varchar(500),
)

/* Vehicle  */
create table Automobile(
	VIN int identity(10203040,1) not null Primary Key,
	Brand varchar(500),
	Model varchar(500),
	VehicleYear date,
	VehiclePrice money,
	Kilometers int,
	PhotoFileName varchar(150)
)

create table Brand (
	BrandId int identity (001,1) not null Primary Key ,
	BrandName varchar(500),
)
create table Model (
	ModelId int identity (010,1) not null Primary Key,
	NameModel varchar(500)
)

/* Employee Works  */

Create table Sales (
    SaleId int identity(10,1) not null Primary Key ,
	UserId int,
	VIN int,
	PaymentId int,

	Foreign Key (UserId) references Users (UserId),
	Foreign Key (VIN) references Automobile (VIN),
	Foreign Key (PaymentId) references Payment (PaymentId)
)

Create table Payment (
	PaymentId int not null identity (0001,1) Primary Key,
	PaymentName varchar(500),
	Type varchar(500),
	Description varchar(500),
	Price decimal(7,2) not null
)

Create table Task (
	TaskId int identity (01000,1) not null Primary Key,
	UserId int,
	TaskDescription varchar(500),
	TypeWork varchar(500),
	Status varchar(500),

Foreign Key (UserId) references Users (UserId)
)

Create table Service (
	ServiceId int identity (0010,1) not null Primary Key,
	UserId int,
	VIN int,
	ServiceDescription varchar(500),

Foreign Key (VIN) references Automobile (VIN),
Foreign Key (UserId) references Users (UserId)
)

Create table Wash (
	WashId int identity (1,1) not null,
	UserId int,
	VIN int,
	WashClear varchar(500),

Foreign Key (VIN) references Automobile (VIN),
Foreign Key (UserId) references Users (UserId)
)
