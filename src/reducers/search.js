const initialState = {
  searchTerm: ''    
}
  
export const search = (state = initialState, action) => {
  switch(action.type) {
    case 'setTerm': {
      return { searchTerm: action.payload.search }
    }
    default:
      return state 
  }
}