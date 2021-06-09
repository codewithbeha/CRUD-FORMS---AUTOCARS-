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

namespace AutosalloniBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CityController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //GET POST PUT DELETE
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT CityId, CityName FROM dbo.City";
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
        public JsonResult Post(City ci)
        {
            string query = @"INSERT INTO dbo.City Values ('" + ci.CityName + @"')";
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
            return new JsonResult("Te dhenat u shtuan me sukses");
        }
        [HttpPut]
        public JsonResult Put(City ci)
        {
            string query = @"UPDATE dbo.City SET CityName = '" + ci.CityName + @"' 
                                                                WHERE CityId = " + ci.CityId + @" ";
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
            return new JsonResult("Te dhenat u perditsuan me sukses");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.City where CityId = " + id + @" ";
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
            return new JsonResult("Te dhenat u fshin me sukses");
        }
    }
}