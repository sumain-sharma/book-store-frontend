
export const addBookAction = (blist) =>({
  type: "Add_Book",
  payload: blist,
});
export const addBookReview = (review) =>({
  type: "Add_Review",
  payload: review,
})  
export const getBookAction = (id)=>({
    type: "Get_Book",
    payload: id,
})

export const updateBookAction = (blist)=>({
  type:"Update_Book",
  payload: blist,
})


export const deleteBookAction = (id)=>({
  type:"Delete_Book",
  payload: id,
})

export const fetchBooks = (books) =>{
  return{
    type: "Fetch_Books",
    payload: books,
  }
}
export const fetchRating = (ratinglist) =>{
  return{
    type:"Fetch_Review",
    payload:ratinglist,
  }
}