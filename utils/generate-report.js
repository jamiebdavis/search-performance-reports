require("dotenv").config();
const { google } = require("googleapis");
const date = require("date-and-time");
const { fetchDataFromPSI } = require("./fetchDataFromPSI");

async function generateReport(screenType) {
  const now = new Date();

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1D8LfZiz3t4meTVB3pP002uwYGFGBoeixnYVhNoOfhsA";

  console.log(`Generating report for ${screenType}.`);
  let data = await fetchDataFromPSI(screenType);
  const {
    overall_performance,
    score,
    firstContentfulPaint,
    speedIndex,
    timeToInteractive,
    firstMeaningfulPaint,
  } = data;

  let values = [
    [
      date.format(now, 'YYYY/MM/DD HH:mm:ss'),
      screenType,
      overall_performance,
      score,
      firstContentfulPaint,
      speedIndex,
      timeToInteractive,
      firstMeaningfulPaint,
    ],
    // Additional rows ...
  ];
  const requestBody = {
    values,
  };
  await googleSheets.spreadsheets.values.append(
    {
      spreadsheetId,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody,
    },
    (err, result) => {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log("Cells updated.");
      }
    }
  );
}

module.exports = generateReport;
