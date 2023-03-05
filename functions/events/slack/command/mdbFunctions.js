const mongokey = process.env.MONGODB_APIKEY;
const axios = require('axios');

async function fetchDB (city, community) {
  var data = JSON.stringify({
    "collection": "sample",
    "database": "artemis",
    "dataSource": "AclaimBot",
    "filter": {"city": city, "community": community},
    // "filter": {"city": "toronto", "community": "transgender"},
    "limit": 3
  });
  
  var config = {
    method: 'post',
    url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-ahszi/endpoint/data/v1/action/find',
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

// const output = await fetchDB("toronto", "transgender");
// console.log(output);

module.exports.fetchDB = fetchDB;