﻿namespace net6_angular_app.Models
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
        public string? Secret { get; set; } // we hide this with DTO
    }
}