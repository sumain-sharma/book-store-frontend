import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';

import { EntryPage }  from './style';
import EntryCard from './EntryCard';
import InputGroup from './InputGroup';
import Input from './Input'
import Button from './Button';
import {getUsers} from '../action/userAction'

const USER_LOGIN_API = 'https://book-store-management-backend.herokuapp.com/api/auth_user/login/'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password:'',
            isLoggedIn: false,
            errors: {}}

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
    }

    handleChangeUsername(e) {
        this.setState({username:e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password:e.target.value});
    }

    async submitLoginForm(e) {
        e.preventDefault();
        var data={
            "username":this.state.username,
            "password":this.state.password
        }

        var headers = {
            'Content-Type': 'application/json'
        }

        console.log(data);
        await axios.post(USER_LOGIN_API, 
                    data, {headers: headers}).then((response)=>{
                        this.setState({
                            errors: {},
                        });
                        localStorage.setItem('access_token', "Token " + response.data.key);
                        
                    }).catch((error) => { ""
                        console.log(error);
                        this.state.username = ''
                        this.state.password = ''
                        this.setState({
                            errors: error.response.data
                        })
                    });
        this.props.getUsers();
    }

render() {
    console.log('sadasdas')
    if(this.props.users.is_authenticated){
        return (<Redirect to="/books" />);
    }
    else
    {
    return (
        <EntryPage className="login_bg">
            <EntryCard>
                <h2> Log in</h2>
                <Form method="post" name="userLoginForm" onSubmit= {this.submitLoginForm} >
                    <InputGroup>
                        <label htmlFor="login-username">Username</label>
                        <Input type="username" name="username" id="login-username" value={this.state.username} onChange={this.handleChangeUsername}/>
                        <div className="errorMsg">{this.state.errors.username}</div>
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="login-password">Password</label>
                        <Input type="password" name="password" id="login-password" value={this.state.password} onChange={this.handleChangePassword}/>
                        <div className="errorMsg">{this.state.errors.password}</div>
                    </InputGroup>
                    <div className="errorMsg">{this.state.errors.non_field_errors}</div>
                    <Button type="submit" full>Log in</Button>
                </Form>
                <span>
                    Don't have an acocunt?
                    <Link  to="/signup">Signup</Link>
                </span>
            </EntryCard>
        </EntryPage>
    );
    }
    }
}

const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getUsers})(Login)
 
