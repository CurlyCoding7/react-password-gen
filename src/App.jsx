import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNumChecked, setIsNumChecked] = useState(false);
  const [isCharChecked, setIsCharChecked] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);


  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumChecked){
      str = str + "1234567890";
    }
    if(isCharChecked){
      str = str + "!@#$%^&*()";
    }
    for(let i = 0; i < length; i++){
      pass = pass + str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass);
  },[length, isCharChecked, isNumChecked, setPassword]);

  useEffect(() => {
     generatePassword();
  }, [length, isCharChecked, isNumChecked, generatePassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
       <div className='home'>
        <div className="container">
          <div className='input-box'>
            <input type="text" value={password} ref={passwordRef} readOnly/>
            <button onClick={copyToClipboard}>Copy</button>
          </div>

          <div className='param-box'>
            <div className='param'>
            <input type="range" name="password-length" id="password-length" min={8} max={50}  step={1} defaultValue={8} 
            onChange={(e) => setLength(e.target.value)}/>
            <label htmlFor="password-length">Length({length})</label>
            </div>

            <div className='param'>
            <input type="checkbox" name="check" id="number" onChange={(e) => setIsNumChecked(e.target.checked)} />
            <label htmlFor="number">Number</label>
            </div>

            <div className='param'>
            <input type="checkbox" name="check" id="character" onChange={(e) => setIsCharChecked(e.target.checked)} />
            <label htmlFor="character">Character</label>
            </div>

          </div>
        </div>

       </div>
    </>
  )
}

export default App
