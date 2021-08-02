import React, { Component } from 'react';
import axios from 'axios';
import {fetchBooks} from '../action/addBookAction';
import { useDispatch } from 'react-redux';


const SearchBooks= () => {

    const [state, setState] = React.useState({searchText: ""})
    const dispatch = useDispatch();

    const handleChange = async (e)=>{
        await setState({searchText: e.target.value});

        const SEARCH_API = 'https://book-store-management-backend.herokuapp.com/api/books/?search='+ e.target.value;

        const response = await axios.get(SEARCH_API,{headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .catch((err) => {
            console.log("error: ",err)
        });dispatch(fetchBooks(response.data));
 };
    return (
        <input 
        className='search'
        key="random1"
        value={state.searchText}
        placeholder={"Search Books"}
        onChange={handleChange}
        />
    );
}
export default SearchBooks