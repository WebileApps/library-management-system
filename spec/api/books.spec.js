const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('Books tests', () => {
  it('should validate book title', async () => {
    const response = await request.post('/books').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
    /**
     * status: 400
     * {
     *  "message" : "Title is required"
     * }
     */
    expect(response.body.message).toBe('Title is required');
  });

  it('should create a book', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A song of ice and fire',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();
    expect(response.body.bookTitle).toBe('A song of ice and fire');
    expect(response.body.bookAuthor).toBe('George R R Martin');
  });

  it('Should return the book by id', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'A Game of Thrones',
      bookAuthor: 'George R R Martin',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeDefined();

    const bookId = response.body.bookId;

    const response2 = await request.get(`/books/${bookId}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.bookId).toBe(bookId);
    expect(response2.body.bookTitle).toBe('A Game of Thrones');
    expect(response2.body.bookAuthor).toBe('George R R Martin');
  });

  it('should update the book with id', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'Harry Porter',
      bookAuthor: 'J R Rowling',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.bookId).toBeUndefined();

    const bookId = response.body.bookId;

    const response2 = await request.put(`/books/${bookId}`).send({
      bookId: bookId,
      bookTitle: 'Harry Porter: The Deadly Hallows',
      bookAuthor: 'J K Rowling',
    });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.bookId).toBe(bookId);
    expect(response2.body.bookTitle).toBe('Harry Porter: The Deadly Hallows');
    expect(response2.body.bookAuthor).toBe('J K Rowling');
  });

  it('should delete book with id', async () => {
    const response = await request.post('/books').send({
      bookTitle: 'Fantastic Beasts',
      bookAuthor: 'J K Rowling',
    });
    expect(response.statusCode).toBe(200);
    expect(response.book.bookId).toBeUndefined();

    const bookId = response.body.bookId;

    const response2 = await request.delete(`/books/${bookId}`);
    expect(response2.statusCode).toBe(200);
  });
});
