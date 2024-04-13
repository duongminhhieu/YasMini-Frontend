import { useState } from 'react'

import './App.css'
import { Button } from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

    {/* Count text */}
    <p>
      {count}
    </p>
    <Button className='btn' type='primary' onClick={() => setCount((count) => count + 1)}>Increase</Button>
  </div>
  )
}

export default App
