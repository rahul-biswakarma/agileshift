import { useNavigate } from "react-router-dom"

type organizationCardProps = {
  name: string,
  url: string,
  orgId: string,
}

export const OrganizationCard = ({name, url, orgId}: organizationCardProps) => {
  const navigate = useNavigate();

  return (
    <div className='w-full flex justify-between items-center p-2 text-highlight_font_color border border-background_color hover:border-white/10 rounded-lg'>
        <div className='flex gap-2'>
            <img src="https://app.devrev.ai/static/profile-circle-black.png" className='w-14 rounded-full' alt="" />
            <div>
                <h3 className='text-lg'>{name}</h3>
                {/* <p className='text-md text-dark_gray'>https://app.devrev.ai/{url}</p> */}
            </div>
        </div>
        <button onClick={() => navigate(orgId)} className="w-16 h-10 bg-dark_gray text-center text-lg rounded-lg">
            {/* Plus Icon */}
            Enter
        </button>
    </div>
  )
}