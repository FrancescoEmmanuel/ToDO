import React from 'react'

function Title({children,...rest}) {
  return (
    <p className="relative inline-block w-full text-[40px] font-bold uppercase text-center text-[color:var(--black-1)] mt-8 mb-6 mx-auto my-0;" {...rest}>
    {children}
  </p>
  )
}

export default Title