using Microsoft.EntityFrameworkCore;
using net6_angular_app.Db;
using net6_angular_app.Models;
using net6_angular_app.Extensions;
using net6_angular_app;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FluentValidation.Results;
using net6_angular_app.Validations;

var builder = WebApplication.CreateBuilder(args);

/* Add services to the container. */

// inMemory DB
builder.Services.AddDbContext<UserDbContext>(options => options.UseInMemoryDatabase("Users"));
builder.Services.AddDbContext<UserDbContext>(options => options.UseInMemoryDatabase("UsersLogin"));
builder.Services.AddJWTTokenServices(builder.Configuration);

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                            Id = "Bearer"
                    }
                },
                new string[] {}
        }
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
 
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


// Minimal API - users

app.MapPost("/login", async (UserLogins userLogins, UserDbContext context, JwtSettings jwtSettings) =>
{
    var Token = new UserTokens();

    var valid = await context.Users
    .Where(u => u.UserName.Equals(userLogins.UserName) && u.Password.Equals(userLogins.Password))
    .FirstOrDefaultAsync();

    if (valid?.UserName != null)
    {
        var user = await context.Users
        .Where(u => u.UserName.Equals(userLogins.UserName) && u.Password.Equals(userLogins.Password))
        .FirstOrDefaultAsync();

        Token = JwtHelpers.GenTokenkey(new UserTokens()
        {
            EmailId = user.EmailId,
            GuidId = Guid.NewGuid(),
            UserName = user.UserName,
            Id = user.Id,
        }, jwtSettings);


    }
    else
    {
        return Results.BadRequest("wrong password");
    }
    return Results.Ok(Token);
})
.WithName("GetToken")
.Produces<UserTokens>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status400BadRequest);

app.MapGet("/users", [Authorize] async (UserDbContext context) =>
//await context.Users.ToListAsync())
await context.Users.Select(x => new UsersDTO(x)).ToListAsync())
.WithName("GetAllUsers");

app.MapGet("/users/{id}", async (int id, UserDbContext context) =>
await context.Users.FindAsync(id)
    is Users user
        ? Results.Ok(user)
        : Results.NotFound())
.WithName("GetUserById")
.Produces<UserTokens>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.MapPost("/users", async (Users user, UserDbContext context) =>
{
    user.Id = Guid.NewGuid();

    UsersValidator validator = new UsersValidator();
    ValidationResult result = validator.Validate(user);

    if (!result.IsValid)
    {
        string allMessages = result.ToString("~");

        var dictionary = result.Errors.DistinctBy(k => k.PropertyName)
                                        .ToDictionary(v => v.PropertyName, v => allMessages.Split("~"));
        return Results.ValidationProblem(dictionary, allMessages);

    } 

    context.Users.Add(user);

    await context.SaveChangesAsync();

    return Results.Created($"/users/{user.Id}", user);

})
.WithName("PostUser")
.ProducesValidationProblem()
.Produces<UserTokens>(StatusCodes.Status201Created);




//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html");;

app.Run();
