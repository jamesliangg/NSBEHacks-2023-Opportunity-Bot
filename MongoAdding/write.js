import axios from "axios";

export async function writeMongo(community, city, beginDate, endDate, link, opportunityName, summary, type) {
    var data = JSON.stringify({
        "collection": "sample",
        "database": "artemis",
        "dataSource": "AclaimBot",
        "document": {
            community: community,
            city: city,
            beginDate: beginDate,
            endDate: endDate,
            link: link,
            opportunityName: opportunityName,
            summary: summary,
            type: type
        }
    });

    var config = {
        method: 'post',
        url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-ahszi/endpoint/data/v1/action/insertOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'IDZmp6ebGz2serkv6kcWknfvJn690yOUnQ1Uh6ADA8zZ3WEflyV1Kzgqojw7uUJK',
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            console.log("wrote to Mongo")
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}