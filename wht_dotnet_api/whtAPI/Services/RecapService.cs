using System.Data;
using System.Data.SqlClient;
using whtAPI.Data;
using whtAPI.Data.Interfaces;
using whtAPI.Models;

namespace whtAPI.Services
{
    public class RecapService : IRecapService
    {
        IDataProvider _data;
        public RecapService(IDataProvider data)
        {
            _data = data;
        }


        public int Create(Recap recap)
        {
            int id = 0;

            string procName = "[dbo].[Recaps_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Date", recap.Date);
                collection.AddWithValue("@Recap", recap.Overview);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                collection.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object old = returnCollection["@Id"].Value;

                int.TryParse(old.ToString(), out id);
            });

            return id;
        }

        public List<Recap> GetByDate(string date)
        {
            List<Recap> recaps = null;

            string procName = "[dbo].[Recaps_SelectBy_Date]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Date", date);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;

                Recap recap = new Recap();

                recap.Date = reader.GetSafeString(index++);
                recap.Overview = reader.GetSafeString(index++);

                if (recaps == null)
                {
                    recaps = new List<Recap>();
                }

                recaps.Add(recap);
            });


            return recaps;
        }

    }
}
