import { createSlice } from "@reduxjs/toolkit";

const initialState ={
 _id:"",
  firstname:"",
  lastname:'',
  email:"",
 
  image:''
}


export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
     login:(state,action)=>{
         console.log(action.payload.data);
        state._id=action.payload.data._id;
        state.firstname=action.payload.data.firstname;
        state.lastname=action.payload.data.lastname;
        state.email=action.payload.data.email;
     
        state.image=action.payload.data.image;
     }
    }
});



export const {login}=UserSlice.actions;

export default UserSlice.reducer;