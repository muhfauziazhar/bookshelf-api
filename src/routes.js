const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'Welcome to Bookshelf API',
  },
  // POST Add Book DONE
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // GET All Books DONE
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  // GET Detail Books By ID DONE
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  // PUT Update Book By ID DONE
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler,
  },
  // DELETE Book by ID DONE
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = { routes };
