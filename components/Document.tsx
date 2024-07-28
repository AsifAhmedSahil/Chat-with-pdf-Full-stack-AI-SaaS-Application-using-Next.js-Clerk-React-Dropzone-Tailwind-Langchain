import React from 'react'
import PlaceholderButton from './PlaceholderButton'

const Document = () => {
  return (
    <div className='flex flex-wrap justify-center lg:justify-start p-5 bg-gray-100 rounded-sm gap-5 max-w-7xl mx-auto'>
        {/* map through the documents */}

        {/* placeholder button */}
        <PlaceholderButton/>
    </div>
  )
}

export default Document