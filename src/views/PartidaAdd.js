import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Row, Col,  Nav, Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { guardarPartida, modificarPartida, eliminarPartida, selectUNIDADES, modificaPartidas, agregaPartidas, selectGRPPARTIDAS, selectPARTIDAS, ingresarAPU } from '../actions/proyects.actions';
import Button1 from 'devextreme-react/button';
import Swal from 'sweetalert2'
import { SelectBox, TextBox } from 'devextreme-react';
import { Resizable } from "re-resizable";

import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import BuscaUnidad from '../components/BuscaUnidad';
import $ from 'jquery';
import TreeGRPart from '../components/TreeGRPart';
import ApusEdicion from '../components/ApusEdicion';



const tiempoTranscurrido = Date.now();
//const hoy = new Date(tiempoTranscurrido);


/*const selectBoxData = [
    { id: 1, grupo: "Partida" },
    { id: 2, grupo: "Estimada" },
    // ...
];*/



const PartidaAdd = ({itemSelected, setNuevoPres, editando, partidaSeleccionada, setPartidaSeleccionada,partidaeditando, textoB, pagina}) => {

    /*const [ItemSub, setItemSub] = useState({
    });*/


	const [sumasApu, setSumasApu] = useState({S_mo:'0.00',S_mat:'0.00',S_eq:'0.00',S_subc:'0.00',S_subp:'0.00',TotalPU:'0.00'});
	//const [rendimientoMO, setRendimientoMO] = useState('0.00');
	//const [rendimientoEQ, setRendimientoEQ] = useState('0.00');

    
    const [grupoSel, setGrupoSel] = useState('Partida');
    const [grupos, setgrupos] = useState(['Partida', 'Estimada']);
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState('Agregando Partida');
    const Indica=useRef(1);
    const [partidaN, setPartidaN] = useState([]);
    //VARIABLES PARA TAMAÑO DE PANTALLA
    const [titulos, setTitulos] = useState('100%');
    //let history = useHistory();
    //const classes = useStyles();
    const dispatch = useDispatch();
    const proyects = useSelector((state) => state.proyects);
    //const [selecOP, setselecOP] = useState(1);

	//const [width, setWidth] = useState(360);
	const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(window.innerHeight);
	const [open, setOpen] = useState(false);
    const realiza = useRef(0);
    
    const cargado = useRef(false);
    
    const guardado = useRef(false);

    /*const showFn = () => {
        setShow(true)
    }*/

    const [datosApus, setDatosApus] = useState([])


   
    const onValueChangedGrupo = (e) => {
        setGrupoSel(e.value);
      }

  
    function roundN(num, n) {
        return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
    }




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
                setWidth(360);
            }
                
                //setWidth(360);
    
            if (proyects.DataPartida === undefined) return;
            if (!proyects.DataPartida[0]) return;
            console.log('Este es mi codigo obtenido')
            console.log(proyects.CodigoObtenido)
            proyects.DataPartida[0].CodPartidaI=proyects.CodigoObtenido[0]?.Output1;
            setPartidaN({...partidaN,CodPartidaI:proyects.CodigoObtenido[0]?.Output1});
            realiza.current=1;

            /*const NPartida={
                ActualizacionFecha: "2018-12-19T09:30:12.597",
                ActualizacionUsuario: "Erwin",
                CodPartida: proyects.DataPartida[0].CodPartida.substring(0,10)+'99',
                CodPartidaI: "99",
                CodPartidaP: proyects.DataPartida[0].CodPartida.substring(0,10),
                CodPresupuesto: "9999999",
                CodUnidad: proyects.DataPartida[0].CodUnidad,
                CodUnidadPeso: null,
                CodigoAlterno: "",
                CreacionFecha: "2018-12-19T09:30:12.597",
                CreacionUsuario: "Erwin",
                Descripcion: "",
                DescripcionAlterna: "",
                Grupo: 1,
                Jornada: 8,
                Nivel: 6,
                Peso: 0,
                PropioPartida: "99",
                RendimientoEQ: 0.00,
                RendimientoMO: 0.00,
            }*/
          //  setPartidaN(NPartida)
        }
        //alert(proyects.AuxModelo);
    }, [proyects.CodigoObtenido])



    useEffect(() => {
        if (editando===1){
            setTitulo('Editando Partida');
            if (proyects.DataPartida === undefined) return;
            if (!proyects.DataPartida[0]) return;
            //setselecOP(proyects.seleccionado)
            console.log('ESTA ES LA DATA DE MI PARTIDA')
            console.log(proyects.DataPartida)
            proyects.DataPartida[0].CodPartidaP=proyects.DataPartida[0].CodPartida.substring(0,10);
            proyects.DataPartida[0].CodPartidaI=proyects.DataPartida[0].CodPartida.substring(10,12);
            proyects.DataPartida[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
            setPartidaN(proyects.DataPartida[0])
        }
        else{
            if (editando===0){
                setTitulo('Agregando Partida');
                if (proyects.DataPartida === undefined) return;
                if (!proyects.DataPartida[0]) return;
    
                const NPartida={
                    ActualizacionFecha: "2018-12-19T09:30:12.597",
                    ActualizacionUsuario: "Erwin",
                    CodPartida: proyects.DataPartida[0].CodPartida.substring(0,10)+proyects.CodigoObtenido[0]?.Output1,
                    CodPartidaI: proyects.CodigoObtenido[0]?.Output1,
                    CodPartidaP: proyects.DataPartida[0].CodPartida.substring(0,10),
                    CodPresupuesto: "9999999",
                    //CodUnidad: proyects.DataPartida[0].CodUnidad,
                    CodUnidad: '',
                    CodUnidadPeso: null,
                    CodigoAlterno: "",
                    CreacionFecha: "2018-12-19T09:30:12.597",
                    CreacionUsuario: "Erwin",
                    Descripcion: "",
                    DescripcionAlterna: "",
                    Grupo: 1,
                    Jornada: 8,
                    Nivel: 6,
                    Peso: 0,
                    PropioPartida: "99",
                    RendimientoEQ: 0.00,
                    RendimientoMO: 0.00,
                    UnidadSimbolo:'',
                }
                //realiza.current=0;
                if (proyects.CodigoObtenido[0]?.Output1!=='') realiza.current=1;
                else realiza.current=0;
    
                setPartidaN(NPartida)
    

            }
            if (editando===2){
                setTitulo('Duplicando Partida');
                if (proyects.DataPartida === undefined) return;
                if (!proyects.DataPartida[0]) return;
                //setselecOP(proyects.seleccionado)
                console.log('ESTA ES LA DATA DE MI PARTIDA')
                console.log(proyects.DataPartida)
                //proyects.DataPartida[0].CodPartidaP=proyects.DataPartida[0].CodPartida.substring(0,10);
                //proyects.DataPartida[0].CodPartidaI=proyects.DataPartida[0].CodPartida.substring(10,12);
                proyects.DataPartida[0].CodPartida= proyects.DataPartida[0].CodPartida.substring(0,10)+proyects.CodigoObtenido[0]?.Output1;
                proyects.DataPartida[0].CodPartidaI= proyects.CodigoObtenido[0]?.Output1;
                proyects.DataPartida[0].CodPartidaP= proyects.DataPartida[0].CodPartida.substring(0,10);
                proyects.DataPartida[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
                proyects.DataPartida[0].Descripcion=partidaSeleccionada[0].Descripcion + ' Copia';
                setPartidaN(proyects.DataPartida[0])
            }
            
        }
        //alert(proyects.AuxModelo);
    }, [proyects.DataPartida])

    //establecer tamaños y posiciones

   /* useEffect(() => {
        setHistoricos([]);
        setHistoricoSel('');

        if (proyects.seleccionado === 1) {
            //alert('');
            if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]) {
                if (proyects.DatosPresupuesto[0].HistoricoPrecios) {
                    let A_historicos = proyects.DatosPresupuesto[0].HistoricoPrecios.split("|");
                    setHistoricos(A_historicos);
                    //alert(A_historicos[0]);
                    setHistoricoSel(A_historicos[0]);
                    //alert(historicos[0]);
                    //proyects.DatosPresupuesto[0].HistoricoPrecios;
                }
            }
        }
        //if (selecOP === 1) setselecOP(2); else setselecOP(1);

    }, [proyects.DatosPresupuesto])*/

    const handlerOnChange = () => {
    }

    const CambiaDescripcion = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
        setPartidaN( (state) => ({...state,Descripcion:data.value}));
	}
   
    const CambiaDescripcionAlterna = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
        setPartidaN( (state) => ({...state,DescripcionAlterna:data.value}));
	}
   
    

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
        setPartidaN( (state) => ({...state,CodAlterno:data.value}));
	}

    
    const CambiaPeso = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPartidaN( (state) => ({...state,Peso:data.value}));
	}

    const CambiaRendimientoMO = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPartidaN( (state) => ({...state,RendimientoMO:data.value}));
	}

    const CambiaRendimientoEQ = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='0.00';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
        setPartidaN( (state) => ({...state,RendimientoEQ:data.value}));
	}

    const CambiaJornada = (data) => {      
        if (data.event)
        if (data.event.keyCode>=65 && data.event.keyCode<=90){
            if (data.value.length>1)
                data.value=data.value.substring(0,data.value.length-1);
            else
                data.value='';
        }
        if (isNaN(data.value)) {
            data.value='8';
        }

        if (data.value.length>8){
            data.value=data.value.substring(0,8);
        }
       setPartidaN( (state) => ({...state,Jornada:data.value}));
	}

    
    //const onCurrentValueChanged = (e) => {
    //    setPresupuestoN( (state) => ({...state, Fecha:e.value}));
        /*this.setState({
          currentValue: e.value
        });*/
     // }

    const valida = (e) => {
        if (guardado.current) //ACTUALIZAR
        return;

        if (editando===1){
            let grupo=1;
            if(grupoSel==='Partida') grupo='1'; else grupo='2';
            let CodUn1="Null";
            if(partidaN.CodUnidadPeso===null || partidaN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + partidaN.CodUnidadPeso + "'";
            dispatch(modificarPartida(partidaN.CodPartidaP + partidaN.CodPartidaI,partidaN.CodPresupuesto,partidaN.PropioPartida,partidaN.Nivel,partidaN.CodigoAlterno, partidaN.Descripcion, partidaN.DescripcionAlterna, partidaN.CodUnidad, grupo, partidaN.RendimientoMO, partidaN.RendimientoEQ, partidaN.Jornada, CodUn1, partidaN.Peso, ''));
            partidaeditando.Descripcion=partidaN.Descripcion;
            partidaeditando.UnidadPartida=partidaN.UnidadSimbolo;
            dispatch(modificaPartidas(partidaeditando));
            console.log('Estos son los datos de mi partida seleccionada')
            console.log(partidaeditando)
            //alert(guardado)

        }else{
                let grupo=1;
                if(grupoSel==='Partida') grupo='1'; else grupo='2';
                let CodUn1="Null";
                if(partidaN.CodUnidadPeso===null || partidaN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + partidaN.CodUnidadPeso + "'";
                dispatch(guardarPartida(partidaN.CodPartidaP + partidaN.CodPartidaI,proyects.DatosPresupuesto[0]?.CodPresupuesto,'99','6',partidaN.CodigoAlterno, partidaN.Descripcion, partidaN.DescripcionAlterna, partidaN.CodUnidad, grupo, partidaN.RendimientoMO, partidaN.RendimientoEQ, partidaN.Jornada, CodUn1, partidaN.Peso, ''));
                let nuevaeP = {...partidaeditando};
                nuevaeP.CodPartida=partidaN.CodPartidaP + partidaN.CodPartidaI;
                nuevaeP.Descripcion=partidaN.Descripcion;
                nuevaeP.UnidadPartida=partidaN.UnidadSimbolo;
                dispatch(agregaPartidas(nuevaeP));
                alert(editando)
            //GUARDAR LOS DATOS DE LOS APUS
            /*setTimeout(() => {
                for (let i=0;i<datosApus.length;i++)
                {
                    if (datosApus[i].TipoDetalle!=='Subpartida')    
                        dispatch(ingresarAPU(proyects.DatosPresupuesto[0]?.CodPresupuesto, partidaN.CodPartidaP + partidaN.CodPartidaI,'9999999' ,'99',1,datosApus[i].CodInsumo,'999999999999','9999999','99',''));
                    else
                        dispatch(ingresarAPU(proyects.DatosPresupuesto[0].CodPresupuesto, partidaN.CodPartidaP + partidaN.CodPartidaI, '9999999' , '99',2,'999999999999', datosApus[i].CodPartidaR,datosApus[i].CodPresupuestoR,datosApus[i].PropioPartidaR,''));
                }                    
            }, 1000);*/
        }
        /*Swal.fire(
            'Bien!',
            'Los datos de tu Partida  ' + partidaN.Descripcion + ' se almacenaron Correctamente!',
            'success'
          )*/
          guardado.current=true;
          //setNuevoPres(false);
          e.preventDefault();
    }
    

    const guarda = () => {
        if (editando===1){
            guardado.current=true;
            return 1;
        }
        if (partidaN.Descripcion==='' || partidaN.CodUnidad===''){
            Swal.fire('Error!','Debe ingresar los datos de la cabecera ','error');
            return 0;
        }
        
        let grupo=1;
        if(grupoSel==='Partida') grupo='1'; else grupo='2';
        let CodUn1="Null";
        if(partidaN.CodUnidadPeso===null || partidaN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + partidaN.CodUnidadPeso + "'";
        dispatch(guardarPartida(partidaN.CodPartidaP + partidaN.CodPartidaI, proyects.DatosPresupuesto[0]?.CodPresupuesto, '99', '6', partidaN.CodigoAlterno, partidaN.Descripcion, partidaN.DescripcionAlterna, partidaN.CodUnidad, grupo, partidaN.RendimientoMO, partidaN.RendimientoEQ, partidaN.Jornada, CodUn1, partidaN.Peso, ''));
        let nuevaeP = { ...partidaeditando };
        nuevaeP.CodPartida = partidaN.CodPartidaP + partidaN.CodPartidaI;
        nuevaeP.Descripcion = partidaN.Descripcion;
        nuevaeP.UnidadPartida = partidaN.UnidadSimbolo;
        dispatch(agregaPartidas(nuevaeP));
        guardado.current=true;
        return 1;
        
        
        //GUARDAR LOS DATOS DE LOS APUS
        /*setTimeout(() => {
            for (let i = 0; i < datosApus.length; i++) {
                if (datosApus[i].TipoDetalle !== 'Subpartida')
                    dispatch(ingresarAPU(proyects.DatosPresupuesto[0]?.CodPresupuesto, partidaN.CodPartidaP + partidaN.CodPartidaI, '9999999', '99', 1, datosApus[i].CodInsumo, '999999999999', '9999999', '99', ''));
                else
                    dispatch(ingresarAPU(proyects.DatosPresupuesto[0].CodPresupuesto, partidaN.CodPartidaP + partidaN.CodPartidaI, '9999999', '99', 2, '999999999999', datosApus[i].CodPartidaR, datosApus[i].CodPresupuestoR, datosApus[i].PropioPartidaR, ''));
            }
        }, 1000);*/
    }


    const ReglaNumerica = {
        X: /[02-9]/
      };


      useEffect(() => {
		//if (open1===false) return;
		//if (levelPC===1) return;
        
        
		if (!proyects.SumasApuCatalogo)return;
		if (proyects.SumasApuCatalogo===undefined)return;
		if (proyects.SumasApuCatalogo==='')return;
		
		//alert(proyects.SumasApu)
		
        if (editando!==0){
            let Sumas=proyects.SumasApuCatalogo.split('|');
            //console.log('Estos son mis totales de APU')
            //console.log(Sumas)
             //mo
             //materiales
             //equipos
             //subcontratos
             //subpartidas
             //Precio
            const ObjSumas={S_mo:roundN(Sumas[0],2),S_mat:roundN(Sumas[2],2),S_eq:roundN(Sumas[4],2),S_subc:roundN(Sumas[6],2),S_subp:roundN(Sumas[8],2),TotalPU:roundN(Sumas[10],2)};
            setSumasApu(ObjSumas);    
        }else{

            const ObjSumas={S_mo:roundN('0.00',2),S_mat:roundN('0.00',2),S_eq:roundN('0.00',2),S_subc:roundN('0.00',2),S_subp:roundN('0.00',2),TotalPU:roundN('0.00',2)};
            setSumasApu(ObjSumas);    

        }
			//analisis_modificado.current=0;
	}, [proyects.SumasApuCatalogo])






    return (
        <div className="animate__animated animate__fadeIn" style={{ marginLeft: '15px', marginTop: '10px', height: '50%', width: '99%' }}>
            
            <BuscaUnidad tipo="Nuevo" partidaN={partidaN} setPartidaN={setPartidaN} setShow={setShow} show={show} Indica={Indica.current} />
            (<Card id="CardT" className="animate__animated animate__fadeIn" style={{ overflow: 'hidden', marginLeft: '20px', height: '85vh', padding: '15px'/*, background:'blue'*/ }}>
                <Card.Header style={{ fontSize: '1rem', background: '#398bf7', color: 'white', fontWeight: '550' }}>{titulo}
                </Card.Header>
                <Card.Body class="ml-0" >
                    {!editando ? <Resizable
                        className="tree-fixed p-0 d-flex justify-content-between"
                        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                        style={{ background: '#f5f6f8' }}
                        size={{ width: width, height: ($("#CardT").innerHeight()>$("#Form2").innerHeight()) ? $("#CardT").innerHeight() : ($("#Form2").innerHeight() - 20) }}
                        marginLeft="-20px"
                        maxWidth={open ? 500 : 0}
                        minWidth="20px"
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            //setHeight(height + d.height);
                        }}
                    >
                        <Collapse in={open}>
                            <div id="Conte18" className="p-0 h-100 w-100" style={{
                                overflow: 'scroll',
                                background: '#f5f6f8',
                                color: '#333337'
                            }}>
                                <div className="form mt-3">
                                    <div className="input-group" data-widget="">
                                    </div>
                                </div>
                                {realiza.current===1 ? <TreeGRPart
                                    Accion="Presupuesto"
                                    //filtrado={textoB}
                                    levelStart={1}
                                    idProject=""
                                    marginTop="60"
                                    marginLeft='0px'                                    
                                    CodPres={proyects.DataPartida[0].CodPartida}  
                                    setPartidaN={setPartidaN}
                                    
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
                                    else setWidth(360);
                                    if (!open && !cargado.current) //primera vez
                                    {
                                        dispatch(selectGRPPARTIDAS('1','',50,1,'','',"LISTAR_GRP_PARTIDAS"));
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
                    <Form id="Form2" onSubmit={valida} style={{
                        position: 'absolute', left: width + 25, top: '80px',
                                /*background: 'rgba(1,1,1,0.2)',*/ width: $("#CardT").innerWidth() - width - 60
                    }}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: !editando ? 170-width: '170px', top: '-55px' }}
                        ><i class="far fa-save"></i>   Guardar</Button1>
                        <Form.Group as={Row} className="mb-1 mt-3" controlId="formCodigo">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Codigo (*)
                                    </Form.Label>
                            <Col sm={2}>
                                <TextBox
                                    defaultValue={partidaN.CodPartidaP}
                                    value={partidaN.CodPartidaP}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={partidaN.CodPartidaI}
                                    value={partidaN.CodPartidaI}
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
                                    defaultValue={partidaN.CodAlterno}
                                    value={partidaN.CodAlterno}
                                    valueChangeEvent="keyup"
                                    onValueChanged={CambiaCodigoAlterno}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Descripcion (*)
                                    </Form.Label>
                            <Col sm={10}>
                                <TextBox
                                    defaultValue={partidaN.Descripcion}
                                    value={partidaN.Descripcion}
                                    onValueChanged={CambiaDescripcion}
                                >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Descripcion Alterna
                                    </Form.Label>
                            <Col sm={10}>
                                <TextBox
                                    defaultValue={partidaN.DescripcionAlterna}
                                    value={partidaN.DescripcionAlterna}
                                    onValueChanged={CambiaDescripcionAlterna}
                                >
                                </TextBox>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formGeograqfica">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Unidad (*)
                                    </Form.Label>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={partidaN.CodUnidad}
                                    value={partidaN.CodUnidad}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="unidad es requerida" />
                                    </Validator>
                                </TextBox>

                            </Col>
                            <Col sm={4}>
                                <TextBox
                                    defaultValue={partidaN?.DescripcionUnidad}
                                    value={partidaN?.DescripcionUnidad}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Unidad es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={partidaN?.UnidadSimbolo}
                                    value={partidaN?.UnidadSimbolo}
                                    readOnly={true}
                                >
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <Button1 variant="outline-info" height="35px" onClick={() => {
                                    Indica.current = 1;
                                    dispatch(selectUNIDADES('', '20', '1', ''));
                                    setShow(true);
                                    console.log(proyects.DataUnidades)
                                }}>...</Button1>

                                <Button1 variant="outline-info" height="35px" style={{ marginLeft: '10px' }} onClick={() => {
                                    setPartidaN((state) => ({ ...state, CodUnidad: '', DescripcionUnidad: '', UnidadSimbolo: '' }))
                                }}>X</Button1>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-1" controlId="formGeograqfica">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Unidad Peso
                                        </Form.Label>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={partidaN.CodUnidadPeso}
                                    value={partidaN.CodUnidadPeso}
                                    readOnly={true}
                                >
                                </TextBox>

                            </Col>
                            <Col sm={4}>
                                <TextBox
                                    defaultValue={partidaN?.DescripcionUnidadPeso}
                                    value={partidaN?.DescripcionUnidadPeso}
                                    readOnly={true}
                                >
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={partidaN?.UnidadPesoSimbolo}
                                    value={partidaN?.UnidadPesoSimbolo}
                                    readOnly={true}
                                >
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <Button1 variant="outline-info" height="35px" onClick={() => {
                                    Indica.current = 2;
                                    dispatch(selectUNIDADES('', '20', '1', ''));
                                    setShow(true);
                                }}>...</Button1>

                                <Button1 variant="outline-info" height="35px" style={{ marginLeft: '10px' }} onClick={() => {
                                    setPartidaN((state) => ({ ...state, CodUnidadPeso: '', DescripcionUnidadPeso: '', UnidadPesoSimbolo: '' }))
                                }}>X</Button1>
                            </Col>
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Peso
                                        </Form.Label>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={partidaN.Peso}
                                    value={partidaN.Peso}
                                    readOnly={false}
                                    rtlEnabled={true}
                                    onValueChanged={CambiaPeso}
                                >
                                </TextBox>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formMoneda">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Grupo
                                    </Form.Label>
                            <Col sm={2}>
                                <SelectBox items={grupos}
                                    defaultValue={grupoSel}
                                    valueChangeEvent="keyup"
                                    onValueChanged={onValueChangedGrupo}
                                >
                                    <Validator>
                                        <RequiredRule message="Grupo es requerido" />
                                    </Validator>
                                </SelectBox>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Rendimiento MO
                                        </Form.Label>
                            <Col sm={2}>
                                <TextBox
                                    defaultValue={partidaN.RendimientoMO}
                                    value={partidaN.RendimientoMO}
                                    onValueChanged={CambiaRendimientoMO}
                                    rtlEnabled={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>

                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Rendimiento EQ
                                        </Form.Label>
                            <Col sm={2}>
                                <TextBox
                                    defaultValue={partidaN.RendimientoEQ}
                                    value={partidaN.RendimientoEQ}
                                    onValueChanged={CambiaRendimientoEQ}
                                    rtlEnabled={true}
                                //readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Jornada
                                        </Form.Label>
                            <Col sm={2}>
                                <TextBox
                                    defaultValue={partidaN.Jornada}
                                    value={partidaN.Jornada}
                                    onValueChanged={CambiaJornada}
                                    rtlEnabled={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 mt-3 ml-2">
                            <Col sm={12}>
                                <Nav
                                    variant="tabs"
                                    defaultActiveKey="/home"
                                    className="eyelashes"
                                    style={{ height: '100%' }}
                                >
                                    <Nav.Item>
                                        <Nav.Link
                                            href="#"
                                            eventKey="link-1"
                                            active={true}
                                            onClick={() => { }}
                                        >
                                            <i className="fas fa-table" style={{ marginRight: '30px', fontWeight: 'bold' }}></i>
                                            Análisis de Precio Unitario APU
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={12}>

                            <div style={{ height: '25px', width: '100%', background: 'white'/*, boxShadow:'inset 0.8px 0.8px rgba(0,0,0,0.2)'*/, marginBottom: '0px', marginTop:'-10px' }}>
													<spam style={{ position: 'absolute', marginTop: '0px', marginLeft: '5px', fontSize: '0.9rem' }}> Total APU: {sumasApu.TotalPU === undefined || !sumasApu.TotalPU ? '0.00' : sumasApu.TotalPU}</spam>
													{/* <spam style={{ position: 'absolute', marginTop: '12px', marginLeft: '140px', fontSize: '0.65rem' }}> Rendimiento MO:
														<TextBox
															style={{ position: 'relative', marginLeft: '85px', marginTop: '-22px', width: '70px', height: '25px' }}
															//defaultValue={rendimientoMO}
															//value={rendimientoMO}
															rtlEnabled='true'
														//readOnly={true}
														></TextBox>
													</spam>
													<spam style={{ position: 'absolute', marginTop: '12px', marginLeft: '300px', fontSize: '0.65rem' }}> Rendimiento EQ:
														<TextBox
															style={{ position: 'relative', marginLeft: '85px', marginTop: '-22px', width: '70px', height: '25px' }}
															//defaultValue={rendimientoEQ}
															//value={rendimientoEQ}
															rtlEnabled='true'
														//readOnly={true}
														></TextBox> 
														<spam style={{ position: 'absolute', marginLeft: '220px', marginTop: '-22px', width: '1500px', height: '25px', color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem' }}></spam>
                                                    </spam>*/}
												</div>
												<div style={{ height: '25px', width: '100%', background: 'white'/*, boxShadow:'inset 0.8px 0.8px rgba(0,0,0,0.2)'*/, marginBottom: '3px' }}>
													<spam style={{ position: 'absolute', marginTop: '-3px', left: '10px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Mano Obra: {sumasApu.S_mo === undefined || !sumasApu.S_mo ? '0.00' : sumasApu.S_mo}</spam>
													<spam style={{ position: 'absolute', marginTop: '-3px', left: '160px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Material: {sumasApu.S_mat === undefined || !sumasApu.S_mat ? '0.00' : sumasApu.S_mat}</spam>
													<spam style={{ position: 'absolute', marginTop: '-3px', left: '300px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Equipo: {sumasApu.S_eq === undefined || !sumasApu.S_eq ? '0.00' : sumasApu.S_eq}</spam>
													<spam style={{ position: 'absolute', marginTop: '-3px', left: '450px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Subcontrato: {sumasApu.S_subc === undefined || !sumasApu.S_subc ? '0.00' : sumasApu.S_subc}</spam>
													<spam style={{ position: 'absolute', marginTop: '-3px', left: '600px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Subpartidas: {sumasApu.S_subp === undefined || !sumasApu.S_subp ? '0.00' : sumasApu.S_subp}</spam>
												</div>


                                <ApusEdicion                                    
                                    levelStart={1}
                                    idProject={proyects.idCard}
                                    DataApus={editando===0 ? []:proyects.DataApuCatalogo}
                                    editando={editando}
                                    datosApus={datosApus}
                                    setDatosApus={setDatosApus}
                                    sumasApu={sumasApu}
                                    setSumasApu={setSumasApu}   
                                    partidaN={partidaN}
                                    guardado={guardado}
                                    guarda={guarda}
                                />
                            </Col>
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

export default PartidaAdd
