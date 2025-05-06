import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminInfo {
    name: string;
    email: string;
    profileImg?: string;
  }
  
  interface AdminState {
    token: string | null;
    admin: AdminInfo | null; 
    isAuthenticated: boolean;
  }

const initialState:AdminState = {
    token:null,
    admin:null,
    isAuthenticated:false,
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        login :(state,action:PayloadAction<{token:string,admin:AdminInfo}>)=>{
            state.token = action.payload.token;
            state.admin = action.payload.admin;
            state.isAuthenticated = true;
            console.log(state.token , state.admin)
        },
        logout:(state)=>{
            state.token = null;
            state.isAuthenticated = false;
        },
        updateUser:(state,action:PayloadAction<AdminInfo>)=>{
            if(state.admin){
                state.admin.profileImg = action.payload.profileImg;
                state.admin.name = action.payload.name;
                state.admin.email = action.payload.email;
            }
            console.log("action payload",action.payload)
            }
    },
})


export default adminSlice.reducer;
export const {login , logout , updateUser} = adminSlice.actions