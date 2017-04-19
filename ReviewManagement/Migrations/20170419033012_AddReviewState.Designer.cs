using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ReviewManagement.Models;

namespace ReviewManagement.Migrations
{
    [DbContext(typeof(ProductContext))]
    [Migration("20170419033012_AddReviewState")]
    partial class AddReviewState
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("ReviewManagement.Models.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.HasKey("CustomerId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("ReviewManagement.Models.CustomerProduct", b =>
                {
                    b.Property<int>("CustomerId");

                    b.Property<int>("ProductId");

                    b.HasKey("CustomerId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("CustomerProduct");
                });

            modelBuilder.Entity("ReviewManagement.Models.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("ProductId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ReviewManagement.Models.Review", b =>
                {
                    b.Property<int>("ReviewId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comments");

                    b.Property<int>("CustomerId");

                    b.Property<DateTimeOffset>("DateTime");

                    b.Property<int?>("ProductId");

                    b.Property<int>("Stars");

                    b.Property<int>("State");

                    b.HasKey("ReviewId");

                    b.HasIndex("ProductId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("ReviewManagement.Models.CustomerProduct", b =>
                {
                    b.HasOne("ReviewManagement.Models.Customer", "Customer")
                        .WithMany("Products")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ReviewManagement.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ReviewManagement.Models.Review", b =>
                {
                    b.HasOne("ReviewManagement.Models.Product")
                        .WithMany("Reviews")
                        .HasForeignKey("ProductId");
                });
        }
    }
}
