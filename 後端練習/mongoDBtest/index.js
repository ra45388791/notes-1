// const { MongoClient, ServerApiVersion } = require('mongodb');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const port = 5001;
// const url = 'mongodb+srv://user123:orange7380@cluster0.ndp9d.mongodb.net/testDataBase?retryWrites=true&w=majority'
// const url = 'mongodb+srv://user123:orange7380@cluster0.ndp9d.mongodb.net/testDataBase?retryWrites=true&w=majority'
const url = 'mongodb://user123:orange7380@cluster0-shard-00-00.ndp9d.mongodb.net:27017,cluster0-shard-00-01.ndp9d.mongodb.net:27017,cluster0-shard-00-02.ndp9d.mongodb.net:27017/testDataBase?ssl=true&replicaSet=atlas-ifvg1s-shard-0&authSource=admin&retryWrites=true&w=majority'


//實例化MongoClient
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const client = new MongoClient(url);


app.use(express.json());

app.get('/', async (req, res) => {



    try {


        await client.connect();                           //開啟連結
        const db = client.db("testDataBase");           //選擇資料庫
        const movies = db.collection('indexDB');           //選擇資料表

        const query = { title: 'Back to the Future' };      //包裝資料
        const movie = await movies.findOne(query);          //找到 title = Back to the Future 的資料
        // const movie = await movies.insertOne(query);     //新增 { title: 'Back to the Future' }這包資料

        console.log(movie);

    }
    catch (err) {
        console.error(err);
    }
    finally {

        await client.close();                               //!關閉連線
    }



    res.send('hello world')
})

app.listen(port);




