const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const mdbFunctions = require('./mdbFunctions.js');
var finalMessage = "";

module.exports = async (event) => {
  console.log('view_submission.js called');
  // get values from modal
  let communityBlockValue = event.view.state.values['community-input'];
  let locationBlockValue = event.view.state.values['location-input'];
  // let beginDateBlockValue = event.view.state.values['begin-date-input'];
  // let endDateBlockValue = event.view.state.values['end-date-input'];
  let communityValue = communityBlockValue[Object.keys(communityBlockValue)[0]].value.toLowerCase();
  let locationValue = locationBlockValue[Object.keys(locationBlockValue)[0]].value.toLowerCase();
  // let beginDateValue = beginDateBlockValue[Object.keys(beginDateBlockValue)[0]].value.toLowerCase();
  // let endDateValue = endDateBlockValue[Object.keys(endDateBlockValue)[0]].value.toLowerCase();
  var outputText = await mdbFunctions.fetchDB(locationValue, communityValue);
  console.log("test1 " + outputText);
  outputText = JSON.parse(outputText);
  outputText = outputText.documents;
  console.log("test2 " + outputText);
  // format final message
  for (var i in outputText) {
    let tempText = outputText[i];
    // console.log("test3 " + JSON.stringify(tempText));
    console.log(tempText);
    finalMessage += "> " + tempText.opportunityName;
    finalMessage += "\n"
    finalMessage += tempText.summary;
    finalMessage += "\n"
    finalMessage += "Type: " + tempText.type;
    finalMessage += "\n"
    finalMessage += "Community: " + tempText.community;
    finalMessage += "\n"
    finalMessage += "City: " + tempText.city;
    finalMessage += "\n"
    finalMessage += "Begin Date: " + tempText.beginDate;
    finalMessage += "\n"
    finalMessage += "End Date: " + tempText.endDate;
    finalMessage += "\n"
    finalMessage += tempText.link;
    finalMessage += "\n\n"
  }
  console.log(finalMessage);
  // send ephemeral to user
  await lib.slack.messages['@0.6.1'].ephemeral.create({
    channelId: event.view.private_metadata,
    userId: event.user.id,
    text: finalMessage
  });

};