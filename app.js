var getScreenshots = require("./getScreenshot");
var compareScreenshot = require("./compareScreenshot");
var fs = require("mz/fs");
var util = require("./util");
var merge = require("./merge");

const sites = [
    "https://www.capitalone.com/updates/coronavirus/small-businesses/",
    "https://www.chase.com"
];



    
async function runSites(site){
        util.log(site);
        var filePath1 = await getScreenshots.getScreenshot(site, true);
        util.log("Filepath1: " + filePath1);

        setTimeout(async function(){
            var filePath2 = await getScreenshots.getScreenshot(site, false);
            util.log("Filepath2: " + filePath2);

            var data = await compareScreenshot.compare(filePath1, filePath2);
          
            var rawMisMatch = data.rawMisMatchPercentage;
            util.log("Raw MisMatch: " + rawMisMatch);
            if(rawMisMatch > 0){
                await fs.writeFile("changes.png", data.getBuffer());
            }

        }, 10000);


}

sites.forEach(site => runSites(site));
