import React,{ useEffect, useState } from 'react'
import SidebarTop from './SidebarTop'
import SidebarBottom from './SidebarBottom'

const Sidebar = () => {
  const [showMore, setShowMore] = useState()
  function moreInfo(){
    setShowMore(!showMore)
  }
  
  useEffect(()=>{
    window.innerWidth > 768 ? setShowMore(true) : setShowMore(false)
  },[])

  window.addEventListener("resize", ()=> {
    if (window.innerWidth > 768){
      console.log(window.innerWidth)
      setShowMore(true)
    }
  })
  return (
    <div className="max-md:w-full">
      <div className="max-w-xl max-md:mx-auto md:m-auto md:w-[15rem] h-full">
        <SidebarTop showMore={showMore} />
        <SidebarBottom onButtonClick={moreInfo} showMore={showMore}/>
      </div>
    </div>
  )
}

export default Sidebar