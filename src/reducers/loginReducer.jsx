
const initialState = {
    logindata =[]};
  
  export const customerReducer = (state = initialState, action) => {

    switch(action.type){
        case "Login":
            return{
                ...state,
                logindata: action.payload
            }       
     
        default: 
            return state;    

            
    }
  }