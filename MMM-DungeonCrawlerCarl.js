Module.register("MMM-DungeonCrawlerCarl", {
    defaults: {
        showCharacter: true,
        showBook: true
    },

    getScripts: function () {
        return [
            this.file("quote.js")
        ];
    },

    start: function () {
        Log.info("Starting module: MMM-DungeonCrawlerCarl");
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "dcc-quote";

        // Get the first quote from quote.js
        var quote = DCC_QUOTES[0];

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
