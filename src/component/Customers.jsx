import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { customersActions } from "../action/customerAction"
import axios from "axios"
import CustomerDetail from './CustomerDetail'

const Customers=()=>{
  const allCustomer =  useSelector((state) => state.all_customer.allCustomer)
    const dispatch = useDispatch();
    const fetchAllCustomer = async()=>{
        const response = await axios.get("https://book-store-management-backend.herokuapp.com/api/auth_user/users",{headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .catch((err) => {
            console.log("error: ",err)
        });dispatch(customersActions(response.data.results));
    }
       useEffect(()=> fetchAllCustomer(), []);
    return(
       <div className="container mt-2">
        <table className="table shadow  table-striped table-bordered table-sm">
            <thead className="bg-thead text-white">
                <tr>                          
                <th>User Name</th>
                <th>Is Active</th>
                <th>Super User</th>
                <th>Last Login</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {allCustomer.map((data) => 
            <CustomerDetail data={data} key={data.id}/>
            )} 
             
            </tbody>
        </table>
        </div>
    )
}

export default Customers