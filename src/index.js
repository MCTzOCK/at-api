require('dotenv').config();

const express = require('express');
const nodeFetch = require('node-fetch');

const app = express();

app.get("/:postal", async (req, res) => {
    const postal = req.params.postal;

    const fetchRes = await nodeFetch(process.env.API_BASE + "?codes=" + postal, {
        method: "GET",
        headers: {
            "apikey": process.env.API_KEY
        }
    });


    const data = await fetchRes.json();

    const cityName = data.results[new String(postal)][0].city;

    res.status(200);

    res.json({
        "city": cityName
    });

    res.end();
    
    
})

app.listen(3000, "0.0.0.0", () => {
    console.log("> Ready on port 3000")
})