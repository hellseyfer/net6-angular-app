namespace net6_angular_app.Models
{
    public class Users
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

        //public Users(Guid id, string username, string email, string password)
        //{
        //    Id = id;
        //    UserName = username;
        //    EmailId = email;
        //    Password = password;
        //}
    }
}
