import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';

import { EntryPage }  from './style';
import EntryCard from './EntryCard';
import InputGroup from './InputGroup';
import Input from './Input'
import Button from './Button';
import { getUsers } from '../action/userAction';

const USER_SIGNUP_API = 'https://book-store-management-backend.herokuapp.com/api/auth_user/registration'

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state={
            username: '',
            password1: '',
            password2: '',
            isSignup: false,
            errors: {}}

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword1 = this.handleChangePassword1.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.submitSignupForm = this.submitSignupForm.bind(this);
    }

    handleChangeUsername(e) {
        this.setState({username:e.target.value});
    }

    handleChangePassword1(e) {
        this.setState({password1:e.target.value});
    }
    handleChangePassword2(e) {
        this.setState({password2:e.target.value});
    }
    

    async submitSignupForm(e) {
        e.preventDefault();
        var data={
            "username":this.state.username,
            "password1":this.state.password1,
            "password2":this.state.password2
        }

        var headers = {
            'Content-Type': 'application/json',
        }

        await axios.post(USER_SIGNUP_API, 
                    data, {headers: headers}).then((response)=>{
                        this.setState({
                            errors: {},
                        })
                        localStorage.setItem('access_token', "Token " + response.data.key);
                    }).catch((error) => { 
                        console.log();
                        this.state.username = ''
                        this.state.password1 = ''
                        this.state.password2 = ''
                        this.setState({
                            errors: error.response.data
                        })
                    });
        this.props.getUsers()
    }

render() {
    if(this.props.users.is_authenticated){
        return (<Redirect to="/books" />);
    }
    else
    {
    return (
        <EntryPage className="login_bg">
            <EntryCard>
                <h2> Sign up</h2>
                <Form method="post" name="userSignupForm" onSubmit= {this.submitSignupForm} >
                    <InputGroup>
                        <label htmlFor="signup-username">Username</label>
                        <Input type="username" name="username" id="signup-username" value={this.state.username} onChange={this.handleChangeUsername}/>
                        <div className="errorMsg">{this.state.errors.username}</div>
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="signup-password1">Password</label>
                        <Input type="password" name="password1" id="signup-password1" value={this.state.password1} onChange={this.handleChangePassword1}/>
                        <div className="errorMsg">{this.state.errors.password1}</div>
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="signup-password2">Confirm Password</label>
                        <Input type="password" name="password2" id="signup-password2" value={this.state.password2} onChange={this.handleChangePassword2}/>
                        <div className="errorMsg">{this.state.errors.password2}</div>
                    </InputGroup>
                    <div className="errorMsg">{this.state.errors.non_field_errors}</div>
                    <Button type="submit" full>Sign up</Button>
                </Form>
                <span>
                    Already have an account?
                    <Link to="login/">Login</Link>
                </span>
            </EntryCard>
        </EntryPage>
    )
    }
    }
}

const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getUsers})(Signup)