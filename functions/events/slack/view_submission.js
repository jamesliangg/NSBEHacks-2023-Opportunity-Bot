const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Slack view_submission event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  console.log('view_submission.js called');
  let communityBlockValue = event.view.state.values['community-input'];
  let locationBlockValue = event.view.state.values['location-input'];
  let beginDateBlockValue = event.view.state.values['begin-date-input'];
  let endDateBlockValue = event.view.state.values['end-date-input'];
  let communityValue = communityBlockValue[Object.keys(communityBlockValue)[0]].value.toLowerCase();
  let locationValue = locationBlockValue[Object.keys(locationBlockValue)[0]].value.toLowerCase();
  let beginDateValue = beginDateBlockValue[Object.keys(beginDateBlockValue)[0]].value.toLowerCase();
  let endDateValue = endDateBlockValue[Object.keys(endDateBlockValue)[0]].value.toLowerCase();
  
  await lib.slack.messages['@0.6.1'].ephemeral.create({
    channelId: event.view.private_metadata,
    userId: event.user.id,
    text: `Community: *${communityValue}* Location: *${locationValue}* 
    Begin Date: *${beginDateValue}* End Date: *${endDateValue}*`
  });

};