
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ListIcon from '@mui/icons-material/List';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios"
import { useRevalidator } from 'react-router-dom';

let token=localStorage.getItem("token")

let main=[
    {
        text:"Dashboard",
        icon:<DashboardIcon/>
    }
]


let list=[
    {
      text:"Users",
      icon:  <PeopleOutlineIcon/>,
      link:"/users"
    },
    {
        text:"Movies",
        icon:<LocalMoviesIcon/>,
        link:"/movies"
    },
    {
        text:"List",
        icon:<ListIcon/>,
        link:"/list"
    },
    {
        text:"Create Movie",
        icon:<LocalMoviesIcon/>,
        link:"/createMovie"
    },
    {
        text:"Create List",
        icon:<ListIcon/>,
        link:"/createList"
    },

]


let userFul=[
    {
        text:"Stats",
        icon:<QueryStatsIcon/>

    },
    {
        text:"Notification",
        icon:<NotificationsNoneIcon/>
    }
]

let Services=[
    {
        text:"System Health",
        icon:<SettingsSystemDaydreamIcon/>
    },
    {
        text:"Logs",
        icon:<SettingsBackupRestoreIcon/>
    },
    {
        text:"Settings",
        icon:<SettingsBackupRestoreIcon/>
    }
]

let currentUser=[
    {
        text:"Profile",
        icon:<PersonSearchIcon/>,
        path:"/currentUser"
    },
    {
        text:"Logout",
        icon:<LogoutIcon/>,
        path:"/"
    }
]


const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${token}`
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
    //   if (error.response.status === 401) {
    //     logoutUser()
    //   }
      return Promise.reject(error)
    }
  )


export {main,list,userFul,currentUser,authFetch}