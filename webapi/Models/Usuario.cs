using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Email { get; set; }

    public string? Contrasenia { get; set; }
    public string? Imagen { get; set; }
}
