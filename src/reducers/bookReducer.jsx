
const initialState = {
  blist:[],
  emptyBook:null,
  review:[]};

export const bookReducer = (state = initialState, action) => {
 switch(action.type){
   case "Add_Book":
     return{
       ...state,
       blist:[action.payload, ...state.blist]
     }
     case "Add_Review":
       return{
         ...state,
         review:[action.payload, ...state.review]
       }
     case "Get_Book":
       let arr =  state.blist.filter((emptyBook) => emptyBook.id == action.payload)
       arr = arr.values();
       for(let val of arr){
         arr =val;
       }
      
       return{
         ...state,
         emptyBook: arr,
       }
       case "Update_Book":
        return {
          ...state,
          blist: state.blist.map(emptyBook=> 
            emptyBook.id == action.payload.id? action.payload:emptyBook)
          
        }
        case "Delete_Book" :
          return{
            ...state,
            blist: state.blist.filter((emptyBook)=> emptyBook.id != action.payload )
            
          }
        case "Fetch_Books" :
          return{
            ...state,
            blist: action.payload.results
          }  
        case "Fetch_Review" :
          return{
            ...state,
            review: action.payload
          }  
   default: 
      return state;
}
}

