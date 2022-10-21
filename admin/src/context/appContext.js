import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  CLEAR_UPLOADS,
  CHANGE_PAGE,
  UPLOAD_IMAGE_REGISTER,showSideBar,
  CHANGE_COLOR,
  ALL_USERS,
  DELETE_USER,
  GET_CURRENT_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_ALL_LIST,
  GET_ALL_MOVIES,
  DELETE_LIST,
  DELETE_MOVIE,
  UPDATE_MOVIE
 
} from './actions'
import { ConstructionOutlined, FastfoodOutlined, TranscribeSharp } from '@mui/icons-material'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  image:"",
  totalPages:1,
  page:1,
  registerImage:"",
  isSideBarOpen:false,
  color:"white",
  AllUsers:[],
  CurrentUser:{},
  AllMovies:[],
  AllList:[]
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )


  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  
  const uploadImageForRegister=async (event)=>{
    const imageFile = event.target.files[0];
    console.log(imageFile)
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/auth/registerUploadImage"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE_REGISTER,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  

  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }



  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/movies/upload"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  function changeFunction(e){
    dispatch({type:HANDLE_CHANGE,
    payload:{
      name:e.target.name,
      value:e.target.value
    }})
  }


  function clearuploads(){
    dispatch({type:CLEAR_UPLOADS})
  }



  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
  }


  function openSideBar(){
    dispatch({type:showSideBar})
  }


  function mainColor(color){
     dispatch({type:CHANGE_COLOR,payload:{color:color}})
  }

  
  const allUsers=async ()=>{
      try {
        let {data}=await authFetch("/auth/getAllUsers")
        // console.log(data)
        dispatch({type:ALL_USERS,payload:{data:data.Users}})
      } catch (error) {
        console.log(error.response.data.msg)
      }
  }
 


  const delUser=async (id)=>{
    try {
      await authFetch.delete(`/auth/${id}`)
    } catch (error) {
      console.log(error.response.data.msg)
    }
    allUsers()
  }


  const currentUser=async ()=>{
    try {
      let {data}=await authFetch.get("/auth/getCurrentUser")
      console.log(data)
       dispatch({type:GET_CURRENT_USER,payload:{data:data.User}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const updateUser=async (state)=>{
     try {
        await authFetch.patch("/auth/updateCurrentUser",state)
        dispatch({type:UPDATE_USER_SUCCESS,payload:{msg:"The User Is Updated Successsfully"}})
     } catch (error) {
      dispatch({type:UPDATE_USER_ERROR,payload:{data:error.response.data.msg}})
     }
     clearAlert()
  }


  const allMovies=async ()=>{
    try {
      let {data}=await authFetch("/movies/getAllMovies")
      dispatch({type:GET_ALL_MOVIES,payload:{data:data.Movies}})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const delMovie=async (id)=>{
     try {
       await authFetch.delete(`/movies/${id}`)
     } catch (error) {
      console.log(error.response.data.msg)
     }
     allMovies()
  }
  

  const updateMovie=async ({id,obj})=>{
    try {
      await authFetch.patch(  `/movies/${id}` ,obj)
      dispatch({type:UPDATE_MOVIE})
    } catch (error) {
      console.log(error)
    }
    clearAlert()
  }

  const allList=async ()=>{
    try {
      let {data}=await authFetch.get("/list/allLists")
      dispatch({type:GET_ALL_LIST,payload:{data:data.Lists}})
      console.log(data)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const delList=async (id)=>{
       try {
        await authFetch.delete(`/list/${id}`)
       } catch (error) {
        console.log(error.response.data.msg)
       }
       allList()
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        clearuploads,
        changepage,
        uploadImageForRegister,
        openSideBar,
        mainColor,
        allUsers,
        delUser,
        currentUser,
        updateUser,allMovies,
        delMovie,
        updateMovie,
        allList,
        delList
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
