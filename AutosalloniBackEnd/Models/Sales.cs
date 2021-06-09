using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutosalloniBackEnd.Models
{
    public class Sales
    {
        public int SaleId { get; set; }

        public string EmployeeName { get; set; }

        public string SaleDescription { get; set; }

        public string PaymentType { get; set; }

        public decimal Price { get; set; }
    }
}