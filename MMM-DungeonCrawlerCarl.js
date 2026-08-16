Module.register("MMM-DungeonCrawlerCarl", {
defaults: {
    showCharacter: true,
    showBook: true,
    quoteInterval: 60000,
    fadeOutSpeed: 1000,
    fadeInSpeed: 1000,
    maxBook: 8,
    quoteWidth: "80vw",
    minQuoteWidth: "300px",
    maxQuoteWidth: "1000px",
    quoteFontSize: "32px",
    characterFontSize: "22px",
    bookFontSize: "18px",
    lineHeight: "1.4"
},

    getScripts: function () {
        return [
            this.file("quote.js")
        ];
    },

    start: function () {
        Log.info("Starting module: MMM-DungeonCrawlerCarl");

        this.currentQuote = this.getRandomQuote();

        this.scheduleUpdate();
    },

    scheduleUpdate: function () {
        var self = this;

        setInterval(function () {
            self.changeQuote();
        }, this.config.quoteInterval);
    },

getRandomQuote: function () {
    var availableQuotes = this.getAvailableQuotes();

    // Make sure we have quotes available
    if (availableQuotes.length === 0) {
        Log.error(
            "MMM-DungeonCrawlerCarl: No quotes available for the selected books."
        );

        return {
            text: "No quotes available.",
            character: "",
            book: ""
        };
    }

    // Only one quote available
    if (availableQuotes.length === 1) {
        return availableQuotes[0];
    }

    var randomIndex;

    // Don't immediately repeat the current quote
    do {
        randomIndex = Math.floor(
            Math.random() * availableQuotes.length
        );
    } while (availableQuotes[randomIndex] === this.currentQuote);

    return availableQuotes[randomIndex];
},

changeQuote: function () {
    var self = this;
    var quoteContainer = document.querySelector(".dcc-quote");

    if (!quoteContainer) {
        return;
    }

    // Fade out
    quoteContainer.style.transition =
        "opacity " + this.config.fadeOutSpeed + "ms ease-in-out";

    quoteContainer.style.opacity = "0";

    // Wait for the fade-out to finish
    setTimeout(function () {

        // Select the next quote
        self.currentQuote = self.getRandomQuote();

        // Update the contents while invisible
        self.updateQuoteContents(quoteContainer);

        // Make sure the browser renders the element at opacity 0
        requestAnimationFrame(function () {

            // Set the fade-in transition
            quoteContainer.style.transition =
                "opacity " + self.config.fadeInSpeed + "ms ease-in-out";

            // Force the browser to recognize the current opacity
            requestAnimationFrame(function () {

                // Fade in
                quoteContainer.style.opacity = "1";
            });
        });

    }, this.config.fadeOutSpeed);
},

updateQuoteContents: function (wrapper) {
    var quote = this.currentQuote;

    wrapper.innerHTML = "";

    var quoteText = document.createElement("div");
    quoteText.className = "dcc-quote-text";
    quoteText.innerHTML = "&quot;" + quote.text + "&quot;";
    wrapper.appendChild(quoteText);

    if (this.config.showCharacter) {
        var character = document.createElement("div");
        character.className = "dcc-character";
        character.innerHTML = "— " + quote.character;
        wrapper.appendChild(character);
    }

    if (this.config.showBook) {
        var book = document.createElement("div");
        book.className = "dcc-book";
        book.innerHTML = quote.book;
        wrapper.appendChild(book);
    }
},

getAvailableQuotes: function () {
    // Make sure we have quotes
    if (!DCC_QUOTES || DCC_QUOTES.length === 0) {
        Log.error(
            "MMM-DungeonCrawlerCarl: No quotes found in quote.js."
        );

        return [];
    }

    // Convert maxBook to a number
    var maxBook = Number(this.config.maxBook);

    // If maxBook is invalid, default to Book 1
    if (!Number.isFinite(maxBook) || maxBook < 1) {
        Log.warn(
            "MMM-DungeonCrawlerCarl: Invalid maxBook value. Defaulting to Book 1."
        );

        maxBook = 1;
    }

    // Find the highest book number currently available
    var highestAvailableBook = DCC_QUOTES.reduce(
        function (highest, quote) {
            var bookNumber = Number(quote.bookNumber);

            if (Number.isFinite(bookNumber) && bookNumber > highest) {
                return bookNumber;
            }

            return highest;
        },
        0
    );

    // If maxBook is higher than our quote database,
    // simply use all available books.
    if (maxBook > highestAvailableBook) {
        Log.info(
            "MMM-DungeonCrawlerCarl: maxBook is " +
            maxBook +
            ", but quotes are currently available only through Book " +
            highestAvailableBook +
            ". Using available quotes."
        );

        maxBook = highestAvailableBook;
    }

    // Return quotes from Book 1 through maxBook
    return DCC_QUOTES.filter(function (quote) {
        return Number(quote.bookNumber) <= maxBook;
    });
},

getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "dcc-quote";

    wrapper.style.setProperty(
        "--dcc-quote-width",
        this.config.quoteWidth
    );

    wrapper.style.setProperty(
        "--dcc-min-quote-width",
        this.config.minQuoteWidth
    );

    wrapper.style.setProperty(
        "--dcc-max-quote-width",
        this.config.maxQuoteWidth
    );

    wrapper.style.setProperty(
        "--dcc-quote-font-size",
        this.config.quoteFontSize
    );

    wrapper.style.setProperty(
        "--dcc-character-font-size",
        this.config.characterFontSize
    );

    wrapper.style.setProperty(
        "--dcc-book-font-size",
        this.config.bookFontSize
    );

    wrapper.style.setProperty(
        "--dcc-line-height",
        this.config.lineHeight
    );

    this.updateQuoteContents(wrapper);

    return wrapper;
},

    getStyles: function () {
        return [
            "MMM-DungeonCrawlerCarl.css"
        ];
    }
});
