import React from 'react'

const Input = ({value , onChange ,loading , handleSearch ,error}) => {
  return (
    <>
    <div className='p-4 flex flex-col gap-3 md:items-center mt-4'>
      <h1 className='font- text-2xl md:text-4xl tracking-wide'>Caluculate Duration</h1>
      <p className='text-gray-600 mb-3'>Enter YouTube video URLs to calculate total duration</p>
      <label htmlFor='' >Video URL</label>
      <textarea type="text" placeholder='Enter Playlist URL' className='p-2 border-2 md:w-[80%] h-[10rem] resize-none  rounded-md  focus:outline-none focus:ring-2 ring-gray-200 focus:border-2 shadow-xl' value={value} onChange={onChange}></textarea>
      <button className='bg-youtube-red text-youtube-white p-3 rounded-md hover:bg-youtube-light-red mt-3 transition-all ease-in-out delay-250' onClick={handleSearch}>{loading?"loading":"Calculate Duration"}<span></span></button>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
    </>
  )
}

export default Input
