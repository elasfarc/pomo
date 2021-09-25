import React from "react"

const Timer = () => {
  const isRunning = false
  return (  
  <div className='timer'>
    <div className='timer__display'>
      <span>25</span>
      <span>:</span>
      <span>00</span>
    </div>
    <div className='timer__control'>
      <button>{isRunning ? 'PAUSE' : 'START'}</button>
      <button>RESET</button>
    </div>
  </div>
  )
}

export {Timer}