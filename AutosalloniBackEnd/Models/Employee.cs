using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Employee
    {      
        public int EmployeeId { get; set; }

        public int UserId { get; set; }

        public string EmployeeName { get; set; }

        public string Department { get; set; }

        public string Birthdate { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Street { get; set; }

        public string Zip { get; set; }

        public string Phone { get; set; }

        public string PhotoFileName { get; set; }


    }
}