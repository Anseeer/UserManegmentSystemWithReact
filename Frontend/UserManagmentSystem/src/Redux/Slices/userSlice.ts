import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    name: string;
    email: string;
    profileImg?: string;
    isAdmin:boolean;
  }
  
  interface UserState {
    token: string | null;
    user: UserInfo | null; 
    isAuthenticated: boolean;
  }

const initialState:UserState = {
    token:null,
    user:null,
    isAuthenticated:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signup :(state,action:PayloadAction<{token:string,user:UserInfo}>)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            console.log("stateToken",state.token ,"stateUser",state.user)
        },
        login :(state,action:PayloadAction<{token:string,user:UserInfo}>)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            console.log("stateToken",state.token ,"stateUser",state.user)
        },
        logout:(state)=>{
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
        },
        updateUser:(state,action:PayloadAction<UserInfo>)=>{
            if(state.user){
                state.user.profileImg = action.payload.profileImg;
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
            }
            console.log("action payload",action.payload)
            },
            setUser :(state,action:PayloadAction<UserInfo>)=>{
                            state.user = action.payload;
                            state.isAuthenticated = true;
            },
    },
})


export default userSlice.reducer;
export const {login , logout , updateUser , signup ,setUser} = userSlice.actions