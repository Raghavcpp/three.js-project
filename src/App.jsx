import { useState } from 'react';
import './App.css';
import Ball from './component/threejs/ball';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Ball />
    </>
  );
}

export default App;
