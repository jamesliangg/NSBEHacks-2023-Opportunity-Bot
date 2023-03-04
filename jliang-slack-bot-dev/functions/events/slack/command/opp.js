const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
 * An HTTP endpoint that acts as a webhook for Slack command event
 * @param {object} event Slack command event body (raw)
 * @returns {any} result
 */
module.exports = async (event, context) => {
  let result = {slack: {}};
  
  let commandText = event.text.trim();
  let commandTextComponents = commandText.split(/(\s+)/);
  
  if (commandTextComponents[0].toLowerCase() === 'search') {
    let submission = await lib.slack.views['@0.0.3'].open({
      trigger_id: event.trigger_id,
      view: {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "Search Opportunities",
          "emoji": true
        },
        "submit": {
          "type": "plain_text",
          "text": "Search",
          "emoji": true
        },
        "blocks": [
          {
            "type": "input",
            "block_id": "community-input",
            "element": {
              "type": "plain_text_input"
            },
            "label": {
              "type": "plain_text",
              "text": "Community (black)",
              "emoji": true
            }
          },
          {
            "type": "input",
            "block_id": "location-input",
            "element": {
              "type": "plain_text_input"
            },
            "label": {
              "type": "plain_text",
              "text": "City (toronto)",
              "emoji": true
            }
          },
          {
            "type": "input",
            "block_id": "begin-date-input",
            "element": {
              "type": "plain_text_input"
            },
            "label": {
              "type": "plain_text",
              "text": "Begin Date (YYYY-MM-DD)",
              "emoji": true
            }
          },
          {
            "type": "input",
            "block_id": "end-date-input",
            "element": {
              "type": "plain_text_input"
            },
            "label": {
              "type": "plain_text",
              "text": "End Date (YYYY-MM-DD)",
              "emoji": true
            }
          },
        ],
        "callback_id": "search-terms",
        "private_metadata": `${event.channel_id}`
      }
    });
    return submission;
  }
  else {
    console.log(`Help Menu`);
    result.slack.messageResponse = await lib.slack.messages['@0.6.1'].ephemeral.create({
      channelId: event.channel_id,
        userId: event.user_id,
      text: `> Open search box with \`/opp search\`\n>\n> Current Communities:\n> • black\n> • example1\n> • example2\n>\n> Current Locations:\n> • toronto\n> • atlanta\n> • example3`
    });
  }
  // console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
  // result.slack.channel = await lib.slack.conversations['@0.2.14'].info({
    // id: `${event.channel_id}`
  // });
  
  // console.log(`Running [Slack → Retrieve a User]...`);
  // result.slack.user = await lib.slack.users['@0.4.0'].retrieve({
    // user: `${event.user_id}`
  // });
  
  // console.log(`Echoing the text after the command back to the channel`);
  // result.slack.messageResponse = await lib.slack.channels['@0.7.0'].messages.create({
    // channel: `#${result.slack.channel.name}`,
    // text: `Hello <@${result.slack.user.name}>! You said: *${event.text}*`
  // });
};
