import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "../action/orderAction"
import axios from "axios"
import OrderDetail from './OrderDetail'

const Orders=()=>{
  const allOrders =  useSelector((state) => state.all_order.allOrders)
    const dispatch = useDispatch();
    const fetchAllOrders = async()=>{
        const response = await axios.get("https://book-store-management-backend.herokuapp.com/api/orders/",{headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .catch((err) => {
            console.log("error: ",err)
        });dispatch(fetchOrders(response.data));
    }
       useEffect(()=> fetchAllOrders(), []);
    return(
        <div className="container mt-2">
   
        <table className="table shadow  table-striped table-bordered table-sm">
            <thead className="bg-danger text-white">
                <tr>                          
                <th>User Id</th>
                <th>Book Id</th>
                <th>Shipped</th>
                <th>Cancled</th>
                <th>Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allOrders.map((order) => 
                <OrderDetail order={order} key={order.id}/>
                )} 
             
            </tbody>
        </table>
        
       </div>
    )
}

export default Orders