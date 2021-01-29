import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';


function App () {
  const [books, setBooks] = useState(null);

  const fetchData = async () => {
    const response = await axios.get('https://www.anapioficeandfire.com/api/books?pageSize=30');
    setBooks(response.data);
  };
  console.log("Books ", books);

  return (
    <div className = 'App'>
      <h1>GOT BOOKS</h1>
      <div>
        <button className='fetch-button' onClick={fetchData}>Fetch Data</button>
        <br />
      </div>

      <div className='books'>
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(', ');
            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>
                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages} pages</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
