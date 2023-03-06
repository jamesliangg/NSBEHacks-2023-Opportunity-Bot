// Change these to your MongoDB database
const mongoCollection = "sample";
const mongoDatabse = "artemis";
const mongoDataSource = "AclaimBot";
const mongoEndPoint = "https://us-east-2.aws.data.mongodb-api.com/app/data-ahszi/endpoint/data/v1/action/insertOne";


import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const mongo_key = process.env.MONGO_API_KEY;

// writes the information to MongoDB
export async function writeMongo(community, city, beginDate, endDate, link, opportunityName, summary, type) {
    var data = JSON.stringify({
        "collection": mongoCollection,
        "database": mongoDatabse,
        "dataSource": mongoDataSource,
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
        url: mongoEndPoint,
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