import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [special, setSpecial] = useState(false)
  const [password, setPassword] = useState("")
  let [copyTxt, setCopyTxt] = useState("copy")

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (special) str += "@#$%&*-_"


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
      
    }

    setPassword(pass);

  } , [length, numAllow, special, setPassword])

  const copy2Clip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(password);
    setCopyTxt("copied")
  }, [password, copyTxt])

  useEffect(() => {passwordGenerator()}, [length, numAllow, special])

  useEffect(() => {setCopyTxt("copy")}, [length, numAllow, special])



  return (
    <>
      <div className='w-full max-w-lg justify-center center bg-gray-700 h-auto p-5 mx-auto my-4 text-white text-center text-xl' >
        Password Generator 
        <div className='mx-auto my-2 rounded-l-3xl w-full'>
          <input type="text" className='p-1 w-3/4 rounded-l-xl text-black' placeholder='password' value={password} readOnly ref={passwordRef} />
          <button onClick={copy2Clip} className=' py-1 px-2 rounded-r-xl border-white bg-teal-400 '> {copyTxt} </button>
        </div>
        <div className='flex text-sm'>
          <div className='flex items-center gap-x-1 mx-2'>
            <input type="range" min={6} max={100} value={length} onChange={(e) => {setLength(e.target.value)}} />
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 mx-2 '>
            <input type="checkbox" defaultChecked={numAllow} onChange={() => {setNumAllow((prev) => !prev)}} />
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 mx-2 '>
            <input type="checkbox" defaultChecked={special} onChange={() => {setSpecial((prev) => !prev)}} />
            <label >Special characters</label>
          </div>
        </div>



      </div>
    </>
  )
}

export default App
