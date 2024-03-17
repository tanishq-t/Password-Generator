import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {

  let [length,setlength] = useState(6);
  let [numberAllowed,setnumberAllowed] = useState(false);
  let [charAllowed,setcharAllowed] = useState(false);
  let [password,setPassword] = useState("");

  const passref = useRef(null)


  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllowed) str+="~`!@#$%^&*()_-+=}{][\|:;'<>.?/"
    if(numberAllowed) str+="0123456789"
    for(let i=0;i<length;i++){
      let char = str[Math.floor(Math.random()*str.length +1)];
      pass+=char;
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{generatePassword()},[length,numberAllowed,charAllowed,generatePassword])


  const copyPassword = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <h1 className='heading'>Random Password Generator</h1>
      <div className='container'>
        <div className='up-con'>
          <input type='text' value={password} readOnly className='pass-box' placeholder='Password' ref={passref}></input>
          <button className='copy-btn' onClick={copyPassword}>Copy</button>
        </div>
        <div className='down-con'>
          <input type="range" min={6} max={100} name='length' className='length' onChange={(e)=> {setlength(e.target.value)} }></input>
          <label htmlFor='length'>Length: {length}</label>      
          <label htmlFor='char'>Characters: </label>
          <input type='checkbox' defaultChecked={charAllowed} name='char' className='radio' onChange={()=>{setcharAllowed((prev) => !prev)}}></input>          
          <label htmlFor='num' >Numbers: </label>
          <input type='checkbox' defaultChecked={numberAllowed} name='num' className='radio' onChange={()=>{setnumberAllowed((prev) => !prev)}}></input>
        </div>        
      </div>
    </>
  )
}

export default App
