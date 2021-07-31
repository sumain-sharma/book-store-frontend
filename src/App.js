import React, { Component } from 'react';
import {connect} from 'react-redux';

import Routes from './Routes';
import {LoginNavbar, LogoutNavbar, AdminNavbar} from './component/Navbar'
import {getUsers} from './action/userAction'

class App extends Component {

  componentDidMount(){
    this.props.getUsers()
  }

  render(){
    const user = this.props.users.users
    console.log(this.props.users)
    if (!this.props.users.loading){
      if(this.props.users.is_authenticated){
          if(user.is_superuser){
            return(
              <div className="App">
                <AdminNavbar username = {user.username }/>
                <Routes />
              </div>
          );
          }
        else{
          return(
            <div className="App">
              <LoginNavbar username = {user.username }/>
              <Routes />
            </div>
        );
        }}
      else{
        return(
          <div className="App">
            <LogoutNavbar />
            <Routes />
          </div>
      );
      }
  }
  else{
    return(
      <div className="App">
        <h1>Loading...</h1>
      </div>
    )
  }

}
};

const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getUsers})(App)
