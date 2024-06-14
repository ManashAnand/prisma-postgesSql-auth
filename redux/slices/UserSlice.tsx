import {createSlice} from '@reduxjs/toolkit'

const UserSlice =  createSlice({
    name: "user",
    initialState:{},
    reducers:{
    
        logIn(state,action){
            // console.log("From userslice")
            return  {...state,...action.payload}
        },
        logOut(state, action) {
            return {}; 
          },
    }
})
export default UserSlice.reducer;
export const {logIn,logOut} = UserSlice.actions