using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Sales
    {
        public int VIN { get; set; }
        public string Employee { get; set; }
        public string Price { get; set; }

        public string Details { get; set; }

        public string DateOfSale { get; set; }

    }
}
