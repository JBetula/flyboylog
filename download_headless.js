const puppeteer = require('puppeteer');
const { debugDownHeadless } = require('./debug.js')
const path = require('path');
const fs = require('fs');
const { readCSV } = require('./convert_csv_to_entry.js');
const cron = require('node-cron');
const { connectDB, disconnectDB } = require('./db.js');


// cron.schedule('*/5 * * * *', async () => {
cron.schedule('0 4 * * *', async () => {
    connectDB()
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        // headless: false,
        headless: 'new',
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const client = await page.target().createCDPSession();
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath,
        });
        await page.goto('https://svensktambulansflyg.airmaestro.net/');
        await page.waitForSelector('#ctl00_Content_txtUsername');
        await page.type('#ctl00_Content_txtUsername', process.env.username);
        await page.type('#ctl00_Content_txtPassword', process.env.password);
        await page.click('#ctl00_Content_btnLogin');
        debugDownHeadless("Loggin in")
        await page.waitForNavigation();
        await page.goto('https://svensktambulansflyg.airmaestro.net/Modules/Reporting/ReportWizard.aspx?RID=80&V=1');
        debugDownHeadless("Navigating to report")
        await new Promise(r => setTimeout(r, 25000));
        debugDownHeadless("CLICK")
        page.screenshot()
        const html = await page.content();
        fs.writeFileSync("index.html", html);
        await page.waitForSelector('#ctl00_Content_Dynamic_CurrentFilter59_tbTextCompare');
        await page.evaluate(() => {
            document.getElementById('ctl00_Content_Dynamic_CurrentFilter59_tbTextCompare').value = '';
        });
        await page.evaluate(() => {
            document.getElementById('ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput').value = '';
        });
        await page.click('#ctl00_Content_Dynamic_lbExportCSV');
        await new Promise(r => setTimeout(r, 90000));
        debugDownHeadless('Download complete');
        // Rename the downloaded file
        const directory = './downloads/'; // Replace with the directory where the file is downloaded
        fs.readdir(downloadPath, (err, files) => {
            debugDownHeadless("RENAME")
            if (err) throw err;
            debugDownHeadless(files)
            for (const file of files) {
                if (file.startsWith('Basic')) {
                    fs.rename(path.join(directory, file), path.join(directory, 'input.csv'), err => {
                        if (err) {
                            console.error("Error while renaming:", err);
                        } else {
                            debugDownHeadless('Rename complete!');
                        }
                    });
                }
            }
        });
        debugDownHeadless("Call readCSV")
        readCSV('./downloads/input.csv')
        debugDownHeadless("DONE")

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
    await new Promise(r => setTimeout(r, 20000));
    disconnectDB()
    
});
