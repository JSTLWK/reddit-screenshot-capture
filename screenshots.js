const puppeteer = require('puppeteer');
const fs = require('fs');

console.log(`Booting...`);

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',  // Custom path
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log(`Booted browser...`);

    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    page.setViewport({ width: 1280, height: 800 });

    // Add cookies if necessary (example cookies)
    const cookies = [
        {
            name: 'eu_cookie',
            value: '{%22opted%22:true%2C%22nonessential%22:true}',
            domain: 'reddit.com'
        }
    ];
    await page.setCookie(...cookies);

    console.log(`Set new page...`);

    const posts = JSON.parse(fs.readFileSync("posts.json"));

    console.log(`Found in total of ${posts.length} posts, capturing all the posts...`);

    for (let i = 0; i < posts.length; i++) {
        console.log(`Capturing: ${posts[i]}`);
        try {
            await page.goto(posts[i], {
                waitUntil: 'load',  // Wait for full page load
                timeout: 120000     // Increase timeout
            });

            // Wait for comments section to load

            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));

            // Take screenshot
            await page.screenshot({
                path: `screenshots/post_${i + 1}.png`,
                fullPage: true
            });
        } catch (error) {
            console.log(`Error capturing ${posts[i]}: ${error.message}`);
        }
    }

    await browser.close();
})();
