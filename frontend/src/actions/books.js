export const setBookInfo = ({name, author, category, description, postedTime}) => ({
  type: 'SET_BOOK_INFO',
  name,
  author,
  category,
  description,
  postedTime
})