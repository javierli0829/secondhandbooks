const userDefaultState = {
  user: undefined
};

export default (state = userDefaultState, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        user: action.user
      };
    case 'LOGOUT': 
      return {
        user: undefined
      }
    default:
      return state;
  }
}