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
    public class TasksController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly IWebHostEnvironment _env;

        public TasksController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT TaskId,TaskName,TaskDesc,Employee,Department,Done FROM dbo.Tasks";
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
        public JsonResult Post(Tasks tas)
        {
            string query = @"Insert into dbo.Tasks (TaskName, TaskDesc, Employee, Department , Done )
                                                         Values (
                                                         '" + tas.TaskName + @"'
                                                         ,'" + tas.TaskDesc + @"'
                                                         ,'" + tas.Employee + @"'
                                                         ,'" + tas.Department + @"'
                                                         ,'" + tas.Done + @"'
                                                         
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
            return new JsonResult("Te dhenat u shtuan me sukses");
        }


        [HttpPut]
        public JsonResult Put(Tasks tas)
        {
            string query = @"UPDATE dbo.Tasks SET

                 TaskName = '" + tas.TaskName + @"'
                ,TaskDesc = '" + tas.TaskDesc + @"'  
                ,Employee = '" + tas.Employee + @"'
                ,Department  = '" + tas.Department + @"'
                ,Done  = '" + tas.Done + @"'

                 WHERE TaskId = " + tas.TaskId + @" ";

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
            string query = @"DELETE FROM dbo.Tasks where TaskId = " + id + @" ";

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

        [Route("GetAllEmployeeNames")]

        public JsonResult GetAllEmployeeNames()
        {
            string query = @"
                             select EmployeeName from dbo.Employee";
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


        [Route("GetAllDepartmentNames")]

        public JsonResult GetAllDepartmentNames()
        {
            string query = @"
                             select DepartmentName from dbo.Department";
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