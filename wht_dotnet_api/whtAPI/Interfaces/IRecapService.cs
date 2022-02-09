using whtAPI.Models;

namespace whtAPI.Services
{
    public interface IRecapService
    {
        int Create(Recap recap);
        List<Recap> GetByDate(string date);
    }
}