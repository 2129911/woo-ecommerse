import axios from "axios";

const endpoint = "https://wordpress-1347810-5596954.cloudwaysapps.com/graphql1";

export const requestWooGraphQL = async (query,variables) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await axios({
    url: endpoint,
    method: "POST",
    headers,
    data: {
      query: query,  
       variables: variables, 
    },
  });

  return response.data;
};
