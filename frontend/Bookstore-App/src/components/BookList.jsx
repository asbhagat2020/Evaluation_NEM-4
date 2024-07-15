import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const { data } = await fetchBooks(page, 10);
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, [page]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="book-list">
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default BookList;
