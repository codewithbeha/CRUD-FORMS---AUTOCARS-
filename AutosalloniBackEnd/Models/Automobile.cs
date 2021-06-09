using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Automobile
    {
        public int VIN { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string VehicleYear { get; set; }

        public decimal VehiclePrice { get; set; }

        public int Kilometers { get; set; }

        public string PhotoFileName { get; set; }

    }

}