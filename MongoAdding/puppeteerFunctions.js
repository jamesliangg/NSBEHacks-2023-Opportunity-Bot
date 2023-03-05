import puppeteer from "puppeteer";
const testWebsite = "https://airtable.com/shrHRqQkdh5BLKATh/tbl5pt0Pd2MIWT1bb"
var finalArray = [];
// let outputArray;
var titleArray = new Array;
var webLocArray = new Array;
var descArray = new Array;
var dateArray = new Array;
export async function callThisOne(website, reviewSelector) {
    return await scrapeWebsite(website, reviewSelector);
}

async function scrapeWebsite(website, reviewSelector) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    await page.screenshot({ path: "website.png", fullPage: true });
    const reviews = await page.evaluate((reviewSelector) => {
        return Array.from(document.querySelectorAll(reviewSelector)).map(x => x.textContent)
    }, reviewSelector);
    await browser.close();
    // console.log(reviews);
    return reviews;
}

export async function getWebsiteData() {
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            // title
            let reviewSelector = ".flex.items-center.pt1.px2.huge a"
            var titleArray = await callThisOne(testWebsite, reviewSelector);
        }
        else if (i == 1) {
            // website and location, remove every third index
            let reviewSelector = ".cell.read.relative .flex-auto.truncate"
            var webLocArray = await callThisOne(testWebsite, reviewSelector);
        }
        else if (i == 2) {
            // start and end date
            let reviewSelector = ".truncate.css-10jy3hn"
            var dateArray = await callThisOne(testWebsite, reviewSelector);
        }
        else if (i == 3) {
            // description
            let reviewSelector = ".richText.line-height-4.height-full div p"
            var descArray = await callThisOne(testWebsite, reviewSelector);
            descArray = descArray.filter(item => item);
            // console.log(descArray);
        }
    }
    finalArray.push([titleArray[0], webLocArray[0], webLocArray[1], dateArray[0], dateArray[1], descArray[0]]);
    finalArray.push([titleArray[1], webLocArray[3], webLocArray[4], dateArray[2], dateArray[3], descArray[1]]);
    finalArray.push([titleArray[2], webLocArray[6], webLocArray[7], dateArray[4], dateArray[5], descArray[2]]);
    return finalArray;
}


// console.log(finalArray);

// console.log(callThisOne(testWebsite));