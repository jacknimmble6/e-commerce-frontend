const initialState = {
  firstName: '',
  lastName: '',
  city: '',
  zipCode: 0,
  apartment: '',
  country: '',
  region: '',
  address: '',
  phone: '',
  total: 0,
  cardNumber: 0,
  cardType: '',
  cardType2: '',
  shipping: 0
}

export const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'setOrder':
      return {
        firstName: action.payload.firstName || state.firstName,
        lastName: action.payload.lastName || state.lastName,
        city: action.payload.city,
        zipCode: action.payload.zipCode,
        apartment: action.payload.apartment,
        country: action.payload.country,
        region: action.payload.region,
        address: action.payload.address,
        phone: action.payload.phone,
        cardType: '',
        cardType2: '',
        cardNumber: 0,
        total: action.payload.total,
        shipping: action.payload.shipping
      }
    case 'finishOrder': {
      return {
        firstName: state.firstName, 
        lastName: state.lastName,
        city: state.city,
        zipCode: state.zipCode,
        apartment: state.apartment,
        country: state.country,
        region: state.region,
        address: state.address,
        phone: state.phone,
        cardType: action.payload.cardType,
        cardType2: action.payload.cardType2,
        cardNumber: action.payload.cardNumber,
        total: state.total,
        shipping: state.shipping
      }
    }
    case 'clearOrder':
      return {
        firstName: '',
        lastName: '',
        city: '',
        zipCode: 0,
        apartment: '',
        country: '',
        region: '',
        address: '',
        phone: '',
        total: 0,
        cardNumber: 0,
        cardType: '',
        cardType2: '',
      } 
    default:
      return state 
  }
}