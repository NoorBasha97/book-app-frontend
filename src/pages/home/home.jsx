import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommended from './Recommended'
import News from './News'

const Home = () => {
  return (
    <div className='mx-17 my-1'>
        <Banner/>
        <TopSellers/>
        <Recommended/>
        <News/>
    </div>
  )
}

export default Home