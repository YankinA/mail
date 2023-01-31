const baseUrl = "http://localhost:3000";
const rootAPI = "/api/v1";

type Query = {
  [key: string]: string | number | boolean
}

export default {
  getMails: (query: Query) => `${baseUrl}${rootAPI}/mails?${new URLSearchParams(query)}`, 
}

