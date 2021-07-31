import React,{useState,useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import {getBookAction}from "../action/addBookAction";
import shortid from "shortid";
import { useHistory,useParams } from "react-router-dom";
import axios from 'axios';
const EditBook =()=>{
    let {id} = useParams();      
    let history = useHistory()
    const currentBookDetail = useSelector((state) => state.book_detail.emptyBook)
    const dispatch = useDispatch();
    const[title,setTitle] = useState('');
    const[author,setAuthor] = useState('');
    const[price,setPrice] = useState('');
    const[edition,setEdition] = useState('');

    const onUpdateBook = async(e) =>{
        e.preventDefault();
        const update_book = Object.assign(currentBookDetail,{
            title:title,
            author:author,
            price:price,
            edition:edition,
        });
        const response = await  axios.put(`https://book-store-management-backend.herokuapp.com/api/books/${id}`, update_book,
            {headers:{ "Authorization": localStorage.getItem("access_token")}})
            .then(response => {
                dispatch(getBookAction(update_book));
                history.push("/");  
            })
            .catch(error => {
              throw(error);
            });
      
             
    }

    useEffect(() => {
        if(currentBookDetail!=null){
            setTitle(currentBookDetail.title)
            setAuthor(currentBookDetail.author)
            setPrice(currentBookDetail.price)
            setEdition(currentBookDetail.edition)
        }
        dispatch(getBookAction(id))      
    }, [currentBookDetail]);

    return (
        <div className="container mt-2">
            <div className="card border-0 shadow text-left">
                <div className="card-header text-left"> Edit a Book</div>
                <div className="card-body">
                    <form onSubmit={(e)=> onUpdateBook(e)}>
                        <div className="form-group my-4">
                            <input type="text" className="form-control"
                                placeholder = "Enter Title"
                                value ={title}
                                onChange = {(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-4">
                            <input type="text" className="form-control"
                                placeholder = "Enter Author"
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
                                placeholder = "Enter Price"
                                value = {edition}
                                onChange = {(e) => setEdition(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-warning" type="submit">Update Book</button>
                    </form>            
                </div>            
            </div>
        </div>
   );
};

export default EditBook;