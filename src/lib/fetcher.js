import axios from "axios";
  const endpoint = process.env.NEXT_PUBLIC_END_POINT;

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
