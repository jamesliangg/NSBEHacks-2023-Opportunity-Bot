# Opportunity Bot
#### 3rd Place for Cohere Challenge and Runner-up for Salesforce x Slalom Challenge
[<img src="https://open.autocode.com/static/images/open.svg?" width="192">](https://open.autocode.com/)

<hr>

## Inspiration
Finding a community can be difficult even with Google. Eventbrite is one of the first things that pop up, but you'd need to go through the events individually to find information. We wanted to create a program to give you information about multiple opportunities based on your community and location.

## What it does
Opportunity bot fetches inclusive events for you based on your community, location, and times.

The user calls the Slack bot with `opp search` and inputs their community and location. This data is used to query our MongoDB database and sends you a private ephemeral message on Slack. None of the input data is stored for the privacy of the user.

The Slack bot sends a command to Autocode, which opens a modal for the user to input information.
The submission can be referenced with the `callback_id` of `search-terms`.

The *Search* button calls the `view_submission` handler which calls our database with your parameters.
The returned opportunities are then messaged to the user privately using a ephemeral message.

The scraping function scrapes a website with opportunities using puppeteer. These opportunities are passed into Cohere's classify and summarize models. Based on our training data, the data is sorted into communities (LGBTQIA+, Person of Color, etc.) and then written to our MongoDB database. This function would be run periodically to retrieve new events.

## How we built it
- We used Autocode to handle the Slack bot as it would've been much more difficult to run it locally. 
- We used Axios for interacting with our MongoDB database. 
- Cohere was utilized to classify and summarize the opportunities we provided it.

<hr>

# Cloning the bot
## Requirements
- Cohere API Key
- MongoDB API
- MongoDB Database

## Autocode
Install the project on ![Autocode](https://autocode.com/jliang/templates/slack-bot/). You'll need to connect Slack using the longer six step method. An example App Manifest is in the `Autocode` folder. 

You'll also need to replace the `mongo` variables at the top of the `mdbFunctions.js` file. Your MongoDB API key should be stored as an environment variable.

## Mongo Scraper
Clone the `MongoAdding` folder and install the dependencies with `npm install`.
You'll also need to replace the `mongo` variables at the top of the `write.js` file.

The `COHERE_API_KEY` and `MONGO_API_KEY` should be stored in a `.env` file in the same folder.

You should be able to do `node index` to run the scraper.

## Using the bot
- See available communities and locations with the `/opp help` command
- Open the search box with `/opp search` 

<hr>

## Credits
- James Liang
- Herve Aniglo
- Muhammad Ibrahim

## Reference links
- https://autocode.com/slack/templates/slack-airtable-reminders/