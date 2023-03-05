import {getWebsiteData} from "./puppeteerFunctions.js";
import {cohereSummary} from "./cohereFunctions.js";
import {cohereSentiment} from "./cohereFunctions.js";
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
    var sentiment = await cohereSentiment(cohereInput);
    sentiment = sentiment.body.classifications[0].prediction;
    // console.log("sent" + sentiment);
    const writeData = await writeMongo(sentiment, websiteInformation[i][2], websiteInformation[i][3], websiteInformation[i][4], websiteInformation[i][1], websiteInformation[i][0], summary, "conference")
}
