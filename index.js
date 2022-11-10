const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vwrnpfj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const serviceCollection = client.db('Photography').collection('services');
       const reviewCollection = client.db('Photography').collection('reviews');

      // services get api from db
       app.get('/services', async(req, res) => {
        const query = {};
        const cursor =  serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
       }); 

       app.get('/services/:id', async(req,res) => {
           const id = req.params.id
           const query = {_id:ObjectId(id)};
           const services = await serviceCollection.findOne(query);
           res.send(services);
       });

       // add review api
       app.post('/reviews', async(req,res) => {
          const review = req.body;
          const result =await reviewCollection.insertOne(review);
          res.send(result);
       });

       app.get('/reviews', async(req,res)=> {
         const query = {};
         const cursor = reviewCollection.find(query);
         const reviews = await cursor.toArray();
         res.send(reviews);
       });
    }
    finally{

    }
};
run().catch(err => console.log(err));

app.get('/',(req, res) => {
    res.send('Photography website server running!!');
});

app.listen(port,()=> {
    console.log(`Photography website running on ${port}`)
});