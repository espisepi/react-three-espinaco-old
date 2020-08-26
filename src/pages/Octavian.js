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
      <Clip1 />
    </div>
  );
}

export default Octavian;