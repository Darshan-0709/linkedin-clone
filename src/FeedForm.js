import React from 'react'
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import FeedOption from './FeedOption';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice'; 

const FeedForm = ({ onFormSubmit, input, setInput }) => {
  const user = useSelector(selectUser)
  const profilePic = user?.photoUrl || ''
  return (
    <div className="flex flex-col">
        <div className="w-full h-fit bg-white px-4 py-3 rounded-xl border-[1px] space-y-3 flex flex-col">
          <div className="flex">
            <div>
              {profilePic ? <img className="h-12 w-12 rounded-3xl object-cover" src={profilePic} alt="" />
               : <div className="h-12 w-12 flex items-center bg-gray-300 rounded-3xl justify-center"><PersonIcon fontSize="large" className="text-gray-500" /></div> }
            </div>
            <form onSubmit={onFormSubmit} className="grow px-4" action="" >
              <input name="input" value={input} onChange={e => setInput(e.target.value) } className="w-full px-4 h-full border-[1px] rounded-3xl border-gray-400 hover:bg-gray-200 focus:bg-gray-200" type="text" placeholder="Start a post" />
              {/* <button className="hidden" type="submit">send</button> */}
            </form>
          </div>
          <div className="flex justify-around">
            <FeedOption Icon={PhotoSizeSelectActualOutlinedIcon} title={'Photo'} color={'text-custom-blue'} />
            <FeedOption Icon={SmartDisplayRoundedIcon} title={'Video'} color={'text-custom-green'} />
            <FeedOption Icon={CalendarTodayIcon} title={'Event'} color={'text-custom-yellow'} />
            <FeedOption Icon={NewspaperIcon} title={'Write article'} color={'text-custom-orange'} />
          </div>
        </div>
      </div>
  )
}

export default FeedForm