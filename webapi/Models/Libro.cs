using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class Libro
{
    public int Id { get; set; }

    public string? Titulo { get; set; }

    public string? Autor { get; set; }

    public int? Categoria { get; set; }

    public string? Resumen { get; set; }
    public string? Imagen { get; set; }
}
