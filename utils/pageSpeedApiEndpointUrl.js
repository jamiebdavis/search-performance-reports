function pageSpeedApiEndpointUrl(strategy) {
  const apiBaseUrl =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  // Rental cars website
  const rentalCarsWebsite =
    "https://www.rentalcars.com/search-results?cor=gb&doDay=12&doHour=10&doMinute=0&doMonth=7&doYear=2022&driversAge=30&ftsType=A&location=37761&locationName=Gatwick%20Airport&puDay=11&puHour=10&puMinute=0&puMonth=7&puYear=2022";

  return (
    apiBaseUrl +
    "?url=" +
    "http://www.google.com" +
    "&key=" +
    process.env.PSI_APIKEY +
    "&strategy=" +
    strategy
  );
}

module.exports.pageSpeedApiEndpointUrl = pageSpeedApiEndpointUrl;
