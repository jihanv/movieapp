import React from 'react'
import Search from './components/Search'

const App = () => {
  return (
    <div>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="/movieapp/hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span></h1>
        </header>
        <Search />
      </div>
    </div>
  )
}

export default App