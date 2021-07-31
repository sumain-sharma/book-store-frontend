
    
  export const getOrderAction = (id)=>({
      type: "Get_Order",
      payload: id,
  })
  
  export const updateOrderAction = (orderlist)=>({
    type:"Update_Order",
    payload: orderlist,
  })
 
  export const fetchOrders = (orders) =>{
    return{
      type: "Fetch_Orders",
      payload: orders,
    }
  }