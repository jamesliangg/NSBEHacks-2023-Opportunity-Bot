import {getWebsiteData} from "./puppeteerFunctions.js";
import {cohereSummary} from "./cohereFunctions.js";
import {cohereClassify} from "./cohereFunctions.js";
import {writeMongo} from "./write.js";

const websiteInformation = await getWebsiteData();
console.log(websiteInformation);

for (var i in websiteInformation) {
    // console.log("desc " + websiteInformation[i][5]);
    const cohereInput = websiteInformation[i][5].concat(websiteInformation[i][5]);
    // console.log("coinp " + cohereInput);
    var summarize = await cohereSummary(cohereInput);
    summarize = summarize.body.summary;
    // console.log("summ " + summarize);
    var classification = await cohereClassify(cohereInput);
    classification = classification.body.classifications[0].prediction;
    // console.log("sent" + sentiment);
    const writeData = await writeMongo(classification.toLowerCase(), websiteInformation[i][2].toLowerCase(), websiteInformation[i][3], websiteInformation[i][4], websiteInformation[i][1], websiteInformation[i][0], summarize, "conference")
}
