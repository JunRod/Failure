import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb'
import {sort} from "@node_modules/next/dist/build/webpack/loaders/css-loader/src/utils.js";

const uri = "mongodb+srv://junior:junior123@cluster0.msp1exz.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
    }
});

const collection = client.db("war-mode-db").collection("articles");

export async function connect() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
    } catch (e) {
        console.error(e)
    }
}

connect().catch(console.error)

export async function getArticles(month, day) {
    try {
        const result = await collection?.find({day, month}).toArray()
        return result ?? []
    } catch (e) {
        console.error(e)
    }

}

export async function getArticlesByDay(rangue) {

    const {today, twoDay} = rangue

    try {
        const database = client.db("war-mode-db");
        const collection = database.collection("articles");
        let result = ''

        if (today < twoDay) {
            result = await collection?.find({day: {$gte: today, $lte: twoDay}})?.toArray()
        } else {
            result = await collection?.find({day: {$gte: twoDay, $lte: today}})?.toArray()
        }

        const resultArticles = result.map(item => item.articles)

        let content = []

        resultArticles.map(article => {
            content = [...content, ...article]
        })
        return content

    } catch (e) {
        console.error(e)
    }
}

export async function getOrCreateUser(email) {
    let query = {
        "user": email
    };

    let result = ''

    try {
        result = await collection.findOne(query);
    } catch (err) {
        console.log("Error occurred while executing findOne:", err.message);
        return {error: err.message};
    }

    if (!result) {
        try {
            const newDocument = {user: email, articles: []};
            result = await collection.insertOne(newDocument);
        } catch (err) {
            console.log("Error occurred while executing findOne:", err.message);
            return {error: err.message};
        }
    }

    return result
}
