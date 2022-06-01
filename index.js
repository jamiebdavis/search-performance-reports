const generateReport = require("./utils/generate-report");

const screenTypes = ["mobile", "desktop"];

async function run () {
  console.warn("THIS IS RUNNING A PSI ON GOOGLE")
  for (const screen of screenTypes) {
    try {
      await generateReport(screen);
    } catch (err) {
      console.error("generateReport: Failed to run");
      // console.log(err);
    }
  }
  console.log("Report attemped finished");
};

run();