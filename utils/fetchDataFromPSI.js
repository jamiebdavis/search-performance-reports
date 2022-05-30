const axios = require("axios");

const { pageSpeedApiEndpointUrl } = require("./pageSpeedApiEndpointUrl");

async function fetchDataFromPSI(strategy) {
  const pageSpeedEndpointUrl = pageSpeedApiEndpointUrl(strategy);

  try {
    const response = await axios.get(pageSpeedEndpointUrl);
    console.log("Website Performance retrieval successful!");

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
        lighthouse["audits"]["first-meaningful-paint"]["displayValue"],
    };

    return result;

  } catch (err) {
    console.error("Website Performance retrieval failed!");
    console.error(err);
  }
}

module.exports.fetchDataFromPSI = fetchDataFromPSI;
