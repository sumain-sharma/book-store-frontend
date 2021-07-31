import React,{useState,useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import {getCustomerAction}from "../action/customerAction";
import { useHistory,useParams } from "react-router";
import axios from "axios";
const EditCustomer =()=>{
    let {id} = useParams();      
    let history = useHistory()
    const currentCustomerDetail = useSelector((state) => state.all_customer.emptyCustomer)
    const dispatch = useDispatch();
    const[username,setUsername] = useState('');
    const[is_active,setIsactive] = useState('');
    const[is_superuser,setIssuperuser] = useState('');

    const updateCustomer = async(e)  =>{
        
        e.preventDefault();
        const new_customer = Object.assign(currentCustomerDetail,{
            username:username,
            is_active:is_active?true:false,
            is_superuser:is_superuser?true:false,
            // last_login:last_login,
        });
             
        const response = await  axios.put(`https://book-store-management-backend.herokuapp.com/api/auth_user/users/${id}`, new_customer,
        {headers:{ "Authorization":  localStorage.getItem("access_token")}})
        .then(res => {
            dispatch(getCustomerAction(new_customer));
            history.push("/customers");
        })
        .catch(error => {
            throw(error);
        });           
             
    }

    useEffect(() => {
        if(currentCustomerDetail!=null){
            setUsername(currentCustomerDetail.username)
            setIsactive(currentCustomerDetail.is_active)
            setIssuperuser(currentCustomerDetail.is_superuser)          
        }
        dispatch(getCustomerAction(id))      
    }, [currentCustomerDetail]);
      
       
    
    return (
        <div className="container mt-2">
            <div className="card border-0 shadow text-left">
                <div className="card-header text-left"> Update Customer</div>
                <div className="card-body">
                    <form onSubmit={(e) => updateCustomer(e)}>
                        <div className="form-group my-4">
                            <input type="text" className="form-control"
                                placeholder = "Enter Username"
                                value ={username}
                                onChange = {(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-4">
                        
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="is_active_user" checked={is_active} onChange = {(e) => setIsactive(!is_active)} />
                            <label className="form-check-label" htmlFor="is_active_user">Is active User</label>
                            </div>
                        
                        </div>
                        <div className="form-group my-4">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="is_super_user" checked={is_superuser} onChange = {(e) => setIssuperuser(!is_superuser)} />
                            <label className="form-check-label" htmlFor="is_super_user">Is Super User</label>
                            </div>
                        </div>
                    
                        <button className="btn btn-warning" type="submit">Update Customer</button>
                    </form>            
                </div>            
            </div>
        </div>
    );
};

export default EditCustomer;