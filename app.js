var getScreenshots = require("./getScreenshot");
var compareScreenshot = require("./compareScreenshot");
var fs = require("mz/fs");
var util = require("./util");

const sites = [
    "https://www.capitalone.com/updates/coronavirus/small-businesses/",
    "https://www.chase.com"
];



    
async function runSites(site, firstRun){
        const siteName = util.getSiteName(site);
        util.log(site);
        if(firstRun){
            util.log("First Run");
            var filePath1 = await getScreenshots.getScreenshot(site, true);
            util.log("Filepath1: " + filePath1);
        }else{
            util.log("Next run");
            
            var filePath1 = fs.readFileSync(siteName + "/original.txt");
            var filePath2 = await getScreenshots.getScreenshot(site, false);
            util.log("Filepath2: " + filePath2);
            filePath1 = siteName + "/" + filePath1;
            var data = await compareScreenshot.compare(filePath1, filePath2);
          
            var rawMisMatch = data.rawMisMatchPercentage;
            util.log("Raw MisMatch: " + rawMisMatch);
            if(rawMisMatch > 0){
                await fs.writeFile(siteName + "/changes.png", data.getBuffer());
            }
        }
}

sites.forEach(site => runSites(site, true));
setInterval(() => {
    sites.forEach(site => runSites(site, false));
}, 60000);

