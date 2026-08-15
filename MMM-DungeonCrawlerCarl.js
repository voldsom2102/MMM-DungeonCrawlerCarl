Module.register("MMM-DungeonCrawlerCarl", {
    defaults: {
        showCharacter: true,
        showBook: true
    },

    start: function () {
        Log.info("Starting module: MMM-DungeonCrawlerCarl");
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "dcc-quote";

        var quoteText = document.createElement("div");
        quoteText.className = "dcc-quote-text";
        quoteText.innerHTML = "&quot;Goddammit Donut!&quot;";
        wrapper.appendChild(quoteText);

        if (this.config.showCharacter) {
            var character = document.createElement("div");
            character.className = "dcc-character";
            character.innerHTML = "— Carl";
            wrapper.appendChild(character);
        }

        if (this.config.showBook) {
            var book = document.createElement("div");
            book.className = "dcc-book";
            book.innerHTML = "Dungeon Crawler Carl";
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