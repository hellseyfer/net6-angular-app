using Microsoft.EntityFrameworkCore;
using net6_angular_app.Models;

namespace net6_angular_app.Db
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions options) : base(options)
        {
        }

        protected UserDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Write Fluent API configurations here

            //Property Configurations https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            modelBuilder.Entity<UserRoles>();
                //.HasKey(ur => new { ur.Id, ur.UserID });

            modelBuilder.Entity<UsersDTO>();
            modelBuilder.Entity<Users>();
                
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<UserLogins> UserLogins { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
    }
}
