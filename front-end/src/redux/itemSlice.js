import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



export const getItems = createAsyncThunk(
    'item/getItems',
    async ()=>{
        const api = await fetch('http://127.0.0.1:8000/api/items');
        const response = await api.json();

        return response;
    }
);

export const addItem = createAsyncThunk(
    'item/addItem',
    async (item , thunkAPI)=>{
        console.log(item);
        const response = await fetch('http://127.0.0.1:8000/api/add_item', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(item),
        })
        if(response.ok){
            Swal.fire({
                title: "Item",
                text: "Has been Added Successfully",
                type: "success"
            }).then(function() {
                window.location = "add";
            });
        }else{

        }
    }
);

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (args)=>{
        // console.log(args)
        const id = args.id;
        const response =await fetch(`http://127.0.0.1:8000/api/update_item/${id}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({name:args.name , description:args.description}),
        })
        
        if(response.ok){
            Swal.fire({
                title: "Item",
                text: "Has been updated Successfully",
                type: "success"
            }).then(function() {
                window.location = `/update/${id}`;
            });
        }else{

        }
    }
);

export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async (id)=>{
        
        const response =await fetch(`http://127.0.0.1:8000/api/delete_item/${id}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            
        })
        if(response.ok){
            Swal.fire({
                title: "Item",
                text: "Has been deleted Successfully",
                type: "success"
            }).then(function() {
                window.location = `/main`;
            });
        }else{

        }
        
    }
)

const itemSlice = createSlice({
    name:'item',
    initialState:{items:[] , status:null},
    extraReducers:{
        //get item from api
        [getItems.fulfilled]:(state , action)=>{
            state.status = 'success fetch data';
            state.items = action.payload;

        },
        [getItems.pending]:(state  )=>{
            state.status = 'pending  fetch data';
            
        },
        [getItems.rejected]:(state )=>{
            state.status = 'rejected  fetch data';
        },

        //add item to api

        [addItem.fulfilled]:(state , action)=>{
            state.status = 'success send data';
            

        },
        [addItem.pending]:(state  )=>{
            state.status = 'pending send data';
            
        },
        [addItem.rejected]:(state )=>{
            state.status = 'rejected send data';
        },


        //update item in api
        [updateItem.fulfilled]:(state , action)=>{
            state.status = 'success update data';
            

        },
        [updateItem.pending]:(state  )=>{
            state.status = 'pending update data';
            
        },
        [updateItem.rejected]:(state )=>{
            state.status = 'rejected update data';
        },

        
}
})

export default itemSlice.reducer;