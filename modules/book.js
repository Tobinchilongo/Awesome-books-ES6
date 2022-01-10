let bookss = [];
export default class BookClass {
    constructor(title, author, id) {
      this.title = title;
      this.author = author;
      this.id = id;
    }   
    
    bookCode() {
        return `<li><div class="list-items">
        <p>"${this.title}" by ${this.author}</p>
        <button type="button" data-id='${this.id}' class="remove">remove</button>
        </div>
    </li>`;
    }
    
    static addBook(book) {
        let id = 1;
        if (bookss.length > 0) {
        id = bookss[bookss.length - 1].id + 1;
        }
        book.id = id;
        bookss.push(book);
        console.log(bookss);
        localStorage.setItem('bookss', JSON.stringify(bookss));
    }
    
        static remove(id) {
            bookss = bookss.filter((b) => b.id !== Number(id));
            localStorage.setItem('bookss', JSON.stringify(bookss));
        }
    
    
}

