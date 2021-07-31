
const initialState = {
    allCustomer:[],
  emptyCustomer:null};
  
  export const customerReducer = (state = initialState, action) => {

    switch(action.type){
        case "All_Customers":
            return{
                ...state,
                allCustomer: action.payload
            }
        
        case "Get_Customer":
            let arr =  state.allCustomer.filter((emptyCustomer) => emptyCustomer.id == action.payload)
            arr = arr.values();
            for(let val of arr){
                arr =val;
            }
            
            return{
                ...state,
                emptyCustomer: arr,
            }
        case "Edit_Customer":
            return {
            ...state,
            allCustomer: state.allCustomer.map(emptyCustomer=> 
                emptyCustomer.id == action.payload.id? action.payload:emptyCustomer)
            
            }     
        default: 
            return state;    

            
    }
  }