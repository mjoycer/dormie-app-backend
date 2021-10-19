import jwtDecode from "jwt-decode";
const initialState = {
    users: [],
    notes: [],
    chores: [],
    bills: [],
    loggedInUser: localStorage.getItem('token') ? { token: localStorage.getItem('token'), id: localStorage.getItem('user_id') } : {}
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BG_COLOR':
            return { ...state, bgColor: action.payload }
        case 'LOGIN':
            let decoded = jwtDecode(action.payload);
            localStorage.setItem('token', action.payload);
            localStorage.setItem('user_id', decoded.id);
            return { ...state, loggedInUser: { token: action.payload, id: decoded.id } }
        case 'LOGOUT': {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            return { ...state, loggedInUser: {} };
        }
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_NOTES':
            return { ...state, notes: action.payload };
        case 'SET_CHORES':
            return { ...state, chores: action.payload };
        case 'SET_BILLS':
            return { ...state, bills: action.payload };
        default:
            return (state);
    };
};

export default reducer;