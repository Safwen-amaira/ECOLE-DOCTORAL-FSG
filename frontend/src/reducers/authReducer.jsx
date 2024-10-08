import {
    DOCTORANT_USER_LOADED,
    DOCTORANT_USER_FAILED,
    ADMINF_USER_LOADED,
    ADMINF_USER_FAILED,

    ADMINS_USER_LOADED,
    ADMINS_USER_FAILED,

    ADMINT_USER_LOADED,
    ADMINT_USER_FAILED,

    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,

    REGISTER_A1USER_SUCCESS,
    REGISTER_A1USER_FAILED,

    REGISTER_A2USER_SUCCESS,
    REGISTER_A2USER_FAILED,

    REGISTER_A3USER_SUCCESS,
    REGISTER_A3USER_FAILED,

    REGISTER_DUSER_SUCCESS,
    REGISTER_DUSER_FAILED
} from "../action/types.jsx"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isDoctorant: null,
    isAdminf: null,
    isAdmins: null,
    isAdmint: null,
    isLoading: false,
    user: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_DUSER_SUCCESS:
        case REGISTER_A1USER_SUCCESS:
        case REGISTER_A2USER_SUCCESS:
        case REGISTER_A3USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isDoctorant: action.payload.user.is_doctorant,
                isAdminf: action.payload.user.is_adminf,
                isAdmins: action.payload.user.is_admins,
                isAdmint: action.payload.user.is_admint,
                isActive:true,
                isLoading: false
            }
        case REGISTER_DUSER_FAILED:
        case REGISTER_A1USER_FAILED:
        case REGISTER_A2USER_FAILED:
        case REGISTER_A3USER_FAILED:
        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isDoctorant: null,
                isAdminf: null,
                isAdmins: null,
                isAdmint: null,
                isLoading: false,

            }
        case DOCTORANT_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isDoctorant: true,
                isAdminf: false,
                isAdmins: false,
                isAdmint: false,
                user: action.payload
            }
        case ADMINF_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isDoctorant: false,
                isAdminf: true,
                isAdmins: false,
                isAdmint: false,
                user: action.payload
            }
        case ADMINS_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isDoctorant: false,
                isAdminf: false,
                isAdmins: true,
                isAdmint: false, 
                user: action.payload
            }
        case ADMINT_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isDoctorant: false,
                isAdminf: false,
                isAdmins: false,
                isAdmint: true,
                user: action.payload
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isDoctorant: action.payload.user.is_doctorant,
                isAdminf: action.payload.user.is_adminf,
                isAdmins: action.payload.user.is_admins,
                isAdmint: action.payload.user.is_admint,
                isLoading: false

            }
        case DOCTORANT_USER_FAILED:
        case ADMINF_USER_FAILED:
        case ADMINS_USER_FAILED:
        case ADMINT_USER_FAILED:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isDoctorant: null,
                isAdminf: null,
                isAdmins: null,
                isAdmint: null,
                isLoading: false,

            }



    }
    return state;
}
