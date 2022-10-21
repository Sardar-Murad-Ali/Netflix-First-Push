
import React from 'react'
import { useAppContext } from '../context/appContext'
import ListTable from "./ListTable"

const List = () => {
    let {allList}=useAppContext()

    React.useEffect(()=>{
       allList()
    },[])

  return (
    <div>
       <ListTable/>
    </div>
  )
}

export default List
