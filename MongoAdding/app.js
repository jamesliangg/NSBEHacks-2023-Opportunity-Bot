var axios = require('axios');
var data = JSON.stringify({
    "collection": "sample",
    "database": "artemis",
    "dataSource": "AclaimBot",
    "filter": {"city": "toronto", "community": "black"},
    "limit": 3
});

var config = {
    method: 'post',
    url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-ahszi/endpoint/data/v1/action/find',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'IDZmp6ebGz2serkv6kcWknfvJn690yOUnQ1Uh6ADA8zZ3WEflyV1Kzgqojw7uUJK',
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        return JSON.stringify(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });