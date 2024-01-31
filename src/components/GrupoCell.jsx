import React from 'react';

export default function GrupoCell(options) {
  const employee = options.data;
 /* console.log(' Esta es la da en Employeeee');
  console.log(options.data);*/
  if (!employee) {
    return <span className="name">not assigned</span>;
  }

  return (
    <React.Fragment>
      {employee.Tipo !== 'Version' ?

      <div style={{ padding:'2px', display:'flex', alignItems:'center'}}>
      { employee.Tipo === 'Proyecto' ?
      <div className="img" style={{  backgroundImage: `url('img/project1.png')` }} />
      : employee.Tipo === 'Folder' ?
      <div className="img" style={{  backgroundSize:'25px', backgroundImage: `url('img/project.png')` }} />
      : employee.Tipo === 'Modelo' ?
      <div className="img" style={{  backgroundSize:'25px', backgroundImage: `url('img/subproject.png')` }} />:''
      }
       <span style={{  fontSize:'0.6rem', display:'flex', alignItems:'center' }} className="name">{employee.Descripcion}</span>
      </div>
      :
      <div style={{ padding:'0px', height:'6px'}}></div>}
    </React.Fragment>
  );
}
