const axios = require("axios");

const { pageSpeedApiEndpointUrl } = require("./pageSpeedApiEndpointUrl");

async function fetchDataFromPSI(strategy) {

  const pageSpeedEndpointUrl = pageSpeedApiEndpointUrl(strategy);
  const response = await axios.get(pageSpeedEndpointUrl);

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
