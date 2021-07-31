
const initialState = {
    allOrders:[],
    emptyOrder:null};
  
  export const orderReducer = (state = initialState, action) => {

    switch(action.type){
        case "Fetch_Orders":
            return{
                ...state,
                allOrders: action.payload
            }
        
        case "Get_Order":
            let arr =  state.allOrders.filter((emptyOrder) => emptyOrder.id == action.payload)
            arr = arr.values();
            for(let val of arr){
                arr =val;
            }
            
            return{
                ...state,
                emptyOrder: arr,
            }
        case "Update_Order":
            return {
            ...state,
            allOrders: state.allOrders.map(emptyOrder=> 
                emptyOrder.id == action.payload.id? action.payload:emptyOrder)
            
            }     
        default: 
            return state;    
            
    }
  }

