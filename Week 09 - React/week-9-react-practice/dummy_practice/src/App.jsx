import {useState, useEffect} from 'react';



function App(){

  console.log('component is rerendered');
  // setInterval(Incrase,1000);
  const [count,setCount] = useState(0);

  console.log("mount");

  useEffect( ()=>{
    console.log('useEffect is executed');
  },[count])

  // useEffect(function(){
  //   setInterval(function(){
  //     setCount(count => count+1);
  //   },1000)
  // },[])


  return(
    <>
      <button onClick={()=>setCount(count+1)}>Count {count}</button>
    </>
  );



}


export default App;