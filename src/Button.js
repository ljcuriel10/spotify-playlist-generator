import React from 'react'

const Button = ({text, backgroundColor, color, onCreate}) => {
  return (
    <button onClick={onCreate} className={`rounded px-3 py-1 ${color} ${backgroundColor} fw-bold shadow`}>
        {text}
    </button>
  )
}

export default Button