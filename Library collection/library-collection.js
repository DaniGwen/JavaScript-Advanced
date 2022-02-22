class LibraryCollection {
    constructor(capacity) {
        if (typeof capacity != 'number') {
            throw new Error('Must be number')
        }
        this.capacity = Number(capacity);
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (typeof bookName != 'string' || typeof bookAuthor != 'string') {
            throw new Error('Must be string!');
        }
        if (this.books.length == this.capacity) {
            throw new Error('Not enough space in the collection.');
        }

        let book = {
            bookName: bookName,
            bookAuthor: bookAuthor,
            payed: false
        }

        this.books.push(book);
        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook(bookName) {
        let foundBook = this.books.find(x => x.bookName == bookName);
        if (foundBook == undefined) {
            throw new Error(`${bookName} is not in the collection.`);
        }

        if (foundBook.payed) {
            throw new Error(`${bookName} has already been paid.`);
        }

        foundBook.payed = true;
        return `${bookName} has been successfully paid.`;
    }

    removeBook(bookName) {
        let foundBook = this.books.find(x => x.bookName == bookName);
        if (foundBook == undefined) {
            throw new Error("The book, you're looking for, is not found.");
        }

        if (!foundBook.payed) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        }

        this.books = this.books.filter(x => x.bookName != bookName);
        return `${bookName} remove from the collection.`;
    }

    getStatistics(bookAuthor) {
        let result = [];

        if (bookAuthor != undefined) {
            let authorsBook = this.books.find(x => x.bookAuthor == bookAuthor);

            if (authorsBook == undefined) {
                throw new Error(`${bookAuthor} is not in the collection.`);
            }
            return `${authorsBook.bookName} == ${authorsBook.bookAuthor} - ${authorsBook.payed ? 'Has Paid' : 'Not Paid'}.`;
        }

        result.push(`The book collection has ${this.capacity - this.books.length} empty spots left.`)
        this.books
            .sort((a, b) => a.bookName - b.bookName)
            .map(book => result.push(`${book.bookName} == ${book.bookAuthor} - ${book.payed ? 'Has Paid' : 'Not Paid'}.`));

        return result.join('\n');
    }
}
