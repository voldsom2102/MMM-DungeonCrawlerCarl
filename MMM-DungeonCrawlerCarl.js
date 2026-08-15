Module.register("MMM-DungeonCrawlerCarl", {
    defaults: {
        showCharacter: true,
        showBook: true
    },

    getStyles: function () {
        return ["MMM-DungeonCrawlerCarl.css"];
    },

    start: function () {
        Log.info("Starting MMM-DungeonCrawlerCarl");
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "dcc-quote";

        const quote = DCC_QUOTES[0];

        const quoteText = document.createElement("div");
        quoteText.className = "dcc-quote-text";
        quoteText.textContent = `"${quote.text}"`;
        wrapper.appendChild(quoteText);

        if (this.config.showCharacter) {
            const character = document.createElement("div");
            character.className = "dcc-character";
            character.textContent = `— ${quote.character}`;
            wrapper.appendChild(character);
        }

        if (this.config.showBook) {
            const book = document.createElement("div");
            book.className = "dcc-book";
            book.textContent = quote.book;
            wrapper.appendChild(book);
        }

        return wrapper;
    }
});