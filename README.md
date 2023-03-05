# Opportunity Bot
[<img src="https://open.autocode.com/static/images/open.svg?" width="192">](https://open.autocode.com/)

## What it does
Opportunity bot fetches inclusive events for you based on your community, location, and times.

The Slack bot sends a command to Autocode, which opens a modal for the user to input information.
The submission can be referenced with the `callback_id` of `search-terms`.

The *Search* button calls the `view_submission` handler which calls our database with your parameters.
The returned opportunities are then messaged to the user privately using a ephemeral message.

## Requirements
- Cohere API Key

## Using the bot
- See available communities and locations with the `/opp help` command
- Open the search box with `/opp search` 

## Credits
- James Liang
- Herve Aniglo
- Muhammad Ibrahim

## Links

## Reference links
- https://autocode.com/slack/templates/slack-airtable-reminders/