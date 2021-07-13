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
    public class ExtrasController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly IWebHostEnvironment _env;

        public ExtrasController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT VIN,NumDoors,Color,Transmission,NumSeats,Cubic from dbo.Extras";
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
        public JsonResult Post(Extras extras)
        {
            string query = @"insert into dbo.Extras (VIN,NumDoors,Color,Transmission,NumSeats,Cubic)
                                                         Values (
                                                          '" + extras.VIN + @"'
                                                          ,'" + extras.NumDoors + @"'
                                                           ,'" + extras.Color + @"'
                                                          ,'" + extras.Transmission + @"'
                                                         ,'" + extras.NumSeats + @"'
                                                         ,'" + extras.Cubic + @"'
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
        public JsonResult Put(Extras extras)
        {
            string query = @"update dbo.Extras SET
                 NumDoors = '" + extras.NumDoors + @"' 
                ,Color = '" + extras.Color + @"'
                ,Transmission = '" + extras.Transmission + @"'
                ,NumSeats = '" + extras.NumSeats + @"'
                ,Cubic = '" + extras.Cubic + @"'
            
                 WHERE VIN = " + extras.VIN + @" ";

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
            string query = @"DELETE FROM dbo.Extras where VIN = " + id + @" ";

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
