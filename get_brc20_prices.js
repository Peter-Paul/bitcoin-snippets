const axios = require("axios");
const url = "https://api.bestinslot.xyz/v3/brc20/ticker_info?ticker=ordi";
// const url =
//   " https://api.bestinslot.xyz/v3/collection/collections?sort_by=median_number&order=asc&offset=100&count=100";
const getPrices = async () => {
  try {
    const options = {
      headers: {
        "x-api-key": "585578ab-c6d1-4283-b520-4823560f4853",
      },
    };
    const response = await axios.get(url, options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getPrices();
