import React, { useState } from 'react'
import MainAppBar from '../component/MainAppBar';

function Main() {
  const [headerText, setHeaderText] = useState("카드")
  return (
    <div className="App">
      <MainAppBar headerText={headerText} />
      <div className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  )
}

export default Main