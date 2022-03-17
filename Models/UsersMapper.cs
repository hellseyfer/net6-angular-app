using AutoMapper;

namespace net6_angular_app.Models
{
    public class UsersMapper : Profile
    {
        public UsersMapper()
        {
            CreateMap<UsersDTO, Users>()
                      .ForMember(
                          dest => dest.Name,
                          opt => opt.MapFrom(src => src.Name)
                          )
                      .ForMember(
                          dest => dest.UserName,
                          opt => opt.MapFrom(src => src.UserName)
                          )
                      .ForMember(
                          dest => dest.Surname,
                          opt => opt.MapFrom(src => src.Surname)
                          )
                       .ForMember(
                          dest => dest.Age,
                          opt => opt.MapFrom(src => src.Age)
                          )
                       .ForMember(
                          dest => dest.Password,
                          opt => opt.MapFrom(src => src.Password)
                          )
                        .ForMember(
                          dest => dest.Id,
                          opt => opt.MapFrom(src => src.Id)
                          );
            //.ReverseMap()
            //    .ForMember(dest => dest.Name,
            //    opt => opt.MapFrom(src => $"{src.Nombre}")
            //);
        }
      
    }
}
