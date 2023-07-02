const { DateTime } = require("luxon");
const sharp = require('sharp');
const Image = require("@11ty/eleventy-img");

const GALLERY_IMAGE_WIDTH = 300;
const LANDSCAPE_LIGHTBOX_IMAGE_WIDTH = 1200;
const PORTRAIT_LIGHTBOX_IMAGE_WIDTH = 720;

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/photoswipe');
    eleventyConfig.addPassthroughCopy('./src/main.js');

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })

    eleventyConfig.addFilter("postDateDay", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat("ccc d LLL yyyy");
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt) {
        if (alt === undefined) {
            // throw an error on missing alt (alt="" works okay)
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
        }

        let lightboxImageWidth;

        const metadata = await sharp(src).metadata();

        if (metadata.width)

            if (metadata.height > metadata.width) {
                if (metadata.width > PORTRAIT_LIGHTBOX_IMAGE_WIDTH) {
                    lightboxImageWidth = PORTRAIT_LIGHTBOX_IMAGE_WIDTH;
                } else {
                    lightboxImageWidth = metadata.width;
                }
            } else {
                if (metadata.width > LANDSCAPE_LIGHTBOX_IMAGE_WIDTH) {
                    lightboxImageWidth = LANDSCAPE_LIGHTBOX_IMAGE_WIDTH;
                } else {
                    lightboxImageWidth = metadata.width;
                }
            }

        const options = {
            formats: ['jpeg'],
            widths: [GALLERY_IMAGE_WIDTH, 'auto'],
            urlPath: "/gen/",
            outputDir: './public/gen/'
        }

        const genMetadata = await Image(src, options);

        return `
            <a href="${genMetadata.jpeg[1].url}" 
            data-pswp-width="${genMetadata.jpeg[1].width}" 
            data-pswp-height="${genMetadata.jpeg[1].height}" 
            target="_blank">
                <img src="${genMetadata.jpeg[0].url}" alt="${alt}" />
            </a>
        `.replace(/(\r\n|\n|\r)/gm, "");
    });

    eleventyConfig.addCollection("futureFixtures", function (collectionApi) {
        return collectionApi.getFilteredByTag("fixtures").filter(function (fixture) {
            return fixture.date > new Date();
        });
    });

    eleventyConfig.addFilter('split', function (input, delimiter) {
        return input.split(delimiter);
    });

    eleventyConfig.addFilter('trimTags', function (input, startTag, endTag) {
        const regex = new RegExp(`${startTag}|${endTag}`, 'g');
        return input.replace(regex, '');
    });

    eleventyConfig.addFilter('shift', function (input) {
        return input.shift();
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}