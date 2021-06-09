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
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //GET POST PUT DELETE
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT DepartmentId, DepartmentName FROM dbo.Department";
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
        public JsonResult Post(Department dep)
        {
            string query = @"INSERT INTO dbo.Department Values ('" + dep.DepartmentName + @"')";
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
        public JsonResult Put(Department dep)
        {
            string query = @"UPDATE dbo.Department SET DepartmentName = '" + dep.DepartmentName + @"' 
                                                                WHERE DepartmentId = " + dep.DepartmentId + @" ";
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
            string query = @"DELETE FROM dbo.Department where DepartmentId = " + id + @" ";
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