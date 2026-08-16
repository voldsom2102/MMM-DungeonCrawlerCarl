# MMM-DungeonCrawlerCarl

A [MagicMirror²](https://magicmirror.builders/) module that displays random quotes from the **Dungeon Crawler Carl** book series.
Quotes are stored locally in `quote.js`, allowing you to easily add, remove, and organize quotes without modifying the module itself.
## Features
* Displays random Dungeon Crawler Carl quotes
* Automatically rotates quotes at a configurable interval
* Prevents the same quote from appearing twice in a row
* Smooth fade-out and fade-in transitions
* Configurable fade-out and fade-in speeds
* Supports quote attribution by character
* Supports book attribution
* Book-based spoiler protection using `maxBook`
* Automatically uses all available quotes up to `maxBook`
* Gracefully handles `maxBook` values higher than the books currently represented in `quote.js`
* Configurable quote width
* Configurable quote, character, and book font sizes
* Configurable line spacing
* All quote data is stored locally, so no internet connection is required after installation

## Installation
### Automatic Installation
Open a terminal on your MagicMirror and navigate to the `modules` directory:
```bash
cd ~/MagicMirror/modules
```
Clone the repository:
```bash
git clone https://github.com/voldsom2102/MMM-DungeonCrawlerCarl.git
```
The module should now be located at:
```text
~/MagicMirror/modules/MMM-DungeonCrawlerCarl
```
Restart MagicMirror after completing the installation.
If you are using PM2:
```bash
pm2 restart mm
```
If you run MagicMirror manually:
```bash
cd ~/MagicMirror
npm start
```
## Manual Installation
If you don't want to use Git:
1. Download the repository from GitHub.
2. Extract the `MMM-DungeonCrawlerCarl` folder.
3. Copy the folder into:
```text
~/MagicMirror/modules/
```
The resulting directory structure should be:
```text
MagicMirror/
└── modules/
    └── MMM-DungeonCrawlerCarl/
        ├── MMM-DungeonCrawlerCarl.js
        ├── MMM-DungeonCrawlerCarl.css
        ├── quote.js
        └── README.md
```
## Configuration
Open your MagicMirror configuration file:
```text
~/MagicMirror/config/config.js
```
Add the module to the `modules` section:
```javascript
{
    module: "MMM-DungeonCrawlerCarl",
    position: "middle_center",
    config: {
        showCharacter: true,
        showBook: true,
        quoteInterval: 120000,
        fadeOutSpeed: 1000,
        fadeInSpeed: 1500,
        maxBook: 1,
        quoteWidth: "80vw",
        minQuoteWidth: "300px",
        maxQuoteWidth: "1000px",
        quoteFontSize: "32px",
        characterFontSize: "22px",
        bookFontSize: "18px",
        lineHeight: "1.4"
    }
},
```
Restart MagicMirror after changing `config.js`.

## Configuration Options
| Option              |    Default | Description                            |
| ------------------- | ---------: | -------------------------------------- |
| `showCharacter`     |     `true` | Displays the character attribution     |
| `showBook`          |     `true` | Displays the book name                 |
| `quoteInterval`     |    `60000` | Time between quotes in milliseconds    |
| `fadeOutSpeed`      |     `1000` | Fade-out duration in milliseconds      |
| `fadeInSpeed`       |     `1000` | Fade-in duration in milliseconds       |
| `maxBook`           |        `1` | Highest book number allowed to appear  |
| `quoteWidth`        |   `"80vw"` | Width of the quote area                |
| `minQuoteWidth`     |  `"300px"` | Minimum quote area width               |
| `maxQuoteWidth`     | `"1000px"` | Maximum quote area width               |
| `quoteFontSize`     |   `"32px"` | Font size of the quote                 |
| `characterFontSize` |   `"22px"` | Font size of the character attribution |
| `bookFontSize`      |   `"18px"` | Font size of the book name             |
| `lineHeight`        |    `"1.4"` | Line spacing for multi-line quotes     |

### Quote Rotation
`quoteInterval` is specified in milliseconds.
For example:
```javascript
quoteInterval: 60000
```
changes the quote every 60 seconds.

Two minutes:
```javascript
quoteInterval: 120000
```
Five minutes:
```javascript
quoteInterval: 300000
```

### Fade Speeds
Fade-out and fade-in speeds can be configured independently.

For example:
```javascript
fadeOutSpeed: 1000,
fadeInSpeed: 2000
```
This creates a 1-second fade-out followed by a slower 2-second fade-in.

### Book Spoiler Protection
The `maxBook` setting controls which quotes can be displayed.
For example:
```javascript
maxBook: 1
```
allows only Book 1 quotes.
```javascript
maxBook: 3
```
allows quotes from Books 1, 2, and 3.
```javascript
maxBook: 7
```
allows quotes from Books 1 through 7.
You can set `maxBook` higher than the books currently represented in `quote.js`. The module will automatically use whatever quotes are currently available. bookNumber is optional. If omitted, the quote is treated as a Book 1 quote.
For example, if you have only entered quotes through Book 3:
```javascript
maxBook: 7
```
will simply use the available Book 1–3 quotes.
As you add quotes from later books, they will automatically become eligible.

## Adding Quotes
Quotes are stored in:
```text
quote.js
```
The file contains an array called `DCC_QUOTES`.
Each quote should follow this format:
```javascript
var DCC_QUOTES = [
    {
        text: "Goddammit Donut!",
        character: "Carl",
        book: "Dungeon Crawler Carl",
        bookNumber: 1
    }
];
```
To add additional quotes, separate each quote with a comma:
```javascript
var DCC_QUOTES = [
    {
        text: "Goddammit Donut!",
        character: "Carl",
        book: "Dungeon Crawler Carl",
        bookNumber: 1
    },
    {
        text: "Another quote goes here.",
        character: "Donut",
        book: "Dungeon Crawler Carl",
        bookNumber: 1
    },
    {
        text: "Another quote from a later book.",
        character: "Carl",
        book: "Dungeon Crawler Carl",
        bookNumber: 2
    }
];
```

### Quote Fields
Each quote contains four fields:
```javascript
{
    text: "The quote text",
    character: "Who said it",
    book: "Book title",
    bookNumber: 1
}
```
| Field        | Description                                       |
| ------------ | ------------------------------------------------- |
| `text`       | The quote itself                                  |
| `character`  | Character associated with the quote               |
| `book`       | Book title                                        |
| `bookNumber` | Numerical book number used for spoiler protection |

## Example Configurations
### Reading Book 1
```javascript
{
    module: "MMM-DungeonCrawlerCarl",
    position: "middle_center",
    config: {
        maxBook: 1
    }
}
```

### Reading Book 3

```javascript
{
    module: "MMM-DungeonCrawlerCarl",
    position: "middle_center",
    config: {
        maxBook: 3
    }
}
```

### Customized Display
```javascript
{
    module: "MMM-DungeonCrawlerCarl",
    position: "middle_center",
    config: {
        showCharacter: true,
        showBook: true,
        quoteInterval: 120000,
        fadeOutSpeed: 1000,
        fadeInSpeed: 2000,
        maxBook: 3,
        quoteWidth: "80vw",
        minQuoteWidth: "300px",
        maxQuoteWidth: "1000px",
        quoteFontSize: "36px",
        characterFontSize: "22px",
        bookFontSize: "18px",
        lineHeight: "1.4"
    }
}
```

## Updating the Module
If you installed the module using Git, update it from the module directory:
```bash
cd ~/MagicMirror/modules/MMM-DungeonCrawlerCarl
git pull
```
Then restart MagicMirror:
```bash
pm2 restart mm
```

## Troubleshooting
### Module displays "undefined"
Verify that the module directory is named exactly:
```text
MMM-DungeonCrawlerCarl
```
and that the main JavaScript file is:
```text
MMM-DungeonCrawlerCarl.js
```
Also verify that `config.js` contains:
```javascript
module: "MMM-DungeonCrawlerCarl"
```

### Quotes are not displaying
Make sure `quote.js` is in the same directory as the main module:
```text
MMM-DungeonCrawlerCarl/
├── MMM-DungeonCrawlerCarl.js
├── MMM-DungeonCrawlerCarl.css
└── quote.js
```
Also make sure the quote array is named exactly:
```javascript
var DCC_QUOTES = [
```
### No quotes are available
Check that each quote has a valid `bookNumber`:
```javascript
bookNumber: 1
```
and that `maxBook` is at least that number.

### MagicMirror does not restart
Check the MagicMirror console for JavaScript errors.

If using PM2:
```bash
pm2 logs mm
```
## License
This module is provided as-is for personal use.
The module itself is not affiliated with or endorsed by the author, publisher, or rights holders of the Dungeon Crawler Carl series.
**Dungeon Crawler Carl** and related characters and content are the property of their respective rights holders.
Users are responsible for ensuring that any quotes they add to `quote.js` are used in accordance with applicable copyright law.

## Repository
The source code for this module is available on GitHub:
https://github.com/voldsom2102/MMM-DungeonCrawlerCarl.git
