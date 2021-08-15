export const cachedFetch = (url, options) => {
  let cacheKey = url;
  let cached = sessionStorage.getItem(cacheKey);
  if (cached !== null) {
    let response = new Response(new Blob([cached]));
    return Promise.resolve(response);
  }
  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      let ct = response.headers.get("Content-Type");
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response
          .clone()
          .text()
          .then((content) => {
            sessionStorage.setItem(cacheKey, content);
          });
      }
    }
    return response;
  });
};
