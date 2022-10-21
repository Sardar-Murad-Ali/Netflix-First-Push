import { Typography } from '@mui/material'
import React from 'react'
import {main,list,userFul,currentUser} from "../utils"
import "./Sidebar.css"
import { useAppContext } from '../context/appContext'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link,to } from 'react-router-dom'

const Sidebar = () => {
    let {isSideBarOpen,mainColor, logoutUser}=useAppContext()
  return (
    <div className={`sidebar__Main  ${isSideBarOpen?"activeSidebar":""}`} id={isSideBarOpen?"activeSidebar":""}>
        <div className='AdminHeading'>
      <Typography variant='h5'  style={{marginBottom:"57px",marginLeft:"20px"}}>MuradAdmin</Typography>
        </div>

      <div className='cointainer'>
        <Typography variant='h6' style={{marginLeft:"12px"}}>Main</Typography>
        {main.map((all)=>{
            return <div className='section'>
                <Typography variant='h7'>{all?.text}</Typography>
                <div style={{color:"blue"}}>{all?.icon}</div>
            </div>
        })}
      </div>


      <div  className='cointainer'>
        <Typography variant='h6' style={{marginLeft:"12px"}}>List</Typography>
        {list.map((all)=>{
            return <div className='section'>
                <Typography variant='h7'>{all?.text}</Typography>
                <Link style={{color:"blue"}} to={all?.link}>{all?.icon}</Link>
            </div>
        })}
      </div>


      <div  className='cointainer'>
        <Typography variant='h6' style={{marginLeft:"12px"}}>UseFul</Typography>
        {userFul.map((all)=>{
            return <div className='section'>
                <Typography variant='h7'>{all?.text}</Typography>
                <div style={{color:"blue"}}>{all?.icon}</div>
            </div>
        })}
      </div>


      <div  className='cointainer'>
        <Typography variant='h6' style={{marginLeft:"12px"}}>User</Typography>
       
              <div className='section'>
               
                <Typography variant='h7'>User</Typography>
                <Link to="/currentUser" style={{color:"blue"}}><PersonSearchIcon/></Link>
            </div>
          
              <div className='section'>
                <Typography variant='h7' >Logout</Typography>
                <div style={{color:"blue"}}><LogoutIcon onClick={()=>logoutUser()}/></div>
            </div>
    
      </div>

      <div className='cointainer'>
       <Typography variant='h6' style={{marginLeft:"12px"}}>Theme</Typography>
       <div className='boxes'>
        <div className='black' onClick={()=>mainColor("black")}></div>
         <div className='white'  onClick={()=>mainColor("white")}></div>
      </div>
      </div>


    </div>
  )
}

export default Sidebar
