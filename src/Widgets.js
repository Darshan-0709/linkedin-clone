import React,{useState} from 'react'
import SidebarTop from './SidebarTop'
import SidebarBottom from './SidebarBottom'

const Widgets = () => {
  const [showMore, setShowMore] = useState(false)
  function moreInfo(){
    setShowMore(!showMore)
  }
  return (
    null
  )
}

export default Widgets