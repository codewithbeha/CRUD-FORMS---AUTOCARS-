using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using AutosalloniBackEnd.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace AutosalloniBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly IWebHostEnvironment _env;

        public DetailsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT VIN,Tyres,AirCon,Interior,Sensors,Headlight from dbo.Details";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Details det)
        {
            string query = @"insert into dbo.Details (VIN,Tyres,AirCon,Interior,Sensors,Headlight)
                                                         Values (
                                                          '" + det.VIN + @"'
                                                          ,'" + det.Tyres + @"'
                                                           ,'" + det.AirCon + @"'
                                                          ,'" + det.Interior + @"'
                                                         ,'" + det.Sensors + @"'
                                                         ,'" + det.Headlight + @"'
                                                                                )";
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlDataReader = myCommand.ExecuteReader();
                    sqlDataReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Të dhënat u shtuan me sukses");
        }
        [HttpPut]
        public JsonResult Put(Details det)
        {
            string query = @"update dbo.Details SET
                 Tyres = '" + det.Tyres + @"' 
                ,AirCon = '" + det.AirCon + @"'
                ,Interior = '" + det.Interior + @"'
                ,Sensors = '" + det.Sensors + @"'
                ,Headlight = '" + det.Headlight + @"'
            
                 WHERE VIN = " + det.VIN + @" ";

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlDataReader = myCommand.ExecuteReader();
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Të dhënat u përditsuan me sukses");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.Details where VIN = " + id + @" ";

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlDataReader = myCommand.ExecuteReader();
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Të dhënat u fshinë me sukses");
        }

        [Route("GetAllAutomobileVIN")]

        public JsonResult GetAllAutomobileVIN()
        {
            string query = @"
                             select VIN from dbo.Automobile";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    sqlDataReader = myCommand.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
