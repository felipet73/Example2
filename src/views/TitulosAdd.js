import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Row, Col,  Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { agregaTitulos, guardarTitulo, modificarTitulo, modificaTitulos, selectGRPTITULOS } from '../actions/proyects.actions';
import Button1 from 'devextreme-react/button';
import Swal from 'sweetalert2'
import { TextBox } from 'devextreme-react';
import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import $ from 'jquery';
import { Resizable } from "re-resizable";
import TreeCP from '../components/TreeCP';
import TreeGRTit from '../components/TreeGRTit';

const TitulosAdd = ({itemSelected, setNuevoTitulo, editando, partidaSeleccionada, setPartidaSeleccionada,tituloeditando}) => {

    const [titulo, setTitulo] = useState('Agregando Título');
    const [tituloN, setTituloN] = useState([]);
    const [titulos, setTitulos] = useState('100%');
    const dispatch = useDispatch();
    const proyects = useSelector((state) => state.proyects);

	const [width, setWidth] = useState(260);
	//const [height, setHeight] = useState(window.innerHeight);
	const [open, setOpen] = useState(false);
    const realiza = useRef(0);
    const cargado = useRef(false);

    useEffect(() => {
        if (editando===1){
            setWidth(30);
            /*if (proyects.DataPartida === undefined) return;
            if (!proyects.DataPartida[0]) return;
            //setselecOP(proyects.seleccionado)
            console.log('ESTA ES LA DATA DE MI PARTIDA')
            console.log(proyects.DataPartida)
            proyects.DataPartida[0].CodPartidaI=proyects.DataPartida[0].CodPartida.substring(10,12);
            setPartidaN(proyects.DataPartida[0])*/
        }
        else{
            if (editando===2)
                setWidth(30);
            if (editando===0 && !cargado.current)
                setWidth(30);
            if (editando===0 && cargado.current){
                setWidth(260);
            }
                
            if (proyects.DataTitulo === undefined) return;            
            if (!proyects.DataTitulo[0]) return;
            if (proyects.CodigoObtenidoTitulo===undefined) return;
            if (!proyects.CodigoObtenidoTitulo[0]) return;
            console.log('Este es mi codigo obtenido')
            console.log(proyects.CodigoObtenidoTitulo)
            proyects.DataTitulo[0].CodTituloI=proyects.CodigoObtenidoTitulo[0]?.Output1;
            setTituloN({...tituloN,CodTituloI:proyects.CodigoObtenidoTitulo[0]?.Output1});
            realiza.current=1;
        }
    }, [proyects.CodigoObtenidoTitulo])



    useEffect(() => {
        if (editando===1){
            setTitulo('Editando Título');
            if (proyects.DataTitulo === undefined) return;
            if (!proyects.DataTitulo[0]) return;
            console.log('ESTA ES LA DATA DE MI titulo')
            console.log(proyects.DataTitulo)
            proyects.DataTitulo[0].CodTituloP=proyects.DataTitulo[0].CodTitulo.substring(0,4);
            proyects.DataTitulo[0].CodTituloI=proyects.DataTitulo[0].CodTitulo.substring(4,7);
            setTituloN(proyects.DataTitulo[0])
        }
        else{
            if (editando===0){
                setTitulo('Agregando Título');
                if (proyects.DataTitulo === undefined) return;
                if (!proyects.DataTitulo[0]) return;
                if (!proyects.CodigoObtenidoTitulo) return;
                if (!proyects.CodigoObtenidoTitulo[0]) return;
                const NTitulo={
                    ActualizacionFecha: "2018-12-19T09:30:12.597",
                    ActualizacionUsuario: "Erwin",
                    CodTitulo: proyects.DataTitulo[0].CodTitulo.substring(0,4)+proyects.CodigoObtenido[0]?.Output1,
                    CodTituloI: proyects.CodigoObtenidoTitulo[0]?.Output1,
                    CodTituloP: proyects.DataTitulo[0].CodTitulo.substring(0,4),
                    CodigoAlterno: "",
                    CreacionFecha: "2018-12-19T09:30:12.597",
                    CreacionUsuario: "Erwin",
                    Descripcion: "",
                    Grupo: 1,
                    Nivel: 3,
                }
                setTituloN(NTitulo)
            }
            if (editando===2){
                setTitulo('Duplicando Título');
                if (proyects.DataTitulo === undefined) return;
                if (!proyects.DataTitulo[0]) return;
                //setselecOP(proyects.seleccionado)
                console.log('ESTA ES LA DATA DE MI titulo')
                console.log(proyects.DataTitulo)
                //proyects.DataPartida[0].CodPartidaP=proyects.DataPartida[0].CodPartida.substring(0,10);
                //proyects.DataPartida[0].CodPartidaI=proyects.DataPartida[0].CodPartida.substring(10,12);
                proyects.DataTitulo[0].CodTitulo = proyects.DataTitulo[0]?.CodTitulo.substring(0,4)+proyects.CodigoObtenidoTitulo[0]?.Output1;
                proyects.DataTitulo[0].CodTituloI= proyects.CodigoObtenidoTitulo[0]?.Output1;
                proyects.DataTitulo[0].CodTituloP= proyects.DataTitulo[0].CodTitulo.substring(0,4);
                //proyects.DataPartida[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
                proyects.DataTitulo[0].Descripcion=partidaSeleccionada[0].Descripcion + ' Copia';
                setTituloN(proyects.DataTitulo[0])
            }
        }
    }, [proyects.DataTitulo])


    const handlerOnChange = () => {
    }

    const CambiaDescripcion = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
       setTituloN( (state) => ({...state,Descripcion:data.value}));
	}
   
    /*const CambiaDescripcionAlterna = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
        //setPartidaN( (state) => ({...state,DescripcionAlterna:data.value}));
	}*/
   
    

    const CambiaCodigoAlterno = (data) => {
		//console.log(data)        
        //alert(data.event.keyCode)
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='';
        }
        if (data.value.length>20){
            data.value=data.value.substring(0,20);
        }
        //partidaN.CodAlterno
        setTituloN( (state) => ({...state,CodAlterno:data.value}));
	}

    
    
    
  

    

    

    //const onCurrentValueChanged = (e) => {
    //    setPresupuestoN( (state) => ({...state, Fecha:e.value}));
        /*this.setState({
          currentValue: e.value
        });*/
     // }

    const valida = (e) => {
        //alert(partidaN.CodPartidaP + partidaN.CodPartidaI)
        //alert(grupoSel)
        if (editando===1){
            //alert('editando')
            dispatch(modificarTitulo(tituloN.CodTituloP + tituloN.CodTituloI, '3', tituloN.CodigoAlterno, tituloN.Descripcion, ''));
            tituloeditando.Descripcion=tituloN.Descripcion;
            //partidaeditando.UnidadPartida=partidaN.UnidadSimbolo;
            dispatch(modificaTitulos(tituloeditando));
            console.log('Estos son los datos de mi titulo seleccionadoo')
            console.log(tituloeditando)


        }else{
            //alert('agregando')
            
            //if (editando===0){
                //let grupo=1;
                //if(grupoSel==='Partida') grupo='1'; else grupo='2';
                //let CodUn1="Null";
                //if(tituloN.CodUnidadPeso===null || partidaN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + partidaN.CodUnidadPeso + "'";
                dispatch(guardarTitulo(tituloN.CodTituloP + tituloN.CodTituloI, '3', tituloN.CodigoAlterno, tituloN.Descripcion, ''));
                let nuevaeP = {...tituloeditando};
                nuevaeP.CodTitulo=tituloN.CodTituloP + tituloN.CodTituloI;
                nuevaeP.Descripcion=tituloN.Descripcion;
               
               
                //nuevaeP.UnidadPartida=partidaN.UnidadSimbolo;
                dispatch(agregaTitulos(nuevaeP));
            //}
            


        }


  
          Swal.fire(
            'Bien!',
            'Los datos de tu Titulo  ' + tituloN.Descripcion + ' se almacenaron Correctamente!',
            'success'
          )
          setNuevoTitulo(false);
          e.preventDefault();
    }
    
    const ReglaNumerica = {
        X: /[02-9]/
      };

    return (
        <div className="animate__animated animate__fadeIn" style={{ marginLeft: '15px', marginTop: '10px', height: '50%', width: '99%' }}>
            
            
            
            
            (<Card id="CardT1" className="animate__animated animate__fadeIn" style={{ overflow: 'scroll', marginLeft: '20px', height: editando===0 ? '68vh':'30vh', padding: '15px' }}>
                <Card.Header style={{ fontSize: '1rem', background: '#398bf7', color: 'white', fontWeight: '550' }}>{titulo}
                </Card.Header>
                <Card.Body class="ml-0">

                {!editando ? <Resizable
                        className="tree-fixed p-0 d-flex justify-content-between"
                        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                        style={{ background: '#f5f6f8' }}
                        size={{ width: width, height: ($("#CardT1").innerHeight()>$("#Form22").innerHeight()) ? $("#CardT1").innerHeight() -80 : ($("#Form22").innerHeight() - 80) }}
                        marginLeft="-20px"
                        maxWidth={open ? 600 : 0}
                        minWidth="20px"
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            //setHeight(height + d.height);
                        }}
                    >
                        <Collapse in={open}>
                            <div id="Conte188" className="p-2 h-100 w-100" style={{
                                overflow: 'scroll',
                                background: '#f5f6f8',
                                color: '#333337'
                            }}>
                                <div className="form mt-3">
                                    <div className="input-group" data-widget="">
                                    </div>
                                </div>
                                {realiza.current===1 ? <TreeGRTit
                                    Accion="Presupuesto"
                                    //filtrado={textoB}
                                    levelStart={1}
                                    idProject=""
                                    marginTop="60"
                                    marginLeft='0px'
                                    CodPres={proyects.DataTitulo[0].CodTitulo}  
                                    setTituloN={setTituloN}
                                    
                                //estado={estado}
                                //setEstado={setEstado}
                                />:''}
                            </div>
                        </Collapse>
                        <div
                            className="bara-cerrar d-flex align-items-center barras"
                            style={{
                                width: '16px',
                                height: "100%",
                                background: '#f5f6f8',
                                marginLeft: 5,
                                borderStyle: 'none solid none none',
                                borderColor: '#c6c7d0',
                                borderWidth: '0.5px',
                                zIndex: '1',
                            }}
                        >
                            <div
                                style={{
                                    cursor: "pointer", width: '30px',
                                    background: 'white',
                                    zIndex: '1'
                                }}
                                className="h-0 w-100 "
                                onClick={() => {
                                    setOpen(!open);
                                    if (open) setWidth(25);
                                    else setWidth(260);
                                    if (!open && !cargado.current) //primera vez
                                    {
                                        //dispatch(selectGRPPARTIDAS('1','',50,1,'','',"LISTAR_GRP_PARTIDAS"));
                                        dispatch(selectGRPTITULOS('1','',50,1,'','',"LISTAR_GRP_TITULOS"));
                                        cargado.current=true;
                                    }

                                }}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                style={{ background: 'transparent', zIndex: '1', width: '80px' }}
                            >
                                {open ? (
                                    <ion-icon name="chevron-back-outline" style={{ cursor: "pointer", color: 'black', borderColor: '#c6c7d0', marginLeft: '4px', background: 'white', zIndex: '2', width: '20px', height: '20px', borderRadius: '20px', borderStyle: 'solid', borderWidth: '0.5px', }}></ion-icon>
                                ) : (
                                    <ion-icon name="chevron-forward-outline" style={{ cursor: "pointer", color: 'black', borderColor: '#c6c7d0', marginLeft: '4px', background: 'white', zIndex: '2', width: '20px', height: '20px', borderRadius: '20px', borderStyle: 'solid', borderWidth: '0.5px' }}></ion-icon>
                                )}
                            </div>
                        </div>
                    </Resizable> : ''}




                    <Form id="Form22" onSubmit={valida} style={{
                        position: 'absolute', left: width + 25, top: '80px',
                                /*background: 'rgba(1,1,1,0.2)',*/ width: $("#CardT1").innerWidth() - width - 60
                    }}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: !editando ? 170-width: '170px', top: '-55px' }}
                        ><i class="far fa-save"></i>   Guardar</Button1>
                        <Form.Group as={Row} className="mb-1 mt-3" controlId="formCodigo">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Codigo
                            </Form.Label>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={tituloN.CodTituloP}
                                    value={tituloN.CodTituloP}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={tituloN.CodTituloI}
                                    value={tituloN.CodTituloI}
                                    readOnly={true}
                                    valueChangeEvent="keyup"
                                >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                </TextBox>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formAlterno">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Alterno
                            </Form.Label>
                            <Col sm={2}>
                                <TextBox
                                    defaultValue={tituloN.CodAlterno}
                                    value={tituloN.CodAlterno}
                                    valueChangeEvent="keyup"
                                    onValueChanged={CambiaCodigoAlterno}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Descripcion
                            </Form.Label>
                            <Col sm={10}>
                                <TextBox
                                    defaultValue={tituloN.Descripcion}
                                    value={tituloN.Descripcion}
                                    onValueChanged={CambiaDescripcion}
                                >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mt-3">
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <ValidationSummary id="summary" style={{ position: 'relative', marginLeft: '45%' }}></ValidationSummary>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>)
        </div>
    )
}

export default TitulosAdd
