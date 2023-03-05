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
- MongoDB API Key

## Using the bot
- See available communities and locations with the `/opp help` command
- Open the search box with `/opp search` 

## Adding to the Database
- Download the `MongoAdding` folder
- Do `npm install`
- Create a `.env` file with your Cohere API key, it should be labled `COHERE_API_KEY`
- Add your MongoDB key to `.env` and label it `MONGO_API_KEY`
- Change your database information in `write.js` (url, collection, database, dataSource)
- Run with `node index`

## Credits
- James Liang
- Herve Aniglo
- Muhammad Ibrahim

## Links

## Reference links
- https://autocode.com/slack/templates/slack-airtable-reminders/
- https://www.mongodb.com/docs/atlas/app-services/data-api/generated-endpoints/
- https://docs.cohere.ai/reference/classify
- https://docs.cohere.ai/reference/summarize-2
