import axios from 'axios';
import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import BookDetail from './BookDetail';
import { Link } from 'react-router-dom'
import {fetchBooks} from '../action/addBookAction';
import MeterialTable from 'material-table';
import { Redirect } from 'react-router';
import SearchBooks from './SearchBook'

const BList = () => {
    const blist = useSelector((state) => state.book_detail.blist);
    const userValidation = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const fetchBooksDetail = async()=>{
        if(userValidation.is_authenticated){
        const response = await axios.get("https://book-store-management-backend.herokuapp.com/api/books/",{headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .catch((err) => {
            console.log("error: ",err)
        });dispatch(fetchBooks(response.data));
    }
    }
    useEffect(() => {
        fetchBooksDetail() }, []);
        const column = [
            {title:"Title" , field:"title"},
            {title: "Author", field: "author"},
            {title:"Edition", field:"edition"},
            {title:"Price", field:"price"},
            {title:"Actions", field:"action"},
        ]  

    if (userValidation.is_authenticated){     
        return (
            <div className="container mt-2">
                <SearchBooks/>
                { userValidation.users.is_superuser? 
                <Link to="/addbook" className="btn btn-success my-1 px-2 add-book-button"> Add Books</Link>: 
                <Link to="/addrating" className="btn btn-success my-2 px-5 add-book-button"> Rate Book</Link>}
                <table className="table shadow  table-striped table-bordered table-sm">
                    <thead className="bg-thead text-white">
                        <tr>
                            <th>Id</th>        
                            <th>Title</th>       
                            <th>Author</th>
                            <th>Edition</th>
                            <th>Price</th>
                            { userValidation.users.is_superuser && <th>Action</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blist.map((list) =>
                            <BookDetail list={list} key={list.id} is_superuser={userValidation.users.is_superuser}/>
                            )
                        }  
                    </tbody>
                </table>
            </div>
            )
    }
    else{
        return(
            <Redirect to="/login" />
        )
    }   
}
export default BList
