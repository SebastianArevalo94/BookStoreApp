using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        public readonly LibrosAppContext LibrosAppContext;

        public CategoriesController(LibrosAppContext librosAppContext)
        {
            this.LibrosAppContext = librosAppContext;
        }

        [HttpGet]
        [Route("GetAllCategories")]
        public IActionResult GetAllCategories()
        {
            try
            {
                List<Categoria> categorias = LibrosAppContext.Categorias.ToList();
                return StatusCode(StatusCodes.Status200OK, new
                {
                    message = "Get Categorias Success",
                    data = categorias
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error Interno del Servidor" });
            }
        }
    }
}
