using System.ComponentModel.DataAnnotations;

namespace net6_angular_app.Models
{
    public class UserLogins
    {
        [Required, Key]
        public string UserName
        {
            get;
            set;
        }
        [Required]
        public string Password
        {
            get;
            set;
        }
        public UserLogins() { }
    }
}
