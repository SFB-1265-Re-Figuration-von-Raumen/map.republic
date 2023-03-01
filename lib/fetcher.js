export const fetcher = async (url, options) => {
  // console.log(`im really trying to fetch this url\n${url}\nwith these options:\n${JSON.stringify(options)}`)
  let response;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }
  const data = await response.json();
  return data;
};
