const puppeteer = require("puppeteer");
require("dotenv").config();

const financeScrapper = async (res) => {
  const browser = await puppeteer.launch({  
    headless: "new",  
    args:[
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ],
    executablePath: process.env.NODE_ENV === "production" 
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        :puppeteer.executablePath(),     
});
  try {
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto("https://www.google.com/finance/?hl=en");
    const [element] = await page.$x("(//input[@aria-label='Search for stocks, ETFs & more'])[2]");
    await element.click({count: 3});
    await element.type('NASDAQ: AAPL');
    await page.keyboard.press('Enter');
    const xpathLocator = "(//*[text()='Apple Inc']/../../../..//*[contains(text(),'$')])[1]";
    const priceElement = await page.waitForXPath(xpathLocator, { visible: true });
    const price = await priceElement.evaluate(el => el.textContent);
    res.send(`The price of apple stock is: ${price}`);
    console.log(`The price of apple stock is: ${price}`);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while launching puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { financeScrapper };
