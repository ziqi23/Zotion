import { csrfFetch } from "./csrf";
import { storeCSRFToken } from "./csrf";

const SETSESSION = "session/SETSESSION";
const REMOVESESSION = "session/REMOVESESSION";

const setSession = (payload) => (
    {
        "type": SETSESSION,
        payload
    }
)

const removeSession = () => (
    {
        "type": REMOVESESSION,
    }
)

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");
    storeCSRFToken(res)
    const data = await res.json();
    storeCurrentUser(data.user)
    dispatch(setSession(data.user))
}

const storeCurrentUser = (user) => {
    const currentUser = JSON.stringify(user);
    sessionStorage["currentUser"] = currentUser
}

export const login = ({credential, password}) => async (dispatch) => {
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    })
    const data = await res.json();
    dispatch(setSession(data.user));
    storeCurrentUser(data.user)
    return res;
}

export const logout = () => async(dispatch) => {
    const res = await csrfFetch("/api/session", {
        method: "DELETE"
    })
    dispatch(removeSession())
    storeCurrentUser(null)
}

export const signUpUser = ({username, email, password}) => async(dispatch) => {
    await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        'Content-Type': 'application/json'
    })
    dispatch(login({credential: username, password}))
}

let initialState;
if (sessionStorage.getItem('currentUser') === "undefined") {
    initialState = {
        user: {}
    }
} else {
    initialState = {
        user: JSON.parse(sessionStorage.getItem('currentUser'))
    }
}

const sessionReducer = (state=initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case (SETSESSION):
            return ({ ...state, user: action.payload });
            // return action.payload;
        case (REMOVESESSION):
            return ({ ...state, user: null});
            // newState = {};
            // return newState;
        default:
            return state;
    }
}

export default sessionReducer;