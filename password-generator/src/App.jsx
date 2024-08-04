import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [number , setNumber] = useState(false);
  const [char , setChar] = useState(false)

  let inputBoxRef = useRef(null);

  const generatePassword = useCallback(() => {
    
      let pass = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      if(number) str += "1234567890"
      if(char) str += "!/?$%&*@+="
  
      for(let i = 1 ; i <= length ; i++){
        let val = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(val)
      }
      setPassword(pass)
  
    
  }, [length,number,char,setPassword])

  function copyPassword(){
    inputBoxRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    generatePassword()
  },[length, number, char, generatePassword])
  return (
    <>
      <div className="bg-black w-full h-screen  flex justify-center items-center">
        <div className="bg-gray-700 text-orange-500 px-3 py-4 text-center w-2/4 ">
          <h1 className=" text-2xl font-serif font-bold">Password Generator</h1>
          <div className=" h-12 mx-2 my-4">
            <input
              type="text"
              value={password}
              placeholder="Password Store"
              className=" h-full outline-none w-96 text-black px-5"
              readOnly
              ref={inputBoxRef}
            />
            <button 
              onClick={copyPassword}
              className="outline-none h-full w-24 bg-blue-700 text-white font-bold hover:bg-blue-800">
              Copy
            </button>
          </div>
          <div className=" h-12 mx-2 my-4 flex justify-center items-center text-lg gap-x-5">
            <div className="flex justify-center items-center gap-x-1">
              <input type="range"  min={6} max={100} value={length}
                className=" cursor-pointer px-5"
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex justify-center items-center gap-x-1">
              <input type="checkbox" id="number" defaultChecked={number} onChange={() => setNumber((prev) => !prev)} />
              <label>Numbers</label>
            </div>
            <div className="flex justify-center items-center gap-x-1">
              <input type="checkbox" id="character" defaultChecked={char} onChange={() => setChar((prev) => !prev)} />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
