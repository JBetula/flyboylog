const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

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
        console.log("Loggin in")
        await page.waitForNavigation();

        await page.goto('https://svensktambulansflyg.airmaestro.net/Modules/Reporting/ReportWizard.aspx?RID=80&V=1');

        // const today = new Date();
        // const day = today.getDate();
        // const month = today.getMonth() + 1;
        // const year = today.getFullYear();
        // const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

        // // Use evaluateHandle to get a JSHandle to the input element
        // const dateInputHandle = await page.$('#ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput');

        // // Use the JSHandle to set the value of the input element
        // await dateInputHandle.evaluate((input, formattedDate) => {
        //     input.value = formattedDate;

        //     // Trigger an 'input' event to simulate user input
        //     const inputEvent = new Event('input', { bubbles: true });
        //     input.dispatchEvent(inputEvent);

        //     // Trigger a 'change' event to ensure any associated listeners are notified
        //     const changeEvent = new Event('change', { bubbles: true });
        //     input.dispatchEvent(changeEvent);

        //     // Optionally, trigger a 'blur' event to simulate losing focus (if needed)
        //     const blurEvent = new Event('blur', { bubbles: true });
        //     input.dispatchEvent(blurEvent);
        // }, formattedDate);

        await new Promise(r => setTimeout(r, 3000));
        await page.waitForSelector('#ctl00_Content_Dynamic_lbExportCSV', { visible: true, timeout: 60000 });
        await page.click('#ctl00_Content_Dynamic_lbExportCSV', { visible: true, timeout: 60000 });

        await new Promise(r => setTimeout(r, 90000));

        console.log('Download complete');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
})();