import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { APIConstants } from "../../../constants/api.constant";
import { RootState } from "../store";
import { User } from "../../../types/User";
import { Tokens } from "../../../types/Tokens";


const storedTokens = localStorage.getItem("TOKENS") || sessionStorage.getItem("TOKENS");
const storedUser = localStorage.getItem("USER") || sessionStorage.getItem("USER");
const storedRememberMe = localStorage.getItem("REMEMBER_ME") || sessionStorage.getItem("REMEMBER_ME");

type AuthSliceState = {
    user: User;
    tokens: Tokens;
    rememberMe: boolean;
};


const initialState: AuthSliceState = {
    user: storedUser ? JSON.parse(storedUser) : {} as User,
    tokens: storedTokens ? JSON.parse(storedTokens) : {} as Tokens,
    rememberMe: storedRememberMe ? JSON.parse(storedRememberMe) : false
};

export const authSlice = createSlice({
    name: APIConstants.AUTH.AUTHENTICATE,
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthSliceState>) => {
            const { user, tokens, rememberMe } = action.payload
            state.user = user
            state.tokens = tokens
            state.rememberMe = rememberMe

            localStorage.setItem("REMEMBER_ME", JSON.stringify(rememberMe));
            if (rememberMe) {
                localStorage.setItem("TOKENS", JSON.stringify(tokens));
                localStorage.setItem("USER", JSON.stringify(user));
            } else {
                sessionStorage.setItem("TOKENS", JSON.stringify(tokens));
                sessionStorage.setItem("USER", JSON.stringify(user));
            }

        },
        logOut: (state) => {
            state.user = {} as User;
            state.tokens = {} as Tokens;
            localStorage.removeItem("TOKENS");
            localStorage.removeItem("USER");
            localStorage.removeItem("REMEMBER_ME");
            sessionStorage.removeItem("TOKENS");
            sessionStorage.removeItem("USER");
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.tokens

export default authSlice.reducer
