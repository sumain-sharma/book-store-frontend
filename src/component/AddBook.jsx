import React,{useState} from "react";
import { useDispatch } from "react-redux";
import {addBookAction}from "../action/addBookAction";
import shortid from "shortid";
import { useHistory } from "react-router";
import axios from "axios";
const AddBook =()=>{
    let history = useHistory()
    const dispatch = useDispatch();
    const[title,setTitle] = useState('');
    const[author,setAuthor] = useState('');
    const[price,setPrice] = useState('');
    const[edition,setEdition] = useState('');

    const createContact = async(e)  =>{
        
        e.preventDefault();
        const new_book = {
            title:title,
            id: shortid.generate(),
            author:author,
            price:price,
            edition:edition,
        }
             
            const response = await  axios.post("https://book-store-management-backend.herokuapp.com/api/books/", new_book,
            {headers:{ "Authorization": localStorage.getItem("access_token")}})
            .then(response => {
                dispatch(addBookAction(new_book));
                history.push("/");
            })
            .catch(error => {
              throw(error);
            });
      
       
    }
    return (
      <div className="container mt-2">  
    <div className="card border-0 shadow text-left">
        <div className="card-header text-left"> Add a Book</div>
        <div className="card-body">
            <form onSubmit={(e) => createContact(e)}>
                <div className="form-group my-4">
                    <input type="text" className="form-control"
                        placeholder = "Enter Book Title"
                        value ={title}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <input type="text" className="form-control"
                        placeholder = "Enter Auther Name"
                        value = {author}
                        onChange = {(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <input type="number" className="form-control"
                        placeholder = "Enter Price"
                        value = {price}
                        onChange = {(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <input type="number" className="form-control"
                        placeholder = "Enter Edition"
                        value = {edition}
                        onChange = {(e) => setEdition(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" type="submit">Add Book</button>
            </form>            
        </div>            
    </div></div>
    );
};

export default AddBook;