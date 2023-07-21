// inicial config

const express = require('express');
const app = express();

// reading JSON configuration / middleware
app.use(express.urlencoded(
    {extended: true}
 )
);

app.use(express.json());

//endpoint
app.get('/', (req, res) => {
    res.json({message: "Express is up!"})
});

//port
app.listen(8080)