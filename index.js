const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


app.get('/',(req, res) => {
    res.send('Photography website server running!!');
});

app.listen(port,()=> {
    console.log(`Photography website running on ${port}`)
});