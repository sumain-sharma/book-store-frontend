import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const OrderDetail=(props)=>{

return(
    <tr>
    <td>{props.order.username}</td>
    <td>{props.order.booktitle}</td>
    <td>{props.order.is_canceled.toString()}</td>                
    <td>{props.order.is_shipped.toString()}</td>
    <td>{new Date(props.order.datetime).toLocaleString()}</td>
    <td>
    <Link to={`/editorder/${props.order.id}`}>
        <i className="material-icons mx-1">edit</i>
    </Link>
    
   
    </td>
</tr>  
)
}
export default OrderDetail