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
        public string EmailId
        {
            get;
            set;
        }
        public string Password
        {
            get;
            set;
        }

        public UsersDTO() { }
        public UsersDTO(Users user) =>
            (UserName, EmailId) = (user.UserName, user.EmailId);
    }
}
