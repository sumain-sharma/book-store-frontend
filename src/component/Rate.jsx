import React,{useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import BookDetail from './BookDetail';
import {addBookReview} from '../action/addBookAction';
import shortid from "shortid";
import { useHistory } from "react-router";
import axios from "axios";
import { Rating } from 'react-simple-star-rating';

const Rate =()=>{
    const blist = useSelector((state) => state.book_detail.blist);
    const dispatch = useDispatch();
    const fetchBooksDetail = async()=>{
        const response = await axios.get("https://book-store-management-backend.herokuapp.com/api/books/",{headers:{ "Authorization": 'Token 58c8198bb30dc9c493f135e53e822872680478dc'}})
        .then((res)=>{
            let div = document.querySelector('#bookList');
            for (let i = 0; i < res.data.results.length; i++) {
                let myOption = document.createElement("option");
                myOption.value = res.data.results[i].id;
                myOption.text = res.data.results[i].title
                div.appendChild(myOption);
            }
        })
        .catch((err) => {
            console.log("error: ",err)
        });
    }
    useEffect(() => {
        fetchBooksDetail() }, []);
   
    let history = useHistory()
    // const dispatch = useDispatch();
    const[bookid,setBookId] = useState('');
    const[review,setReview] = useState('');
    const [rating, setRating] = useState(0);
   const handleChange=(e) =>{
       console.log(e.currentTarget.value);
       setBookId(e.currentTarget.value)
   }
    const handleRating = (rate) => {
        setRating(rate)       
    }
    const handletextChange = (e) =>{
        setReview(e.currentTarget.value)
    }
    const addReview = async(e)  =>{
        
        e.preventDefault();
        const new_review = {
            book_id:bookid,
            rating:rating,
            review:review,
           
        }
             
            const response = await  axios.post("https://book-store-management-backend.herokuapp.com/api/book-review/", new_review,
            {headers:{ "Authorization":  localStorage.getItem("access_token")}})
            .then(response => {
                dispatch(addBookReview(new_review));
                history.push("/viewrating")
               
            })
            .catch(error => {
              throw(error);
            });
      
       
    }
    return (
        <div className="container mt-2">
        <div className="card border-0 shadow text-left">
        <div className="card-header text-left"> Add a Book Rating</div>
        <div className="card-body">
            <form onSubmit={(e)=>addReview(e)}>
                <div className="form-group my-4">
                <select className="form-select" aria-label="select" id="bookList" onChange={(e)=>handleChange(e)}>
                       <option value={bookid}>Select Book</option>      
                </select>
                </div>
                <div className="form-group my-4">
                  <Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ />
                </div>
                <div className="form-group my-4">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>handletextChange(e)}></textarea>
                </div>
              
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>            
        </div>            
    </div>
    </div>
    );
};

export default Rate;