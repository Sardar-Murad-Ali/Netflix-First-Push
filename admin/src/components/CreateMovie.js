import { Typography } from '@mui/material'
import React from 'react'
import FormRow from './FormRow'
import FormSelect from "./FormSelect"
import "./Form.css"
import "./Movie.css"
import { useAppContext } from '../context/appContext'
import { RecentActorsTwoTone } from '@mui/icons-material'
import Delete from '@mui/icons-material/Delete'


const CreateMovie = () => {
  let [images,setImages]=React.useState([])

  let { uploadImage,image
  } = useAppContext()
 
  React.useEffect(()=>{
    if(image!==""){
      setImages((pre)=>{
        return [...pre,{id:pre.length===0?1:pre[pre.length-1].id+1,image:image}]
      })
    }
  },[image])
  console.log(images)

  let [state,setState]=React.useState({
    name:"",
    title:"",
    description:"",
    type:"",
    genre:"",
    year:"",
    duration:"",
    posterImg:images
  })

  function handleChange(e){
    setState((pre)=>{
      return {...pre,
      [e.target.name]:e.target.value
      }
    })
  }

  let array1=["action","adventure","animated","comedy","crime","fantasy","horror","mystery","sci-fiction","romance","thriller","documentary"]

    let arr2=["movie","list"]

    let years=["2015","2016","2017","2018","2019","2020","2021","2022"]
    
    
    function handleimage(event){
        uploadImage(event)
      }
    
    

  return (
    <div>
      <Typography>Create Movie</Typography>
      <div className='singleMoviePart'>
        <FormRow label="Name" value={state.name} handleChange={handleChange} type="text" name="name" />
      </div>

      <div className='singleMoviePart'>
        <FormRow label="Title" value={state.title} handleChange={handleChange} type="text" name="title" />
      </div>

      <div className='singleMoviePart' style={{marginLeft:"40px",width:"50%"}}>
        <Typography variant='h6'>Description</Typography>
          <textarea className='form-textarea form' name="description" onChange={handleChange} value={state.description} ></textarea>
      </div>

      <div className='singleMoviePart' style={{marginLeft:"40px",width:"50%",marginBottom:"60px"}}>
      <FormSelect name="genre" label="Type" value={state.genre} handleChange={handleChange} array={array1}/>
            </div>
            <div style={{marginLeft:"40px",width:"50%",marginBottom:"60px"}}>
      <FormSelect label="Genre" name="type" value={state.type} handleChange={handleChange} array={arr2} />
            </div>

            <div className='singleMoviePart'>
           <FormRow label="Duration" value={state.duration} handleChange={handleChange} type="text" name="duration" />
         </div>

         <div className='singleMoviePart' style={{marginLeft:"40px",width:"50%",marginBottom:"60px"}}>
           <FormSelect label="Year" name="year" value={state.year} handleChange={handleChange} array={years} />
            </div>

            <div  className='singleMoviePart'>
               <Typography variant='h6' style={{marginBottom:"40px"}}>Add An Image</Typography>
               
               {images.map((all)=>{
                return <div style={{width:"50%",display:"flex",justifyContent:"space-around",padding:"10px",border:"1px solid",marginBottom:"30px"}}>
                    <img src={all?.image} style={{height:"40px",width:"40px",borderRadius:"50%"}} />
                    <Delete/>
                </div>
               })}
               <input style={{marginTop:"50px"}} type="file" id="image" accept="image/*" onChange={handleimage} />
            </div> 

    </div>
  )
}

export default CreateMovie
