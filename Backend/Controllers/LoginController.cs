using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace UserApi.Controllers
{
    using Api.Library.Interfaces;
    using Api.Library.Models;

    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost, Route("login")]
        //public IActionResult Login([FromBody]Models.Login user)
        //{
        //    if (user == null)
        //    {
        //        return BadRequest("Invalid client request");
        //    }

        //    //Logica de consulta de una base de datos
        //    if (user.Nick == "mtwdm" && user.Password == "123123")
        //    {
        //        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dianareyes-2019-mtwdm"));

        //        var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        //        var tokeOptions = new JwtSecurityToken(
        //            issuer: "http://localhost:123",
        //            audience: "http://localhost:123",
        //            claims: new List<System.Security.Claims.Claim>(),
        //            expires: DateTime.Now.AddMinutes(5), signingCredentials: signingCredentials);

        //        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

        //        return Ok(new { Token = tokenString });
        //    }
        //    else
        //    {
        //        return Unauthorized();
        //    }
        //}

        public Api.Library.Models.User Login([FromBody]Api.Library.Models.UserMin user)
        {
            var connectionStringLocal = _configuration.GetValue<string>("ConnectionStringLocal");
            using (ILogin Login =  Factorizador.CrearConexionServicio(Api.Library.Models.ConnectionType.MSSQL, connectionStringLocal))
            {
                Api.Library.Models.User objusr = Login.EstablecerLogin(user.Nick, user.Password);

                if(objusr.ID > 0)
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dianareyes-2019-mtwdm"));

                    var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:44325",
                        audience: "http://localhost:44325",
                        claims: new List<System.Security.Claims.Claim>(),
                        expires: DateTime.Now.AddMinutes(5), signingCredentials: signingCredentials);

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                    objusr.JWT = tokenString;
                }
                return objusr;         
            }
        }
    }
}