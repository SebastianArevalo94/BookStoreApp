using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace webapi.Models;

public partial class LibrosAppContext : DbContext
{
    public LibrosAppContext()
    {
    }

    public LibrosAppContext(DbContextOptions<LibrosAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Libro> Libros { get; set; }

    public virtual DbSet<Resenia> Resenias { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }
    public virtual DbSet<Categoria> Categorias { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost; Database=LibrosApp; Integrated Security=true; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Libro>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Libros__3213E83F3EEB2E3E");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Autor)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("autor");
            entity.Property(e => e.Categoria).HasColumnName("categoria");
            entity.Property(e => e.Resumen)
                .IsUnicode(false)
                .HasColumnName("resumen");
            entity.Property(e => e.Titulo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("titulo");
            entity.Property(e => e.Imagen)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("imagen");
        });

        modelBuilder.Entity<Resenia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Resenias__3213E83F8C3B4BCE");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Calificacion).HasColumnName("calificacion");
            entity.Property(e => e.Comentario)
                .IsUnicode(false)
                .HasColumnName("comentario");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdUsuario)
                .HasColumnType("int")
                .HasColumnName("id_usuario");
            entity.Property(e => e.IdLibro).HasColumnName("id_libro");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuarios__3213E83F1AC55314");

            entity.Property(e => e.Id)
            .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Contrasenia)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("contrasenia");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Imagen)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("imagen");
        });

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuarios__3213E83F1AC55314");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
