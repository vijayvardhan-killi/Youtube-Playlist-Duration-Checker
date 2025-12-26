import { useState } from 'react'

const HoverButton = () => {
  const [showMenu , setshowMenu] = useState(false)
  return (
    <div className='flex flex-col justify-center items-center mt-6'>
      <p className='bg-black text-white ' onClick={()=>{setshowMenu(!showMenu)}}>sort</p>
        {showMenu && 
        <div className='bg-white shadow-xl p-4 text-youtube-red'>
            <form action="" className='flex flex-col gap-2'>
            Default Order<input  type="radio" name="sort" id="sort" className='' />
            A-Z    <input type="radio" name="sort" id="sort" className='' />
                <input type="radio" name="sort" id="sort" className='' />
            </form>
        </div>}
    </div>
  )
}

export default HoverButton
