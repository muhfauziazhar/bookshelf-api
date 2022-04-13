const { nanoid } = require('nanoid');
const { books } = require('./books');

const addBookHandler = (request, h) => {
  // Input Book Data
  // Request Body
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const now = new Date().toISOString();
  const finished = pageCount === readPage;

  // Validation Input
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: now,
    updatedAt: now,
  });

  if (books.findIndex((book) => book.id === id) !== -1) {
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId: id },
      })
      .code(201);
  }
  return h
    .response({
      status: 'fail',
      message: 'Gagal menambahkan data',
    })
    .code(500);
};

const getAllBookHandler = (request, h) => {
  // Input from Query Parameters
  const { name, reading, finished } = request.query;
  // Validation Input
  let bookFilter = books; // If all query parameters are undefined
  if (name !== undefined) {
    bookFilter = bookFilter.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  } else if (reading !== undefined) {
    bookFilter = bookFilter.filter(
      (book) => Number(book.reading) === Number(reading),
    );
  } else if (finished !== undefined) {
    bookFilter = bookFilter.filter(
      (book) => Number(book.finished) === Number(finished),
    );
  }

  return h
    .response({
      status: 'success',
      data: {
        books: bookFilter.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    })
    .code(200);
};

const getBookByIdHandler = (request, h) => {
  // Input from parameter id
  const { id } = request.params;
  // Find book by parameter id which match with book id in database
  const book = books.find((buku) => buku.id === id); // force to change parameter book with 'buku' bcs of eslint

  if (book !== undefined) {
    return h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
  }
  return h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

const updateBookByIdHandler = (request, h) => {
  // Input from parameter id and request body
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const index = books.findIndex((book) => book.id === id);
  const finished = pageCount === readPage;

  // Validation Input
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }
  if (index !== -1) {
    books[index] = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt: books[index].insertedAt,
      updatedAt: new Date().toISOString(),
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
