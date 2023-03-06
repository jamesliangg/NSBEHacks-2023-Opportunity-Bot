// Change these to your MongoDB database
const mongoCollection = "sample";
const mongoDatabse = "artemis";
const mongoDataSource = "AclaimBot";
const mongoEndPoint = "https://us-east-2.aws.data.mongodb-api.com/app/data-ahszi/endpoint/data/v1/action/find";


const mongokey = process.env.MONGODB_APIKEY;
const axios = require('axios');

// fetches information from database
async function fetchDB (city, community) {
  var data = JSON.stringify({
    "collection": mongoCollection,
    "database": mongoDatabse,
    "dataSource": mongoDataSource,
    "filter": {"city": city, "community": community},
    // maximum number of results that are returned from database
    "limit": 5
  });
  
  var config = {
    method: 'post',
    url: mongoEndPoint,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': mongokey,
    },
    data: data
  };
  const res = await axios(config);
  return JSON.stringify(res.data);
}

module.exports.fetchDB = fetchDB;