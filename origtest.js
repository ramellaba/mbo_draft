const fs = require('fs');
const path = require('path');

// Path to the artwork folder
const artworkFolder = path.join(__dirname, 'images', 'artwork');

// Function to filter files based on the naming pattern
function filterFilesWithLetterA() {
    try {
        // Read all files in the artwork folder
        const files = fs.readdirSync(artworkFolder);

        // Regular expression to match the pattern type##a.png
        const pattern = /^(cup|plate|bowl|other)\d{2}a\.png$/;
        return files.filter(file => pattern.test(file));
    } catch (error) {
        console.error("Error reading the folder:", error);
        return [];
    }
}

function groupImagesByTypeAndNumber() {
    const files = fs.readdirSync(artworkFolder);
    const groups = {};

    // Regular expression to match the pattern "type##letter.png"
    const pattern = /^(bowl|cup|other|plate)(\d{2})([a-z])\.png$/;

    files.forEach(file => {
        const match = file.match(pattern);
        if (match) {
            const [_, type, number, letter] = match;
            const groupKey = `${type}${number}`; // Create a key like "bowl00" or "cup02"

            // Initialize the group if it doesn't exist
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }

            // Add the file to the group
            groups[groupKey].push(file);
        }
    });

    return groups;
}

// Run the function and log the result
const groupedImages = groupImagesByTypeAndNumber();
console.log(groupedImages);

//Get the filtered files and write them to JSON file
const result = filterFilesWithLetterA();
fs.writeFileSync('galleryimagesdisplay.json', JSON.stringify(result, null, 2));
console.log("Image file names saved to gallergyimagesdisplay.json");

/* Execute the function and log the result
const result = filterFilesWithLetterA();
console.log(result); */