import React from 'react'

const HeaderButton = ({ Icon, Title, profilePic, Arrow, onButtonClick }) => {
  return (
    <button onClick={onButtonClick} className="flex flex-col items-center justify-center h-[3.4rem] relative text-gray-500 text-sm hover:text-black group transition-colors duration-100">
      <div className="absolute bottom-0 left-0 h-0.5 group-hover:w-full bg-black"></div>
      {/* {Icon && <Icon />} */}
      {profilePic ? <img className='w-6 h-6 rounded-full object-cover' src={profilePic} alt="My profile" /> : <Icon />}
      {Arrow ? (
                <div className='p-0 items-top hidden text-sm grow min-[810px]:flex  shrink relative'>
                  <span>{Title}</span> 
                  {<Arrow />}
                </div>
              ) :
              <span className="hidden text-sm grow min-[810px]:inline">{Title}</span> }
    </button>
  )
}

export default HeaderButton