
namespace net6_angular_app.Models
{
    public class Users
    {
        public Users() { }
        public string UserName
        {
            get;
            set;
        }
        public Guid Id
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Surname
        {
            get;
            set;
        }
        public int Age
        {
            get;
            set;
        }
        public string Password
        {
            get;
            set;
        }
        //public ICollection<UserRoles> Roles
        //{
        //    get;
        //    set;
        //}

        public string Rol
        {
            get;
            set;
        }


    }
}
