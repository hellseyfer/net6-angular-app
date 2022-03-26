using FluentValidation;
using Microsoft.EntityFrameworkCore;
using net6_angular_app.Db;
using net6_angular_app.Models;

namespace net6_angular_app.Validations
{
    public class UsersValidator : AbstractValidator<Users>
    {
        UserDbContext _context;
        public UsersValidator(UserDbContext context)
        {
            _context = context;

            RuleFor(user => user.UserName)
                .NotNull()
                .NotEmpty()
                .MaximumLength(15)
                .Must(userName => userName.Any(char.IsUpper)).WithMessage("Debe contener un caracter Mayuscula").WithName("Mayusculas").WithErrorCode("1")
                .Must(userName => userName.Any(char.IsNumber)).WithMessage("Debe contener un caracter Numerico").WithName("Numerico").WithErrorCode("2")
                //.Matches("^[a-zA-Z]*[A-Z0-9]*$");
                .MustAsync(async (username, cancellation) =>
                 {
                     string exists = await _context.Users.Where(x => x.UserName.Equals(username))
                        .Select(x => x.UserName).FirstOrDefaultAsync();

                     if (exists == null) return true;   // error must be true
                     return false;

                 }).WithMessage("Username already exists.");
        }
    }
}
