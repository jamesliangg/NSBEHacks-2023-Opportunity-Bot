import {getWebsiteData} from "./puppeteerFunctions.js";
import {cohereSummary} from "./cohereFunctions.js";
import {cohereClassify} from "./cohereFunctions.js";
import {writeMongo} from "./write.js";

// retrieves array of data from website
const websiteInformation = await getWebsiteData();
console.log(websiteInformation);

for (var i in websiteInformation) {
    // console.log("desc " + websiteInformation[i][5]);
    const cohereInput = websiteInformation[i][5].concat(websiteInformation[i][5]);
    // console.log("coinp " + cohereInput);
    // Cohere summarizaiton
    var summarize = await cohereSummary(cohereInput);
    summarize = summarize.body.summary;
    // console.log("summ " + summarize);
    // Cohere classification
    var classification = await cohereClassify(cohereInput);
    classification = classification.body.classifications[0].prediction;
    // console.log("sent" + sentiment);
    // writes data to database
    const writeData = await writeMongo(classification.toLowerCase().trim(), websiteInformation[i][2].toLowerCase().trim(), websiteInformation[i][3].trim(), websiteInformation[i][4].trim(), websiteInformation[i][1].trim(), websiteInformation[i][0].trim(), summarize.trim(), "conference")
}
