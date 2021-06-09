using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Wash
    {
        public int WashId { get; set; }

        public int EmployeeId { get; set; }

        public int VIN { get; set; }

        public int WashTime { get; set; }
    }
}