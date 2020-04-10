const fs = require("mz/fs");
const compareImages = require("resemblejs/compareImages");
const util = require("./util");

exports.compare = async function(image1, image2) {
    util.log("Image1: " + image1);
    util.log("Image2: " + image2);
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.4,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };

    const data = await compareImages(
        await fs.readFile(image1),
        await fs.readFile(image2),
        options
    );

    return data;
}