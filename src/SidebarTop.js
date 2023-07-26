import React from 'react'
import background from './img/background.svg'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice'


const SidebarTop = ({ showMore }) => {
  const user = useSelector(selectUser)
  const profilePic = user?.photoUrl || ''
  const name = user?.name || ''
  const description = user?.description || ''
  const email = user?.email || ''

  return (
    <div>
      <div className="rounded-t-xl bg-white overflow-hidden pb-3">
        <div className="relative mb-10">
          <img className="h-16 w-full object-cover" src={background} alt="" />
          {profilePic ? <img className="h-16 w-16 absolute scale-110 object-cover left-1/2 -translate-x-1/2 top-1/2 rounded-full border-[3px] border-white" src={profilePic} alt="Profile Pic" /> : <div className="h-16 w-16 bg-gray-300 absolute scale-110 object-cover left-1/2 -translate-x-1/2 top-1/2 rounded-full border-[3px] border-white flex items-center justify-center"><PersonIcon fontSize="large" className="text-gray-500"/></div> }
        </div>
        <h4 className="text-center font-bold text-lg">{name}</h4>
        { <p className="text-center">{description ? description : email}</p>}
      </div>
      <div className={`max-sm:${showMore ? '': 'hidden'} rounded-b-xl overflow-hidden bg-white pb-2 border-t-[1px]`}>
        <div className="px-3 py-3 ">
          <h4 className="text-sm font-semibold flex justify-between pb-2">Views of your post<span className="text-[#0072b1]">58</span></h4>
          <h4 className="text-sm font-semibold flex justify-between">Who viewed your profile<span className="text-[#0072b1]">153</span></h4>
        </div>
        <button className="text-sm w-full py-3 px-3 border-t-[1px] font-semibold flex items-center"><StarRateRoundedIcon className="text-yellow-400 mr-4" /> See all primium features</button>
        <button className="text-sm w-full py-3 px-3 border-t-[1px] font-semibold flex items-center"><FlagRoundedIcon className="mr-4 text-gray-600"/>My items</button>
      </div>
    </div>
  )
}

export default SidebarTop