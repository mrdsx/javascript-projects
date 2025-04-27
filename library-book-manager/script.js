class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(book) {
    if (!this.books.includes(book)) {
      this.books.push(book);
      localStorage.setItem('books', JSON.stringify(this.books));
    } else {
      console.log("This book is already in the library");
    }
  }

  removeBook(targetTitle) {
    this.books = this.books.filter((book) => book.title !== targetTitle);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  listBooks() {
    if (this.books.length === 0) {
      console.log("No books yet");
    } else {
      for (let book of this.books) {
        console.log(`Title: ${book.title}, author: ${book.author}, is read: ${(book.isRead) ? "yes" : "no"}`);
      };
    }
  }

  listReadBooks() {
    this.#listSpecificBooks(true);
  }

  listUnreadBooks() {
    this.#listSpecificBooks(false);
  }

  sortBooksByAuthor() {
    const groupByAuthor = this.#groupBy("author");
    const result = groupByAuthor(this.books);

    console.log(result);
  }

  #listSpecificBooks(isRead) {
    const specificBooks = this.books.filter((book) => book.isRead === isRead);

    if (specificBooks.length === 0) {
      console.log(`No ${(isRead) ? "read" : "unread"} books`);
    } else {
      for (let book of specificBooks) {
        console.log(`Title: ${book.title}, author: ${book.author}`);
      };
    }
  }

  #groupBy(key) {
    return function group(array) {
      return array.reduce((acc, obj) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
  };
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.isRead = false;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}
