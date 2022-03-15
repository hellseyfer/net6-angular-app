
using Microsoft.IdentityModel.Tokens;
using net6_angular_app.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace net6_angular_app
{
    public static class JwtHelpers
    {
        public static List<Claim> GetClaims(this UserTokens userAccounts, Guid Id)
        {
            List<Claim> claims = new List<Claim> {
                new Claim("Id", userAccounts.Id.ToString()),
                    new Claim(ClaimTypes.Name, userAccounts.UserName),
                    new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
                    new Claim(ClaimTypes.Expiration, DateTime.UtcNow.AddDays(1).ToString("MMM ddd dd yyyy HH:mm:ss tt"))
            };
            if(userAccounts.Roles?.Count > 0) foreach (var role in userAccounts.Roles) claims.Add(new Claim(ClaimTypes.Role, role.Rol));

            return claims;
        }

        public static IEnumerable<Claim> GetClaims(this UserTokens userAccounts, out Guid Id)
        {
            Id = Guid.NewGuid();
            return GetClaims(userAccounts, Id);
        }
        public static UserTokens GenTokenkey(UserTokens model, JwtSettings jwtSettings)
        {
            try
            {
                var UserToken = new UserTokens();
                if (model == null) throw new ArgumentException(nameof(model));
                // Get secret key
                var key = System.Text.Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey);
                Guid Id = Guid.Empty;
                DateTime expireTime = DateTime.UtcNow.AddDays(1);
                UserToken.Validaty = expireTime.TimeOfDay;
                var JWToken = new JwtSecurityToken(issuer: jwtSettings.ValidIssuer, audience: jwtSettings.ValidAudience, claims: GetClaims(model, out Id), notBefore: new DateTimeOffset(DateTime.Now).DateTime, expires: new DateTimeOffset(expireTime).DateTime, signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256));
                UserToken.Token = new JwtSecurityTokenHandler().WriteToken(JWToken);
                UserToken.UserName = model.UserName;
                UserToken.Id = model.Id;
                UserToken.GuidId = Id;
                UserToken.Roles = model.Roles;
                UserToken.Nombre = model.Nombre;
                UserToken.Apellido = model.Apellido;
                UserToken.Edad = model.Edad;
                return UserToken;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

