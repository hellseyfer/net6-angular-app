namespace net6_angular_app.Models
{
    public class UserTokens
    {

        public Guid Id
        {
            get;
            set;
        }
        public int Rol { get; set; }

        public string Token
        {
            get;
            set;
        }
        public string UserName
        {
            get;
            set;
        }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
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

        public string EmailId
        {
            get;
            set;
        }
        public Guid GuidId
        {
            get;
            set;
        }
        public DateTime ExpireTime
        {
            get;
            set;
        }

    }
}
