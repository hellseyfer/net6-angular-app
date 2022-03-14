using FluentValidation;
using net6_angular_app.Models;

namespace net6_angular_app.Validations
{
    public class UsersValidator : AbstractValidator<Users>
    {
        public UsersValidator()
        {
            RuleFor(user => user.UserName)
                .NotNull()
                .NotEmpty()
                .MaximumLength(10)
                .Must(userName => userName.Any(char.IsUpper)).WithMessage("Debe contener un caracter Mayuscula").WithName("Mayusculas").WithErrorCode("1")
                .Must(userName => userName.Any(char.IsNumber)).WithMessage("Debe contener un caracter Numerico").WithName("Numerico").WithErrorCode("2");
                //.Matches("^[a-zA-Z]*[A-Z0-9]*$");
        }
    }
}
