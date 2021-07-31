import React,{useState,useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import {getOrderAction}from "../action/orderAction";
import { useHistory,useParams } from "react-router";
import axios from "axios";
const EditOrders =()=>{
    let {id} = useParams();      
    let history = useHistory()
    const currentOrderDetail = useSelector((state) => state.all_order.emptyOrder)
    const dispatch = useDispatch();
    const[username,setUsername] = useState('');
    const[booktitle,setBooktitle] = useState('');
    const[is_shipped,setIsshipped] = useState('');
    const[is_canceled,setIscanceled] = useState('');
    const[datetime,setdatetime] = useState('');

    const updateOrder = async(e)  =>{
        
        e.preventDefault();
        const new_order = Object.assign(currentOrderDetail,{
            username:username,
            booktitle:booktitle,
            is_shipped:is_shipped?true:false,
            is_canceled:is_canceled?true:false,
            datetime:datetime        
        });
             
        const response = await  axios.put(`https://book-store-management-backend.herokuapp.com/api/orders/${id}/`, new_order,
        {headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .then(res => {
            // dispatch(getOrderAction(new_order));
            history.push("/orders");
        })
        .catch(error => {
            throw(error);
        });           
             
    }

    useEffect(() => {
        if(currentOrderDetail!=null){
            setUsername(currentOrderDetail.username)
            setBooktitle(currentOrderDetail.booktitle)
            setdatetime(currentOrderDetail.datetime)
            setIsshipped(currentOrderDetail.is_shipped)
            setIscanceled(currentOrderDetail.is_canceled)          
        }
        dispatch(getOrderAction(id))      
    }, [currentOrderDetail]);
      
       
    
    return (
        <div className="container mt-2">
            <div className="card border-0 shadow text-left">
                <div className="card-header text-left"> Update Customer</div>
                <div className="card-body">
                    <form onSubmit={(e) => updateOrder(e)}>
                        <div className="form-group my-4">
                            <input type="text" className="form-control"
                                placeholder = "Enter Username"
                                value ={username}
                                onChange = {(e) => setUsername(e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group my-4">
                            <input type="text" className="form-control"
                                placeholder = "Enter Book title"
                                value ={booktitle}
                                onChange = {(e) => setBooktitle(e.target.value)}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group my-4">
                        
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="is_shipped" checked={is_shipped} onChange = {(e) => setIsshipped(!is_canceled)} />
                            <label className="form-check-label" htmlFor="is_shipped">Is Shipped</label>
                            </div>
                        
                        </div>
                        <div className="form-group my-4">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="is_canceled" checked={is_canceled} onChange = {(e) => setIscanceled(!is_canceled)} />
                            <label className="form-check-label" htmlFor="is_canceled">Is Canceled</label>
                            </div>
                        </div>
                        <div className="form-group my-4">
                            <input type="datetime" className="form-control"
                                placeholder = "Enter Date"
                                value ={username}
                                onChange = {(e) => setdatetime(e.target.value)}
                                readOnly={true}
                            />
                        </div>
                    
                        <button className="btn btn-warning" type="submit">Update Customer</button>
                    </form>            
                </div>            
            </div>
        </div>
    );
};

export default EditOrders;