import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { APIConstants } from "../../../constants/api.constant";
import { RootState } from "../store";
import { User } from "../../../types/User";


type Tokens = {
    access_token: string;
    refresh_token: string;
};


const storedTokens = localStorage.getItem("TOKENS") || sessionStorage.getItem("TOKENS");
const storedUser = localStorage.getItem("USER") || sessionStorage.getItem("USER");

type AuthSliceState = {
    user: User;
    tokens: Tokens;
};


const initialState: AuthSliceState = {
    user: storedUser ? JSON.parse(storedUser) : {} as User,
    tokens: storedTokens ? JSON.parse(storedTokens) : {} as Tokens,
};

export const authSlice = createSlice({
    name: APIConstants.AUTH.AUTHENTICATE,
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthSliceState>) => {
            const { user, tokens } = action.payload
            state.user = user
            state.tokens = tokens
        },
        logOut: (state) => {
            state.user = {} as User;
            state.tokens = {} as Tokens;
            localStorage.removeItem("TOKENS");
            localStorage.removeItem("USER");
            sessionStorage.removeItem("TOKENS");
            sessionStorage.removeItem("USER");
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.tokens

export default authSlice.reducer
