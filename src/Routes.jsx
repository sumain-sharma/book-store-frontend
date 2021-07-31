import Orders from './component/Orders';  
import EditOrders from './component/EditOrders'; 
import Rate from './component/Rate';
import ViewRating from './component/ViewRating';
import AddBook from './component/AddBook';
import EditBook from './component/EditBook';
import Customers from './component/Customers';
import EditCustomer from './component/EditCustomer';
import BList from './component/BList';
import Login from './component/Login';
import Signup from './component/Signup';
import Logout from './component/Logout';

import React from 'react';
import { Switch, Route} from 'react-router-dom';

function Routes(){

  return(
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/books" component={BList} />
      <Route exact path="/editorder/:id" component={EditOrders} />
      <Route exact path="/" component={BList} />
      <Route exact path="/addbook" component={AddBook} />
      <Route exact path="/editbook/:id" component={EditBook} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/editcustomer/:id" component={EditCustomer} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/addrating" component={Rate} />
      <Route exact path="/viewRating" component={ViewRating} />
    </Switch>
  );
}

export default Routes