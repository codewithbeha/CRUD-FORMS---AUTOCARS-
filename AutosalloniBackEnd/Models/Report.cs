using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Report
    {
        public int ReportId { get; set; }

        public string Employee { get; set; }

        public string Department { get; set; }

        public string Status { get; set; }

        public string Description { get; set; }

        public string ReportTo { get; set; }

        public string DateOf { get; set; }

    }
}
