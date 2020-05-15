const booksDefaultState = {
  bookList: []
};

export default (state = booksDefaultState, action) => {
  switch(action.type){
    case 'SET_BOOK_CATEGORY_LIST':
      return{
        bookList: action.bookList
      }
    default:
      return state;
  }
}