using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Task
    {
        public int TaskId { get; set; }

        public string EmployeeName { get; set; }

        public string TaskDescription { get; set; }

        public string TypeWork { get; set; }

        public string Status { get; set; }
    }
}