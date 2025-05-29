import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="/movieapp/hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span></h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  )
}

export default App