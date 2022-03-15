namespace net6_angular_app.Models
{
    public class UsersDTO
    {
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
        public string Nombre
        {
            get;
            set;
        }
        public string Apellido
        {
            get;
            set;
        }
        public string[] Roles
        {
            get;
            set;
        }

        public UsersDTO() { }
        public UsersDTO(Users user) =>
            (UserName, Nombre, Apellido, Roles) = (user.UserName, user.Nombre, Apellido, Roles);
    }
}
