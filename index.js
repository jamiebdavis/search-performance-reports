const generateReport = require("./utils/generate-report");

const screenTypes = ["mobile", "desktop"];

async function run () {
  for (const screen of screenTypes) {
    try {
      await generateReport(screen);
    } catch (err) {
      console.error("generateReport: Failed to run");
      console.log(err);
    }
  }
  console.log("Reports complete");
};

run();