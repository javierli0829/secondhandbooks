export const login = ({userId, userName}) => ({
  type: 'LOGIN',
  userId,
  userName
})

export const logout = () => ({
  type: 'LOGOUT',
})