import React,{ useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Widgets = () => {
  const [showMore, setShowMore] = useState(false)
  function moreInfo(){
    setShowMore(!showMore)
  }

  const news = (headline, description)=> (
      <div className="pt-3 px-2">
        <div className="flex items-center">
          <FiberManualRecordIcon className="scale-50"/>
          <h6 className="font-semibold ml-1">{headline}</h6>
        </div>
        <p className="ml-9 text-sm" >{description}</p>
      </div>
  )
  return (
    <div className="max-[1000px]:hidden py-3 bg-white text-gray-600 h-fit rounded-lg grow min-w-[15rem] max-w-[19rem] sticky top-16">
      <div className=" bg-white">
        <div className="flex justify-between px-4 font-bold text-lg items-center" ><h4>Linkedin News</h4><span><InfoIcon/></span></div>
        {news('Top Newslatter to follow', '1 days ago - 1435 readers')}
        {news('IT mejors profit rice', '3 days ago - 934 readers')}
        {news('IIM classroom gets diverse', '5 days ago - 645 readers')}
        {news('Globle accounting firms go local', '6 days ago - 893 readers')}
        {news('Sugar substituyes in the spotlignt', '9 days ago - 785 readers')}
      </div>
    </div>
  )
}

export default Widgets