import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("adminToken") || "";
const initialEmail = localStorage.getItem("adminEmail") || "";

const initialState = {
    user: initialEmail,
    idToken: initialToken,
    isAdmin: false,
    loading: null,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null,
                state.isAdmin = null,
                state.idToken = null,
                state.error = null,
                state.loading = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.email;
                state.idToken = action.payload.idToken;
                state.isAdmin = action.payload.isAdmin
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAdmin = false;
            })
        builder
            .addCase(checkAdminToken.fulfilled, (state, action) => {
                state.user = action.payload.email;
                state.idToken = action.payload.idToken;
                state.isAdmin = true;
                state.loading = false;
            })
            .addCase(checkAdminToken.rejected, (state) => {
                state.isAdmin = false;
                state.user = null;
                state.idToken = null;
            });
    }
})

export default authSlice.reducer

export const adminLogin = createAsyncThunk(
    "auth/adminLogin", async (userData, thunkAPI) => {
        try {
            const loginRes = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCr4TwhPv0zCF2r1JvD9GxDKYzOU8r1QRo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            const loginData = await loginRes.json();
            if (loginData.error) {
                return thunkAPI.rejectWithValue(loginData.error.message);
            }
            const idToken = loginData.idToken;

            const lookupRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCr4TwhPv0zCF2r1JvD9GxDKYzOU8r1QRo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken })
            })
            const lookupData = await lookupRes.json();
            const user = lookupData.users[0];

            const attribute = user.customAttributes ? JSON.parse(user.customAttributes) : {}

            if (!attribute.admin) {
                return thunkAPI.rejectWithValue("You are not authorized");
            }
            localStorage.setItem("adminToken", idToken);
            localStorage.setItem("adminEmail", loginData.email)
            return {
                email: loginData.email,
                idToken,
                isAdmin: true
            }

        } catch (err) {
            return thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
)

export const checkAdminToken = createAsyncThunk(
    "auth/checkAdminToken",
    async (idToken, thunkAPI) => {
        try {
            const lookupRes = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCr4TwhPv0zCF2r1JvD9GxDKYzOU8r1QRo`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                }
            );

            const data = await lookupRes.json();

            if (data.error) return thunkAPI.rejectWithValue("Invalid token");

            const user = data.users[0];

            const attributes = user.customAttributes
                ? JSON.parse(user.customAttributes)
                : {};

            if (!attributes.admin) {
                return thunkAPI.rejectWithValue("Not admin");
            }

            return {
                email: user.email,
                idToken,
                isAdmin: true,
            };
        } catch (err) {
            return thunkAPI.rejectWithValue("Token check failed");
        }
    }
);


export const authActions = authSlice.actions;