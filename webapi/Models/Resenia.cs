using System;
using System.Collections.Generic;

namespace webapi.Models;

public class Resenia
{
    public int Id { get; set; }

    public int? Calificacion { get; set; }

    public string? Comentario { get; set; }

    public int? IdLibro { get; set; }
    public int? IdUsuario { get; set; }

    public DateTime? Fecha { get; set; }
}
