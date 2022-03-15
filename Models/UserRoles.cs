using System.ComponentModel.DataAnnotations;

namespace net6_angular_app.Models
{
    public class UserRoles
    {
        public Guid Id
        {
            get;
            set;
        }
        public string Rol { get; set; }
    }
}
