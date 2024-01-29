const puppeteer = require("puppeteer");
const chromeOptions = {  
    headless: false,  
    args:[
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ],
    executablePath: process.env.NODE_ENV === "production" 
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        :"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",     
}
module.exports = chromeOptions ;