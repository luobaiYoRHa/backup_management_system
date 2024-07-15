import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false
    },
    reducers: {
        collaspseMenu: state => {
            state.isCollapse = !state.isCollapse
        }
    }
})

export const { collaspseMenu } = tabSlice.actions;
export default tabSlice.reducer;