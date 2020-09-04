import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import Clip1 from '../clips/Clip1';

const Octavian = () => {
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
      <button ref={boton} onClick={loadClip} style={{zIndex:5, display:'block', position:'relative', top:'50vh', left:'50%'}}>Click me!</button>
      <div style={{width:"100%", height:"100vh", display:'block'}}>
      {state.showComponent ?
            <Clip1 /> :
           null
        }
      </div> 
    </div>
  );
}

export default Octavian;