

const initialState = {
    users: {},
    loading: true
};

export default function UserDetails(state=initialState, action) {
    switch(action.type){
        case "UPDATE_CURRENT_USER_INFO":
            return {
                ...state,
                users: action.payload,
                loading: false,
                is_authenticated: true
            }
        case "USERS_ERROR":
            return {
                loading: false,
                is_authenticated: false
            }
        default:
            return state
    }
}