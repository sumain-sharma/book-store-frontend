import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { deleteBookAction } from '../action/addBookAction'
import { useDispatch } from 'react-redux'
import axios from 'axios'




const BookDetail=(props) => {
    const dispatch = useDispatch();
    const onDeleteBook = async(e) =>{
        e.preventDefault();   
        const response = await  axios.delete(`https://book-store-management-backend.herokuapp.com/api/books/${props.list.id}`,
         {headers:{ "Authorization": localStorage.getItem("access_token")}})
            .then(response => {
                dispatch(deleteBookAction(props.list.id));
               
            })
            .catch(error => {
              throw(error);
            });
      
        }
    return (
        
              <tr>
                <td>{props.list.id}</td>
                <td><Avatar  name={props.list.author} size="45" round={true} className="mr-2" />{props.list.author}</td>
                <td>{props.list.title}</td>                
                <td>{props.list.price}</td>
                <td>{props.list.edition}</td>
                <td>
                <Link to={`/editbook/${props.list.id}`}>
                    <i className="material-icons mx-1">edit</i>
                </Link>
                <i  onClick={(e)=>onDeleteBook(e) } className="material-icons mx-1 text-danger">remove_circle</i>
               
                </td>
            </tr>  
       
    )
}

export default BookDetail
