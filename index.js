const express = require("express");
const { financeScrapper } = require("./financeScrapper");
const app = express();

const PORT = process.env.PORT || 4000

app.get("/scrape", (req, res) => {
    scrapeLogic(res);
})

app.get("/finance", (req, res) =>{
    financeScrapper(res);
});

app.get("/", (req, res) =>{
    res.send(`Puppeteer server is up and listening`)
    console.log(`Puppeteer server is up and listening`);
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
