const usersDefaultState = {
  userId: undefined,
  userName: 'user'
};

export default (state = usersDefaultState, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        userId: action.userId,
        userName: action.userName
      };
    default:
      return state;
  }
}