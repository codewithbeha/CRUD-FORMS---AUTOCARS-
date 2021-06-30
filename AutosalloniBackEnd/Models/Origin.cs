using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Origin
    {
        public int VIN { get; set; }

        public string VehicleState {get; set;}

        public string VehicleCity { get; set; }

        public int VehicleZip { get; set; }
    }
}
