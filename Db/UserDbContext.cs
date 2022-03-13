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
        public DbSet<Users> Users { get; set; }
        public DbSet<UserLogins> UserLogins { get; set; }
    }
}
