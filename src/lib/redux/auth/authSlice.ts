import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { APIConstants } from "../../../services/api.constant";
import { RootState } from "../store";
import { User } from "../../../types/User";


type Tokens = {
    accessToken: string;
    refreshToken: string;
};


const tokensFromLocalStorage = localStorage.getItem("TOKENS")
const userFromLocalStorage = localStorage.getItem("USER");

type AuthSliceState = {
    user: User;
    tokens: Tokens;
};


const initialState: AuthSliceState = {
    user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {},
    tokens: tokensFromLocalStorage ? JSON.parse(tokensFromLocalStorage) : {},
};

export const authSlice = createSlice({
    name: APIConstants.AUTH.AUTHENTICATE,
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthSliceState>) => {
            const { user, tokens } = action.payload
            state.user = user
            state.tokens = tokens
            localStorage.setItem("TOKENS", JSON.stringify(tokens));
            localStorage.setItem("USER", JSON.stringify(user));
        },
        logOut: (state) => {
            state.user = {} as User;
            state.tokens = {} as Tokens;
            localStorage.removeItem("TOKES");
            localStorage.removeItem("USER");
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.tokens

export default authSlice.reducer
