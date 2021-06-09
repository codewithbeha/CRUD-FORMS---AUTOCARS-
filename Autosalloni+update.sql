/* Dashboard Administrator  */
Create database AutosalloniDB

Create table Users (
	UserId int not null IDENTITY(1000,1) Primary Key,
	Username varchar(40),
	Password varchar(50),
	Role varchar(20)
)

insert into dbo.Users values ('beharabdyli','admin','user')
select * from Users

/* Employee Database  */

Create table Employee (
	EmployeeId int not null IDENTITY(1,1) Primary Key,
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

Create table Department (
	DepartmentId int identity (1,1) not null Primary Key,
	DepartmentName varchar(500),
)
insert into Department values ('Drejtor i Departmentit')


Create table Country (
    CountryId int identity (100,1)not null Primary Key,
	CountryName varchar(500),
)
Create table City (
    CityId int identity (01,1) not null Primary Key,
	CityName varchar(500),
)


INSERT INTO Employee(UserId, EmployeeName, Department, Birthdate, Country, City, Street, Zip, Phone, PhotoFileName) 
VALUES ('1002', 'BEHAR ABDYLI','Shites','10/10/1997','Kosovo','Prishtine','Rruga H.H','10000-PR','044444444','anonymous.png');

insert into Employee
values ('Behar Beha','1','12/07/1995','anonymous.png','100','1','Rruga UCK','PR10000') 

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
select * from Vehicle
insert into dbo.Vehicle values ('BMV','Coupe','2020','23000','100000','anonymous.png')

create table Brand (
BrandId int identity (001,1) not null Primary Key ,
BrandName varchar(500),
)
insert into dbo.Brand values ('10203040','Benz')

select * from Brand

create table Model (
ModelId int identity (010,1) not null Primary Key,
NameModel varchar(500)
)

select * from Model
insert into Model values ('CABRIO')

/* Employee Works  */

Create table Sales (
    SaleId int identity(10,1) not null Primary Key ,
	EmployeeId int,
	VIN int,
	SaleDescription varchar(500),
	PaymentType varchar(500),
	Price decimal(7,2) not null,

	Foreign Key (EmployeeId) references Employee (EmployeeId),
	Foreign Key (VIN) references Automobile (VIN)
)

insert into dbo.Sales values ('1','Murat Mehmeti','U realizu Shitja, ne pr','Cash','8300')
select * from dbo.Sales
/* Vehicle Database  */

Create table Task (
TaskId int identity (01000,1) not null Primary Key,
EmployeeId int,
TaskDescription varchar(500),
TypeWork varchar(500),
Status varchar(500),

Foreign Key (EmployeeId) references Employee (EmployeeId)
)
select * from Task
insert into dbo.Task values ('1','Kela','Ka per detyre me i pastru makinat','Pastrim','Progress')

Create table Service (
ServiceId int identity (0010,1) not null Primary Key,
EmployeeId int,
VIN int,
ServiceDescription varchar(500),

Foreign Key (VIN) references Automobile (VIN),
Foreign Key (EmployeeId) references Employee (EmployeeId)
)

insert into dbo.Service values ('1','Murati','Rregullimi i Trapit te pare')

Create table Wash (
WashId int identity (1,1) not null,
EmployeeId int,
VIN int,
WashClear varchar(500),

Foreign Key (VIN) references Automobile (VIN),
Foreign Key (EmployeeId) references Employee (EmployeeId)
)
select * from Wash
insert into dbo.Wash values ('100','1','20909090','2')