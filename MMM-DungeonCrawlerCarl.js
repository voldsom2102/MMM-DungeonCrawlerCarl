Module.register("MMM-DungeonCrawlerCarl", {
    defaults: {
        showCharacter: true,
        showBook: true,
        quoteInterval: 60000,
        fadeOutSpeed: 1000,
        fadeInSpeed: 1000
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
        var randomIndex;

        if (DCC_QUOTES.length === 1) {
            return DCC_QUOTES[0];
        }

        do {
            randomIndex = Math.floor(Math.random() * DCC_QUOTES.length);
        } while (DCC_QUOTES[randomIndex] === this.currentQuote);

        return DCC_QUOTES[randomIndex];
    },

changeQuote: function () {
    var self = this;
    var quoteContainer = document.querySelector(
        ".dcc-quote"
    );

    if (!quoteContainer) {
        return;
    }

    // Fade out
    quoteContainer.style.transition =
        "opacity " + this.config.fadeOutSpeed + "ms ease-in-out";

    quoteContainer.style.opacity = "0";

    setTimeout(function () {

        // Select the new quote
        self.currentQuote = self.getRandomQuote();

        // Rebuild the quote
        self.updateDom(0);

        // Get the newly created container
        setTimeout(function () {
            var newQuoteContainer = document.querySelector(
                ".dcc-quote"
            );

            if (newQuoteContainer) {

                // Start invisible
                newQuoteContainer.style.opacity = "0";

                // Set the fade-in speed
                newQuoteContainer.style.transition =
                    "opacity " +
                    self.config.fadeInSpeed +
                    "ms ease-in-out";

                // Trigger the fade-in
                setTimeout(function () {
                    newQuoteContainer.style.opacity = "1";
                }, 50);
            }

        }, 50);

    }, this.config.fadeOutSpeed);
},

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "dcc-quote";

        var quote = this.currentQuote;

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

        return wrapper;
    },

    getStyles: function () {
        return [
            "MMM-DungeonCrawlerCarl.css"
        ];
    }
});
