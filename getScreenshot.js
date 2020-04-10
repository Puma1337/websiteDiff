const puppeteer = require("puppeteer");
const moment = require("moment");
const fs = require("mz/fs");
const util = require("./util");

exports.getScreenshot = async function(site, original) {
    //util.log(site);
    const browser = await puppeteer.launch({headless:true})
    const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage()

    await page.setViewport({
        width: 1280,
        height: 800
    })

    await page.goto(site);

    const arr = site.split("/");
    const siteName = arr[2];
    

    if(!fs.existsSync(siteName)){
        fs.mkdirSync(siteName);
    }
   

    var now = await moment().format('YYYY-MM-DD-hh-mm-ss-a');
    util.log(now);
    var fileName = now + ".png"
    var filePath = await siteName + "/" + fileName;
    util.log(siteName);
    util.log(filePath);
    await util.timeout(10000);
    await page.screenshot({
        path: filePath,
        fullPage: true
    })

    await browser.close();

    if(original){
        fs.writeFileSync(siteName + "/original.txt", fileName, function(err){
            if(err){
                util.log(err);
            }
        })
    }else{
        fs.writeFileSync(siteName + "/latest.txt", fileName, function(err){
            if(err){
                util.log(err);
            }
        })
    }

    return filePath;
}

