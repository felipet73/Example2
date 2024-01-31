import React from 'react'


export default function Overlay({ ready, clicked, setClicked, setReady }) {
  
  //setClicked(true);
  return (
    <>
      <div className={`${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`} style={{zindex:'80', position:'absolute'}}>
        <div onClick={() => ready && setClicked(true)} style={{position:'absolute', cursor: "pointer" , fontSize:'3rem', left:'40vw', top:'-45vh', zIndex:'99999' }}> {!ready ? 'loading' : !clicked ? 'click to continue':''} </div>
      </div>

    </>
  )
}
