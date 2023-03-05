import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const mongo_key = process.env.MONGO_API_KEY;

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
            'api-key': mongo_key,
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