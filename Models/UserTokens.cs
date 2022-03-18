namespace net6_angular_app.Models
{
    public class UserTokens
    {

        public Guid Id
        {
            get;
            set;
        }
        public string Rol { get; set; }
        public string UserName
        {
            get;
            set;
        }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }

        // Token info
        public string Token
        {
            get;
            set;
        }

        public TimeSpan Validaty
        {
            get;
            set;
        }
        public string RefreshToken
        {
            get;
            set;
        }
        public Guid GuidId
        {
            get;
            set;
        }
        public double ExpireTime
        {
            get;
            set;
        }

    }
}
