using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserApi.Models;

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public ActionResult <List<User>> GetUsers()
        {
            List<User> user = new List<User>();
            user.Add(new Models.User()
     
                {
                    CreateDate = DateTime.Now,
                    ID = 1,
                    Name = "Diana Reyes",
                    Nick = "diana.reyes",
                    Password = null
                });            
            user.Add(new Models.User()
                {
                    CreateDate = DateTime.Now,
                    ID = 2,
                    Name = "Patricia Reyes",
                    Nick = "patricia.reyes",
                    Password = null
                });
            //Aqui se integra la lógica a base de datos
            return user;
        }
            

        [HttpGet("{id}")]
        //[Authorize]
        public ActionResult<User> GetUsers(int ID)
        {
            User user = new User();

            if (ID == 1)
            {
                user = new User()
                {
                    CreateDate = DateTime.Now,
                    ID = 1,
                    Name = "Diana Reyes",
                    Nick = "diana.reyes",
                    Password = null
                };
            }
            else
            {
                user = new User()
                {
                    CreateDate = DateTime.Now,
                    ID = 2,
                    Name = "Patricia Reyes",
                    Nick = "patricia.reyes",
                    Password = null
                };
            }
            //Aqui se integra la lógica a base de datos
            return user;
        }

        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            //Lógica a base de datos
            return user;
        }
    }
}