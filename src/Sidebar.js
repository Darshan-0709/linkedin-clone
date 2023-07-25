import React,{ useState } from 'react'
import SidebarTop from './SidebarTop'
import SidebarBottom from './SidebarBottom'

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false)
  function moreInfo(){
    setShowMore(!showMore)
  }
  return (
    <div className="max-md:w-full">
      <div className="max-w-xl max-md:mx-auto md:m-auto md:w-[15rem] sticky top-16">
        <SidebarTop showMore={showMore} />
        <SidebarBottom onButtonClick={moreInfo} showMore={showMore}/>
      </div>
    </div>
  )
}

export default Sidebar