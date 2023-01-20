const express = require('express');
const fs = require('fs');
const path = require('path');

const zipCodes = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "..", "data", "plz.json")
    )
)

const app = express();

app.get("/:postal", async (req, res) => {
    try {
        const postal = req.params.postal;
    
        const obj = zipCodes.find((x) => x.PLZ === postal);
    
        if(!obj) {
            res.status(200).json({
                city: "not-found"
            }).end();
            return;
        }
    
        const cn = obj.Stadt;
    
        res.status(200).json({
            city: `${obj.Bundesland}, ${cn}`
        }).end();
    }catch (e) {
        res.status(500).json({error: e}).end();
    }
})

app.listen(3000, "0.0.0.0", () => {
    console.log("> Ready on port 3000")
})