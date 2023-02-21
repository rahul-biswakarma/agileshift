import React from 'react';
import ArrowIcon from "../../assets/icons/arrow-icon.svg";


const OrganisationForm = () => {
  return (
    <div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
			<div className="h-3/5 w-[350px] flex flex-col gap-5">
				<div className="text-highlight_font_color mb-5">
					<h3 className="flex gap-4 text-2xl mb-4"> 
            <img src={ArrowIcon} alt="Arrow Icon" className="w-8 h-8" /> 
            Create a new AgileShift Organisation
          </h3>
					{/* Change this to dynamic username */}
					<p className="text-primary_font_color text-lg">An organization is a workspace that helps your team collaborate</p>  
				</div>
				<div className="text-highlight_font_color flex flex-col gap-5 mb-8">
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-lg text-dark_gray font-semibold'>Name</label>
            <input type="text" className='bg-'/>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-lg text-dark_gray font-semibold'>URL</label>
            <div className='flex gap-3 rounded-lg border border-dark_gray items-center'>
              <label htmlFor="" className='px-4'>app.devrev.ai/</label>
              <input type="text" className='flex-1 font-lg rounded-lg px-4 bg-Secondary_background_color h-10 outline-none'/>
            </div>
          </div>

				</div>
				<button className="flex gap-4 items-center justify-center border border-dark_gray py-4 rounded-lg text-highlight_font_color">
					<img
						src={ArrowIcon}
						alt="Plus Icon"
						className="w-4 h-4"
					/>
					Create new AgileOrg
				</button>
			</div>
			{/* <UploadJSON schemaType="tickets"/> */}
		</div>
  )
}

export default OrganisationForm