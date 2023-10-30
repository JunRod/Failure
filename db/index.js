import {MongoClient, ServerApiVersion} from 'mongodb'

const uri = "mongodb+srv://junior:junior123@cluster0.msp1exz.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connect() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
    } catch (e) {
        console.error(e)
    }
}

connect().catch(console.error)

export async function getArticles(day) {
    try {
        const database = client.db("war-mode-db");
        const collection = database.collection("articles");
        const result = await collection?.find({day})?.toArray()
        return result[0]?.articles ?? []
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
