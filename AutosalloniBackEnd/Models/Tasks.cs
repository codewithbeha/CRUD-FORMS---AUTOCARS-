using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Tasks
    {
        public int TaskId { get; set; }

        public string TaskName { get; set; }
        public string TaskDesc { get; set; }
        public string Employee { get; set; }
        public string Department { get; set; }

        public string Done { get; set; }

    }
}
