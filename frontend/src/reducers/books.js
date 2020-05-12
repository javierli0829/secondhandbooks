const booksDefaultState = {
  name: undefined,
  author: undefined,
  category: undefined,
  description: undefined,
  postedTime: undefined
};

export default (state = booksDefaultState, action) => {
  switch(action.type){
    case 'SET_BOOK_INFO':
      return {
        name: action.name,
        author: action.author,
        category: action.category,
        description: action.description,
        postedTime: action.postedTime
      };
    default:
      return state;
  }
}