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

        //Navigational property
        //public ICollection<UsersDTO> Users { get; set; }
        public Users User { get; set; }
        public Guid UserID { get; set; }
        public UserRoles() { }
    }
}
