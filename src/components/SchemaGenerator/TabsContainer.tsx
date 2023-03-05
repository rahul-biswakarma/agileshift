import React from 'react'
import { NewSchema } from './NewSchema'
import Tab from './Tab'

type TabsContainerPropTypes = {
  fields:TYPE_FIELD[];
  addSchema:()=>void;
  mode:string;
}

export const TabsContainer = ({fields,addSchema,mode}:TabsContainerPropTypes) => {
  return (
    <nav className='h-screen w-1/5 bg-Secondary_background_color border-r border-white/10 flex flex-col items-center'>
     {mode==="create"&& <Tab organisation={true} id={-1}/>}
      {fields.map((field:any, id:any) => (
        <Tab key={id} field={field} id={id}/>
      ))}
        <NewSchema addSchema={addSchema} />
    </nav>
  )
}

export default TabsContainer
