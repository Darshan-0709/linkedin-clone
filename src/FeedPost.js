import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import FeedOption from './FeedOption';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import SendIcon from '@mui/icons-material/Send';

const FeedPost = ({ name, description, profilePic, message  }) => {
  return (
    <div className="mt-3 bg-white rounded-lg py-3 overflow">
      <div>
        <div className="flex px-4">
          <div className="h-12 w-12 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
              {profilePic ? <img className="h-full w-full object-cover rounded-3xl" src={profilePic} alt="" /> : <PersonIcon fontSize='large' />}
          </div>
          <div className="ml-2">
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="mt-2 text-gray-800 px-4 pt-3">{message}</p>
      </div>
      <div className="flex border-t-2 mt-3 pt-2 mx-3">
        <FeedOption Icon={ThumbUpOutlinedIcon} title={'Like'} color={'gray-500'}/>
        <FeedOption Icon={ChatOutlinedIcon} title={'Comment'} color={'gray-500'}/>
        <FeedOption Icon={CachedIcon} title={'Report'} color={'gray-500'}/>
        <FeedOption Icon={SendIcon} title={'Send'} color={'gray-500'}/>
      </div>
    </div>
  )
}

export default FeedPost