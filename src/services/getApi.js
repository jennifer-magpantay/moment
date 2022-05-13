import "regenerator-runtime/runtime";
// imported regenrator-runtime to fix the `regeneratorRuntime is not defined` error
// also added a browserlist on package.json

// set a function that will deal with the errors and return the data JSON
async function returnFetchJson(url) {
  try {
    const response = await fetch(url);
    // if response is ok, then return response.json
    if (response.ok) {
      return response.json();
    } else {
      // throw a error
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw error;
  }
}

export const getApi = () => {
  const URL = "https://type.fit/api/quotes";
  return returnFetchJson(URL);
};
