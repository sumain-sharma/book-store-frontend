import React, { Component } from 'react';
import { StyledNavbar, NavItem, NavItemLink } from './style';

export class LogoutNavbar extends Component {
    render(){
        return (
            <StyledNavbar>
                <NavItem style={{float: 'left'}}><b>Book Store</b> </NavItem>
                <NavItemLink to="/login" style={{float: 'right'}}> Login </NavItemLink>
                <NavItemLink to="/signup" style={{float: 'right'}}> Signup </NavItemLink>
            </StyledNavbar>
        );
    }

}

export class LoginNavbar extends Component {
    render(){
        return (
            <StyledNavbar>
                <NavItem style={{float: 'left'}}><b>Book Store </b></NavItem>
                <NavItemLink to="/logout" style={{float: 'right'}}> Logout </NavItemLink>
                <NavItemLink to="/" style={{float: 'right'}}> Books </NavItemLink>
                <NavItemLink to="/viewrating" style={{float: 'right'}}> Reviews </NavItemLink>
               
                <NavItem  style={{float: 'right'}}>welcome {this.props.username} </NavItem>
                
            </StyledNavbar>
        );
    };
};
export class AdminNavbar extends Component {
    render(){
        return (
            <StyledNavbar>
                <NavItem style={{float: 'left'}}><b>Book Store</b> </NavItem>
                <NavItemLink to="/logout" style={{float: 'right'}}> Logout </NavItemLink>
                <NavItemLink to="/customers" style={{float: 'right'}}> Customers </NavItemLink>
                <NavItemLink to="/orders" style={{float: 'right'}}> Orders </NavItemLink>
                <NavItemLink to="/books" style={{float: 'right'}}> Books </NavItemLink>
                <NavItem  style={{float: 'right'}}>welcome {this.props.username} </NavItem>
            </StyledNavbar>
        );
    };
};
