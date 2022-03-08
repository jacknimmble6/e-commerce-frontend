const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: '',
  role: '',
  token: '',
  id: ''
}

export const login = (state = initialState, action) => {
  switch(action.type) {
    case 'setUser':
      return {
        firstName: action.payload.firstName || state.firstName,
        lastName: action.payload.lastName || state.lastName,
        username: action.payload.username || state.username,
        password: action.payload.password || state.password,
        email: action.payload.email || state.email,
        role: action.payload.role || state.role,
        token: action.payload.token || state.token,
        id: action.payload.id || state.id,
      }
    case 'clearUser':
      return {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        role: '',
        token: '',
        id: ''
      } 
    default:
      return state 
  }
}