import './App.css';
import { useState } from 'react'; 
import { pow } from './pow';
import axios from 'axios';

function App() {
  const [zeros, setZeros] = useState(0);
  const url = 'http://localhost:5000/api/'
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [strings, setStrings] = useState([]);
  const [hashes, setHashes] = useState([]);
  const handleFind = async () => {
    const start = new Date().getTime();
    setLoading(true);
    setResult('')
    setStrings([])
    setHashes([])
    try {
      const string1 = (await axios.get(url + `string`)).data
      setStrings((prev) => [...prev, string1])
      const { nonce: nonce1, hashed: hashed1 } = await pow(string1, zeros)
      setHashes((prev) => [...prev, hashed1])
      await axios.post(url + `check`, {
        string: string1,
        nonce: nonce1,
        zeros,
      })
      const string2 = (await axios.get(url + `string`)).data
      setStrings((prev) => [...prev, string2])
      const { nonce: nonce2, hashed: hashed2 } = await pow(string2, zeros)
      setHashes((prev) => [...prev, hashed2])
      await axios.post(url + `check`, {
        string: string2,
        nonce: nonce2,
        zeros,
      })
      const string3 = (await axios.get(url + `string`)).data
      setStrings((prev) => [...prev, string3])
      const { nonce: nonce3, hashed: hashed3 } = await pow(string3, zeros)
      setHashes((prev) => [...prev, hashed3])
      await axios.post(url + `check`, {
        string: string3,
        nonce: nonce3,
        zeros,
      })
    } catch (e) {
      console.log(e)
      setLoading(false)
      setResult('Error')
    }
    const end = new Date().getTime();
    setResult((end - start) / 3);
    setLoading(false);
  }

  return (
    <div className="App">
      <h4>PoW imitator</h4>
      <label>Zeros:
        <input className='input' type="number" onChange={(e) => setZeros(parseInt(e.target.value))} value={zeros} />
      </label>
      {loading && <p>Loading...</p>}
      {strings.map((s, index) => (
        <div key={s} className='box'>
          <span><b>original:&nbsp;</b>{s}</span>
          <span><b>hashed:&nbsp;</b>{
            hashes.length < index + 1 ? '...' : hashes[index]
          }</span>
        </div>
      ))}
      {Boolean(result) && <p>result: {result}ms per message</p>}
      {!loading && <button onClick={handleFind} className='button'>
        Send
      </button>}
    </div>
  );
}

export default App;
