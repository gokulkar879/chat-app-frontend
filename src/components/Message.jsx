import React, { useEffect } from 'react'

function Message({id, recieverId, text, imageUrl}) {

  return (
    <p className={`message ${id == 2 ? 'left' : 'right'}`}>{(!imageUrl ? text : <img src={imageUrl} className='msg-img'></img>)}</p>
  )
}

export default Message