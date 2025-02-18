import React from 'react'

const VideosCard = ({title,thumbnail,duration}) => {
    const obj = {
        "title": "Team Speed vs. Team Kai @ Super Bowl LIX Flag Football Game on YouTube - Watch LIVE February 8",
        "duration": "1h 46m 51s"
      }
  return (
    <div>
      <div className='flex bg-youtube-dark-gray w-[70%] justify-between   mx-auto mt-5 items-center rounded-lg px-6 py-4  flex-col md:flex-row '>
            <div className='bg-youtube-dark-gray   flex  rounded-md justify-evenly items-center text-wrap flex-col  md:flex-row pt-2'>
                <div className='md:min-w-[150px]  md:w-[150px] md:h-[80px] h-[8rem] min-w-[14rem]  bg-gradient-to-r from-youtube-border-gray to-blue-500 rounded-md' >
                  <img src={thumbnail} alt={title} />
                </div>
                <p className='md:text-sm mx-2 text-white p-2 md:text-center'>{title}</p>
            </div>
            <p className='text-xl  px-3 font-bold text-nowrap text-youtube-white'>{duration}</p>
      </div>
    </div>
  )
}

export default VideosCard