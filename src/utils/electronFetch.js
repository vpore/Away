const electronFetch = (pathname, body) => {
  window.api.send(
    "toElectron",
    JSON.stringify({
      pathname,
      body,
    })
  );

  return new Promise((resolve, reject) => {
    try {
      window.api.receive("fromElectron", (data) => resolve(JSON.parse(data)));
    } catch (e) {
      reject(e);
    }
  });
};

export default electronFetch;