import React from 'react';
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const CustomerDetail=(props)=>{

return(
    <tr>
   
    <td><Avatar  name={props.data.username} size="45" round={true} className="mr-4" /> {props.data.username}</td>
    <td>{props.data.is_active.toString()}</td>                
    <td>{props.data.is_superuser.toString()}</td>
    <td>{new Date(props.data.last_login).toLocaleString()}</td>
    <td>
    <Link to={`/editcustomer/${props.data.id}`}>
        <i className="material-icons mx-1">edit</i>
    </Link>
    
   
    </td>
</tr>  
)
}
export default CustomerDetail