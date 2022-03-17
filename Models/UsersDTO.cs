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
        public int Age { get; set; }
        public string Password { get; set; }
        public string Rol
        {
            get;
            set;
        }

        public UsersDTO() { }
        //con esto muestro lo que quiero al front y oculto lo que no
        public UsersDTO(Users user) =>
            (UserName, Name, Surname, Age, Rol) 
            = (user.UserName, user.Name, user.Surname, user.Age, user.Rol);
    }
    }
