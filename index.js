import puppeteer from "puppeteer";
import fs from 'fs';

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const startUrl = process.env.STARTURL;

if (startUrl == '') {
    console.log('Starturl missing');
};

const getQuotes = async () => {
    var quotes = [];

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
        headless: true,
        defaultViewport: null,
    });

    // Open a new page
    var page = await browser.newPage();

    await page.goto(startUrl, {
        waitUntil: "domcontentloaded",
    });

    await page.waitForSelector('.privacy-prompt-button.primary-button.ccmgt_accept_button.rebrand');
    const acceptCookies = await page.locator('.privacy-prompt-button.primary-button.ccmgt_accept_button.rebrand');
    await acceptCookies.click();

    const arrayPages = await page.evaluate(() => Array.from(document.querySelectorAll('.res-14njlc6'), element => element.innerText));
    const lastPage = arrayPages[arrayPages.length - 1];

    try {
        do {
            const currentPage = await page.evaluate(() => Array.from(document.querySelectorAll('.res-3ue2q3 > .res-1cekje2 > .res-vurnku'), element => element.innerText));

            console.log("Seite " + currentPage + " von " + lastPage);


            const quotesSite = await page.evaluate(() => Array.from(document.querySelectorAll('.res-1ewaude > .res-vurnku > .res-nehv70'), element => element.innerText));
            quotes = quotes.concat(quotesSite);

            const nextAvailable = await page.locator('[id^="stepstone-pagination-"] > ul > li:nth-child(9) > a');
        
            await nextAvailable.click();
            await page.waitForNavigation();
        } while (true);

    } catch (error) {
        if (error.message != "Timed out after waiting 30000ms"){
            console.log(error);
        }
    };

    // // Close the browser
    await browser.close();

    return (quotes);

};


// Start the scraping

var elements = await getQuotes();

var elementsObject = { elements };

var elementsString = JSON.stringify(elementsObject);

fs.writeFile('/usr/src/app/Data.json', elementsString, err => {
    if (err) {
        console.error(err);
    } else {
        console.log("Datei erfolgreich geschrieben");
    }
});



