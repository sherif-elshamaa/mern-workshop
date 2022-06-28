import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: {

    }
}

const userSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = {
                name: action.payload.name,
                age: action.payload.age,
                auth: action.payload.auth
            }
            state.user = user;
        }
    }
})

export default userSlice.reducer;

export const { login } = userSlice.actions;