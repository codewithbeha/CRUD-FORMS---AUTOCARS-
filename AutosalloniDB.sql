/* Dashboard Administrator  */

Create database AutosalloniDB

Create table Users (
	UserId int not null IDENTITY(100000,1) Primary Key,
	Username varchar(40),
	Email varchar(40),
	Password varchar(50),
	Role varchar(20)
)

insert into Users values ('beharabdyli', 'Behar Abdyli','beha12','Active Admin','Admiminstrator')

/* Employee Database  */
Create table Employee (
    EmployeeId int not null identity(0001,1),
	Department varchar(500),
	EmployeeName varchar(500),
	Birthdate date,
	Country varchar(500),
	City varchar(500),
	Street varchar(500),
	Zip varchar(500),
	Phone varchar(500),
	PhotoFileName varchar(500),
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

Create table Report (
 ReportId int not null identity (1,1) primary key,
 Employee varchar(500),
 Department varchar(500),
 Status varchar(500),
 Description varchar(1000),
 ReportTo varchar(500),
 DateOf date
)


Create table Status(
Id int not null identity(1,1) primary key,
StatusName varchar(500)
)

insert into Status values ('IRegular-Employee')

Create table Tasks (
TaskId int not null identity (1,1) primary key,
TaskName varchar(500),
TaskDesc varchar(500),
Employee varchar(500),
Department varchar(500),
Done date
)



/*Dardi WORK */
/* Vehicle  */
create table Automobile(
	VIN int identity(1000,1) not null Primary Key,
	Brand varchar(500),
	Model varchar(500),
	VehicleYear date,
	VehiclePrice money,
	Kilometers int,
	PhotoFileName varchar(150)
)
insert into Automobile values('VW','Caddy','2008.5.02','5000','250000','test.png');
select * from Automobile
drop table Automobile

create table Origin(
	VIN int not null references Automobile(VIN),
	Primary key(VIN),
	VehicleState varchar(250),
	VehicleCity varchar(250),
	VehicleZip int
)
insert into Origin values ('1002','Germany','Berlin','06037');
select * from Origin

drop table Origin

create table Extras(
	VIN int not null references Automobile(VIN),
	Primary key(VIN),
	NumDoors int,
	Color varchar(150),
	Transmission varchar(200),
	NumSeats int,
	Cubic float,
)

drop table Extras

insert into Extras values ('1001','5','White','Automatic','5','2.5')
insert into Extras values ('1000','5','Black','Manual','5','2.0')
select * from Extras

create table Details(
		VIN int not null references Automobile(VIN),
		Tyres varchar(200),
		AirCon varchar(200),
		Interior varchar(200),
		Sensors varchar(200),
		Headlight varchar(200)
)
insert into Details values('1000','Summer-Tires','2-zones','Alcantara','Camera','Xenon')
select * from Details

Create table Sales(
VIN int not null references Automobile(VIN),
Primary key(VIN),
Employee varchar(500),
Price varchar(500),
Details varchar(500),
DateOfSale date
)


