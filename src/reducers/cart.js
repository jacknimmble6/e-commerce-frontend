const initialState = [
  
]


export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'addCartItem':
        const dupe = state.find(obj => obj.id === action.payload.id);
        
        return dupe ? state : [...state, action.payload.cart ];
      case 'delete1': 
        const item = state.find(obj => obj.id === action.payload);

        return item ? state.filter((item, index) => item.id !== action.payload) : state
      case 'increase': 
        return state.map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              amount: item.amount + 1
            }
          }
          return item
        })
      case 'decrease': 
        return state.map(item => {
          if (item.id === action.payload && item.amount > 0) {
            return {
              ...item,
              amount: item.amount - 1
            }
          }
          return item
        })
      case 'clearCart':
        return []
      default:
        return state    
    }
}