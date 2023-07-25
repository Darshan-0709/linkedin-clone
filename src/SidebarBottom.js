import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SidebarBottom = ({showMore, onButtonClick}) => {
  const event = (event) => {
    return (
      <button className="flex items-center w-full px-3 mt-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-slate-300">
        <span className="pr-3 font-extrabold text-base">#</span>
        <p>{event}</p>
      </button>
    )
  }
  return (
    <>
      <div className={`${showMore ? '' : 'hidden'} mt-2 py-4 rounded-t-lg bg-white border-b-[1px]`}>
          <h4 className="font-semibold text-lg px-3">Recent</h4>
          {event('react js')}
          {event('programming')}
          {event('Java meetup NewYork')}
      </div>
      <button className="sm:hidden w-full mt-2 bg-gray-300" onClick={()=> onButtonClick()}>{showMore ? 'Show less': 'Show more'}{showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</button>
    </>
  )
}

export default SidebarBottom