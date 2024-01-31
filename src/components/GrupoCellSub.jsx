import React from 'react';

export default function GrupoCellSub(options) {
  const employee = options.data;
 /* console.log(' Esta es la da en Employeeee');
  console.log(options.data);*/
  if (!employee) {
    return <span className="name">not assigned</span>;
  }

  return (
    <React.Fragment>
      <div style={{ padding:'2px', display:'flex', alignItems:'center'}}>
      { employee.PhantomParentId === null ?
      <div className="img" style={{  backgroundImage: `url('img/manager.png')` }} />
      : <div className="img" style={{  backgroundSize:'25px', backgroundImage: `url('img/apu/subp.png')` }} />
      }
       <span style={{ padding:'7px', fontSize:'0.7rem', display:'flex', alignItems:'center' }} className="name">{options.displayValue}</span>
      </div>
    </React.Fragment>
  );
}
