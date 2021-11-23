import urls from "./urls";


export const getAllArticles = async () => {
    return fetchApi(urls.getAllArticles, 'GET');
  };

  export const getArticlesByCategory = async (category) => {
    return fetchApi(urls.getArticlesByCategory(category), 'GET');
  };


  const fetchApi = async (url, method, body) => {
    console.log("url fetch", url);
  
    let params = {
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      },
    };
  
    if (body) {
      params.body = JSON.stringify(body);
      console.log('body: ', params.body);
    }
    if (method) {
      params.method = method;
    }
  
    return await fetch(url, params);
  };
  