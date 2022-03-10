import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const url = 'http://localhost:5000/api/'
  const [value, setValue] = useState('');
  const [codedString, setCodedString] = useState('');
  const [hashFunction, setHashFunction] = useState('');
  const handleSHA = async ()  => {
    const res = await axios.get(url + `sha256/${value}`)
    setCodedString(res.data)
    setHashFunction('SHA256')
  }
  const handleStreebog = async () => {
    const res = await axios.get(url + `streebog/${value}`)
    setCodedString(res.data)
    setHashFunction('STREEBOG')
  }
  return (
    <div className="App">
      <h4>Hash tool</h4>
      <input value={value} onChange={(e) => setValue(e.target.value)} className='input'/>
      <div className='row'>
        <buton onClick={handleSHA} className="button">
          SHA256
        </buton>
        <buton onClick={handleStreebog} className="button">
          STREEBOG
        </buton>
      </div>
      {Boolean(codedString) && <p>{hashFunction + ': ' + codedString}</p>}
    </div>
  );
}

export default App;
