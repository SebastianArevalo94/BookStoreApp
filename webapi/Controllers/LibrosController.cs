using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LibrosController : Controller
    {
        public readonly LibrosAppContext librosAppContext;

        public LibrosController(LibrosAppContext librosAppContext)
        {
            this.librosAppContext = librosAppContext;
        }

        [HttpGet]
        [Route("GetAllBooks")]
        public IActionResult GetAllBooks()
        {
            try
            {
                List<Libro> libros = librosAppContext.Libros.ToList();
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Books Success",
                    data = libros
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }

        [HttpGet]
        [Route("GetBookByName/{name}")]
        public IActionResult GetBookByName(string name)
        {
            try
            {
                List<Libro> libros = librosAppContext.Libros.Where(book => book.Titulo.Contains(name)).ToList();
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Books Success",
                    data = libros
                });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }


        [HttpGet]
        [Route("GetBookByAuthor/{author}")]
        public IActionResult GetBookByAuthor(string author)
        {
            try
            {
                List<Libro> libros = librosAppContext.Libros.Where(book => book.Autor.Contains(author)).ToList();
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Books Success",
                    data = libros
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }


        [HttpGet]
        [Route("GetBookByCategory/{category}")]
        public IActionResult GetBookByCategory(int category)
        {
            try
            {
                List<Libro> libros = librosAppContext.Libros.Where(book => book.Categoria == category).ToList();
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Books Success",
                    data = libros
                });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }
    }
}
