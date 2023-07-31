using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        public readonly LibrosAppContext librosAppContext;

        public UsersController(LibrosAppContext librosAppContext)
        {
            this.librosAppContext = librosAppContext;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] DataLogin usuario)
        {
            try
            {
                Usuario usuarioDB = librosAppContext.Usuarios.FirstOrDefault(u => u.Email.Equals(usuario.Email));

                if (usuarioDB != null)
                {
                    if (usuarioDB.Contrasenia != usuario.Contrasenia)
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, new { message = "Contrasenia Incorrecta", status = 401 });
                    }

                    return StatusCode(StatusCodes.Status200OK, new { message = "Bienvenido", status = 200, token = Jwt.GenerateToken(usuarioDB) });
                }

                return StatusCode(StatusCodes.Status400BadRequest, new { message = "El usuario no existe", status = 400 });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }

        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] Usuario usuario)
        {
            try
            {
                Usuario userDB = librosAppContext.Usuarios.FirstOrDefault(u => u.Email.Equals(usuario.Email));

                if (userDB != null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new
                    {
                        message = "El correo ya esta registrado.",
                        status = 400,
                    });
                }

                librosAppContext.Usuarios.Add(usuario);
                librosAppContext.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "Register Success",
                    status = 201,
                    token = Jwt.GenerateToken(usuario)
                });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }

        [HttpGet]
        [Route("GetUserById/{user:int}")]

        public IActionResult GetUserById(int user)
        {
            try
            {
                Usuario usuario = librosAppContext.Usuarios.FirstOrDefault(u => u.Id == user);

                if (usuario == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new { message = "Usuario no encontrado" });
                }

                return StatusCode(StatusCodes.Status200OK, new { message = "Get User Sucess", data = usuario });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }
    }
}
