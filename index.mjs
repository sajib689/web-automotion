import puppeteer from 'puppeteer';

// Utility to delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // moved outside defaultViewport
    userDataDir: "temporary", // moved outside defaultViewport
    defaultViewport: {
        width: 1400,
        height: 1000
    }
});

const page = await browser.newPage();

await page.goto('https://devconfbd.com', {
    waitUntil: 'networkidle2',
    timeout: 60000
});

await page.screenshot({ path: 'devconfbd.png' });

// Wait for the guest image to appear
await page.waitForSelector("img[alt='guest']");

// Delay for a second
await delay(1000);

// Click the image
const guestElement = await page.$("img[alt='guest']");
if (guestElement) {
    await guestElement.scrollIntoViewIfNeeded(); // Ensure it's in view
    await delay(1000);
    await guestElement.click();
}

// Take screenshot after interaction
await delay(1000);
await page.screenshot({ path: 'devconfbd-guest.png' });

await browser.close();
