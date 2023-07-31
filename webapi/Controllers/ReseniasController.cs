using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReseniasController : Controller
    {

        public readonly LibrosAppContext librosAppContext;

        public ReseniasController(LibrosAppContext librosAppContext)
        {
            this.librosAppContext = librosAppContext;
        }

        [HttpGet]
        [Route("GetReseniasByBook/{book:int}")]
        public IActionResult GetReseniasByBook(int book)
        {
            try
            {
                List<Resenia> resenias = librosAppContext.Resenias.Where(b => b.IdLibro == book).OrderByDescending(b => b.Fecha).ToList();
                List<ReseniaView> result = new List<ReseniaView>();

                foreach (Resenia resenia in resenias)
                {
                    Usuario usuario = librosAppContext.Usuarios.FirstOrDefault(u => u.Id == resenia.IdUsuario);
                    ReseniaView reseniaView = new ReseniaView
                    {
                        Id = resenia.Id,
                        Calificacion = resenia.Calificacion,
                        Comentario = resenia.Comentario,
                        Fecha = resenia.Fecha,
                        Usuario = new UsuarioReseniaView()
                        {
                            Nombre = usuario.Nombre,
                            Imagen = usuario.Imagen
                        }
                    };
                    result.Add(reseniaView);
                }

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Resenias Success",
                    data = result
                });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "Internal server error",
                });
            }
        }

        [HttpGet]
        [Route("GetReseniasByBookAndUser/{book:int}/{user:int}")]
        public IActionResult GetReseniasByBookAndUser(int book, int user)
        {
            try
            {
                List<Resenia> resenias = librosAppContext.Resenias.Where(b => (b.IdLibro == book) && (b.IdUsuario == user)).ToList();
                List<ReseniaView> result = new List<ReseniaView>();

                foreach (Resenia resenia in resenias)
                {
                    Usuario usuario = librosAppContext.Usuarios.FirstOrDefault(u => u.Id == resenia.IdUsuario);
                    ReseniaView reseniaView = new ReseniaView
                    {
                        Id = resenia.Id,
                        Calificacion = resenia.Calificacion,
                        Comentario = resenia.Comentario,
                        Fecha = resenia.Fecha,
                        Usuario = new UsuarioReseniaView()
                        {
                            Nombre = usuario.Nombre,
                            Imagen = usuario.Imagen
                        }
                    };
                    result.Add(reseniaView);
                }

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Resenias Success",
                    data = result
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "Internal server error",
                });
            }
        }

        [HttpGet]
        [Route("GetReseniaById/{id:int}")]
        public IActionResult GetReseniaById(int id)
        {
            try
            {
                Resenia resenia = librosAppContext.Resenias.FirstOrDefault(r => r.Id == id);

                if (resenia == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new
                    {
                        message = "Resenia not found"
                    });
                }

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Resenia By Id Success",
                    data = resenia
                });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "Internal server error",
                });
            }
        }

        [HttpPost]
        [Route("CreateResenia")]
        public IActionResult CreateResenia([FromBody] Resenia resenia)
        {
            try
            {
                librosAppContext.Resenias.Add(resenia);
                librosAppContext.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "Reseña agregada correctamente"
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "Internal server error"
                });
            }
        }

        [HttpDelete]
        [Route("DeleteResenia/{id:int}")]
        public IActionResult DeleteResenia(int id)
        {
            try
            {
                Resenia resenia = librosAppContext.Resenias.FirstOrDefault(r => r.Id == id);

                if (resenia == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new
                    {
                        message = "Resenia not found"
                    });
                }

                // Eliminar la entidad
                librosAppContext.Resenias.Remove(resenia);
                librosAppContext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Reseña eliminada correctamente",
                });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "Internal server error",
                });
            }
        }


    }
}
