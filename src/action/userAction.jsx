import axios from "axios";


export const getUsers = () => async dispatch => {
    
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
    }

    try{
        const res = await axios.get("https://book-store-management-backend.herokuapp.com/api/auth_user/current-user-details", {headers: headers})
        dispatch( {
            type: "UPDATE_CURRENT_USER_INFO",
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type:"USERS_ERROR",
            payload: console.log(e)
    })
    }
}
