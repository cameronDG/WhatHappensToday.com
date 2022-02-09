using Microsoft.AspNetCore.Mvc;
using whtAPI.Models;
using whtAPI.Responses;
using whtAPI.Services;

namespace whtAPI.Controllers
{
    [Route("api/recaps")]
    [ApiController]
    public class RecapApiController : BaseApiController
    {

        IRecapService _service;
        public RecapApiController(IRecapService service, ILogger<RecapApiController> logger) : base(logger)
        {
            _service = service;
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(Recap recap)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.Create(recap);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);

            }

            return result;
        }


        [HttpGet]
        public ActionResult<ItemsResponse<Recap>> GetByDate(string date)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Recap> recaps = _service.GetByDate(date);

                if (recaps == null)
                {
                    code = 404;
                    response = new ErrorResponse("Recaps not found");
                }
                else
                {
                    response = new ItemsResponse<Recap>() { Items = recaps };
                }

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                code = 500;
            }


            return StatusCode(code, response);
        }
    }
}
