const axios = require("axios");

const { pageSpeedApiEndpointUrl } = require("./pageSpeedApiEndpointUrl");

async function fetchDataFromPSI(strategy) {

  const pageSpeedEndpointUrl = pageSpeedApiEndpointUrl(strategy);
  const response = await axios.get(pageSpeedEndpointUrl).catch(function(error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

  });

  const lighthouse = response.data.lighthouseResult;
  const originLoadingExperience = response.data.originLoadingExperience;

  const result = {
    overall_performance: originLoadingExperience["overall_category"],
    score: lighthouse["categories"]["performance"]["score"] * 100,
    firstContentfulPaint:
      lighthouse["audits"]["first-contentful-paint"]["displayValue"],
    speedIndex: lighthouse["audits"]["speed-index"]["displayValue"],
    timeToInteractive: lighthouse["audits"]["interactive"]["displayValue"],
    firstMeaningfulPaint:
      lighthouse["audits"]["first-meaningful-paint"]["displayValue"]
  };

  return result;

}

module.exports.fetchDataFromPSI = fetchDataFromPSI;
