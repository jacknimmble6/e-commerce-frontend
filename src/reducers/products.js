const initialState = [
  
]
    
  export const products = (state = initialState, action) => {
    switch(action.type) {
      case 'addProducts': {
        return action.payload
      }
      case 'A-Z': {
        return state.slice().sort((a, b) => a.name.localeCompare(b.name))
      }
      case 'Z-A': {
        return state.slice().sort((a, b) => a.name.localeCompare(b.name)).reverse()
      }
      case 'orderByPrice': {
        return state.slice().sort((a, b) => a.price - b.price)
      }
      case "0-99.99": {
        return state.slice().filter((e) => e.price > 0 && e.price <= 99.99 )
      }
      case "100-249.99": {
        return state.slice().filter((e) => e.price >= 100 && e.price <= 249.99 )
      }
      case "250-499.99": {
        return state.slice().filter((e) => e.price >= 250 && e.price <= 499.99 )
      }
      case "500-749.99": {
        return state.slice().filter((e) => e.price >= 500 && e.price <= 749.99 )
      }
      case "750-999.99": {
        return state.slice().filter((e) => e.price > 749.99 && e.price <= 999.99 )
      }
      case "1000 and above": {
        return state.slice().filter((e) => e.price >= 1000 && e.price < 100000 )
      }
      case 'deleteProducts': {
        return []
      }
      default:
        return state 
    }
  }