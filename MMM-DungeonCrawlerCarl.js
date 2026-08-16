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

getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "dcc-quote";

    this.updateQuoteContents(wrapper);

    return wrapper;
},

    getStyles: function () {
        return [
            "MMM-DungeonCrawlerCarl.css"
        ];
    }
});
