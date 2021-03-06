import axios from "axios";
import { onGlobalError, onGlobalSuccess } from "./serviceHelper";

const doolRecapEndpoint = "https://api.themoviedb.org/3/tv/881";
const doolApiKey = "?api_key=";

const getToday = () => {
  const config = {
    method: "GET",
    url: doolRecapEndpoint + doolApiKey,
    withCredentials: false,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRandom = (seasonInt) => {
  const config = {
    method: "GET",
    url: `${doolRecapEndpoint}/season/${seasonInt}${doolApiKey}`,
    withCredentials: false,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { getToday, getRandom };
