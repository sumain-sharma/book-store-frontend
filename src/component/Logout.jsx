import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {getUsers} from '../action/userAction'

const USER_LOGOUT_API = 'https://book-store-management-backend.herokuapp.com/api/auth_user/logout/'

class Logout extends Component {

    async componentDidMount(){

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('access_token')
        }

        await axios.post(USER_LOGOUT_API, 
                    {headers: headers}).then((response)=>{
                        localStorage.removeItem('access_token');
                    }).catch((error) => { ""
                        console.log(error);
                        });
        this.props.getUsers();
    }

    render(){

        return (<Redirect to='/login' />)
    }
}

const mapStateToProps  = (state) => ({users:state.users})
export default connect(mapStateToProps, {getUsers})(Logout)