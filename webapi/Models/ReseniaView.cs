namespace webapi.Models
{
    public class ReseniaView
    {
        public int Id { get; set; }

        public int? Calificacion { get; set; }

        public string? Comentario { get; set; }

        public UsuarioReseniaView Usuario { get; set; }

        public DateTime? Fecha { get; set; }
    }
}
