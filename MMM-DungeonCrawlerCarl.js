Module.register("MMM-DungeonCrawlerCarl", {
    defaults: {
        showCharacter: true,
        showBook: true,
        quoteInterval: 60000
    },

    getScripts: function () {
        return [
            this.file("quote.js")
        ];
    },

    start: function () {
        Log.info("Starting module: MMM-DungeonCrawlerCarl");

        this.currentQuote = null;

        // Change the quote at the configured interval
        this.scheduleUpdate();
    },

    scheduleUpdate: function () {
        var self = this;

        setInterval(function () {
            self.updateDom();
        }, this.config.quoteInterval);
    },

    getRandomQuote: function () {
        var randomIndex;

        // If there is only one quote, just return it
        if (DCC_QUOTES.length === 1) {
            return DCC_QUOTES[0];
        }

        // Pick a new quote that isn't the current quote
        do {
            randomIndex = Math.floor(Math.random() * DCC_QUOTES.length);
        } while (DCC_QUOTES[randomIndex] === this.currentQuote);

        this.currentQuote = DCC_QUOTES[randomIndex];

        return this.currentQuote;
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "dcc-quote";

        var quote = this.getRandomQuote();

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
