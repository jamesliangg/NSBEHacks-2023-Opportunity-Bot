const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const modalInput = await modalBox(context.params.event);

// creates Slack modal box for input
async function modalBox (commandRequest) {
  let result = {slack: {}};

  let commandText = commandRequest.text.trim();
  let commandTextComponents = commandText.split(/(\s+)/);

  // creates modal box if user does /opp search
  if (commandTextComponents[0].toLowerCase() === 'search') {
    let submission = await lib.slack.views['@0.0.3'].open({
      trigger_id: commandRequest.trigger_id,
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
              "text": "Community (lgbtqia+)",
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
        "private_metadata": `${commandRequest.channel_id}`
      }
    });
    return submission;
  }
  // sends ephemeral help message if user tests anything else
  else {
    console.log(`Help Menu`);
    result.slack.messageResponse = await lib.slack.messages['@0.6.1'].ephemeral.create({
      channelId: commandRequest.channel_id,
        userId: commandRequest.user_id,
      text: `> Open search box with \`/opp search\`\n>\n> Current Communities:\n> • disabled\n> • religious minority\n> • person of color\n> • women\n> • lgbtqia+\n>\n> Current Locations:\n> • toronto\n> • oshawa\n> • winnipeg\n> • vancouver\n> • ottawa`
    });
  }
}