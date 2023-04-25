import { csrfFetch } from "./csrf";
import { storeCSRFToken } from "./csrf";

const SHOWALLPAGES = 'page/SHOWALLPAGES';
const CREATEPAGE = "page/CREATEPAGE";
const UPDATEPAGE = "page/UPDATEPAGE";
const REMOVEPAGE = "page/REMOVEPAGE";

const showAllPages = (pages) => (
    {
        "type": SHOWALLPAGES,
        pages
    }
)

const createPage = (page) => (
    {
        "type": CREATEPAGE,
        page
    }
)

const removePage = (pageId) => (
    {
        "type": REMOVEPAGE,
        pageId
    }
)

const updatePage = (page) => (
    {
        "type": UPDATEPAGE,
        page
    }
)

export const showAll = () => async (dispatch) => {
    const res = await csrfFetch("/api/pages")
    const data = await res.json()
    dispatch(showAllPages(data))
}

export const addPage = () => async (dispatch) => {
    const res = await csrfFetch("/api/pages", {
        method: "POST",
    })
    const data = await res.json();
    dispatch(createPage(data));
}

export const modifyPage = (page) => async(dispatch) => {
    const res = await csrfFetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            page
        })
    })
    dispatch(updatePage(page))
}

export const deletePage = ({pageId}) => async(dispatch) => {
    const res = await csrfFetch(`/api/pages/${pageId}`, {
        method: "DELETE",
    })
    dispatch(removePage(pageId))
}

let initialState = {};

const pageReducer = (state=initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case (SHOWALLPAGES):
            return ({...action.pages})
        case (CREATEPAGE):
            return ({ ...state, [action.page.id]: action.page }); 
            // return action.payload;
        case (UPDATEPAGE):
            return ({ ...state, [action.page.id]: { ...state[action.page.id], ...action.page }});
            // newState = {};
            // return newState;
        case (REMOVEPAGE):
            delete newState[action.pageId]
            return newState;
        default:
            return state;
    }
}

export default pageReducer;