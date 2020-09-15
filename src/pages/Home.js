import React, { useRef, useState } from 'react';
import Clip0 from '../clips/Clip0';
import Clip0Espinaco from '../clips/Clip0Espinaco';


const Home = () => {
  const [state, setState] = useState({
    showComponent: false,
  }); 
  function loadClip(){
    setState({
      showComponent: true,
    });
    boton.current.style.display = 'none';
    // boton.current.style.visibility = 'hidden';
  }
  const boton = useRef();
  return (
    <div style={{margin:'0px',padding:'0px'}}>
    {/* <Clip0 /> */}
      <button ref={boton} onClick={loadClip} style={{zIndex:5, display:'block', position:'relative', top:'50vh', left:'50%'}}>Click me!</button>
      <div style={{width:"100%", height:"100vh", display:'block'}}>
      {state.showComponent ?
           <Clip0Espinaco /> :
           null
        }
      </div>
    </div>
  );
}

export default Home;