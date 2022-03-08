import React from 'react';
import photo from './grailify-29xRX4mBNWA-unsplash.jpg'

const RandomPhoto = () => {
  return (
    <div className='absolute object-cover h-[230px] top-[80px] w-full'>
      <img src={photo} alt='' className='w-full xs:w-[1000px] h-96 object-cover'/>
    </div>
  );
};

export default RandomPhoto;
