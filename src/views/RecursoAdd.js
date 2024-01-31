import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Row, Col,  Nav, Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { selectUNIDADES, selectGRPRECURSOS, modificarRecurso, modificaRecursos, agregarRecurso, eliminarRecurso, agregaPartidas, agregaRecursos } from '../actions/proyects.actions';
import Button1 from 'devextreme-react/button';
import Swal from 'sweetalert2'
import { SelectBox, TextBox } from 'devextreme-react';
import { Resizable } from "re-resizable";

//import { ViewScreen1 } from './ViewScreen1'

import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import Apus from '../components/Apus';
import BuscaUnidad from '../components/BuscaUnidad';
import $ from 'jquery';
import TreeGRPart from '../components/TreeGRPart';
import ApusEdicion from '../components/ApusEdicion';
import TreeGRRec from '../components/TreeGRRec';



const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);


const selectBoxData = [
    { id: 1, grupo: "Partida" },
    { id: 2, grupo: "Estimada" },
    // ...
];



const RecursoAdd = ({itemSelected, setNuevoPres, editando, partidaSeleccionada, setPartidaSeleccionada,recursoeditando, textoB, pagina, tipoRecurso}) => {

    /*const [ItemSub, setItemSub] = useState({
    });*/
    
    const [grupoSel, setGrupoSel] = useState('Partida');
    const [grupos, setgrupos] = useState(['Partida', 'Estimada']);
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState('Agregando Recurso');
    const Indica=useRef(1);
    const [recursoN, setRecursoN] = useState([]);
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
    
    /*const showFn = () => {
        setShow(true)
    }*/

   
    const onValueChangedGrupo = (e) => {
        setGrupoSel(e.value);
      }

  
    function roundN(num, n) {
        return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
    }




    useEffect(() => {

        //dispatch(eliminarRecurso('0100010002','4',''));
        

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
    
            if (proyects.DataRecurso === undefined) return;
            if (!proyects.DataRecurso[0]) return;
            console.log('Este es mi codigo obtenido')
            //console.log(proyects.CodigoObtenido)
            proyects.DataRecurso[0].CodInsumoI=proyects.CodigoObtenidoRecurso[0]?.Output1;
            setRecursoN({...recursoN,CodInsumoI:proyects.CodigoObtenidoRecurso[0]?.Output1});
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
    }, [proyects.CodigoObtenidoRecurso])



    useEffect(() => {
        if (editando===1){
            //setTitulo('Editando Recurso');
            if (proyects.DataRecurso === undefined) return;
            if (!proyects.DataRecurso[0]) return;
            //setselecOP(proyects.seleccionado)
            console.log('ESTA ES LA DATA DE MI recurso')
            console.log(proyects.DataRecurso)
            
            if (proyects.DataRecurso[0].CodInsumo.length===10){
                proyects.DataRecurso[0].CodInsumoP=proyects.DataRecurso[0].CodInsumo.substring(0,6);
                proyects.DataRecurso[0].CodInsumoI=proyects.DataRecurso[0].CodInsumo.substring(6,10);
                //alert(partidaSeleccionada[0].SimboloUnidad)
                console.log('mi partida seleccionada')
                console.log(partidaSeleccionada)
                proyects.DataRecurso[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
                //partidaSeleccionada.current[0].SimboloUnidad
                setTitulo('Editando Recurso Genérico')
            }
            if (proyects.DataRecurso[0].CodInsumo.length===14){
                proyects.DataRecurso[0].CodInsumoP=proyects.DataRecurso[0].CodInsumo.substring(0,10);
                proyects.DataRecurso[0].CodInsumoI=proyects.DataRecurso[0].CodInsumo.substring(10,14);
                console.log('mi partida seleccionada')
                console.log(partidaSeleccionada)
                //alert(partidaSeleccionada[0].SimboloUnidad)
                proyects.DataRecurso[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
                setTitulo('Editando Recurso Específico')
            }

            //proyects.DataRecurso[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
            setRecursoN(proyects.DataRecurso[0])
        }
        else{
            if (editando===0){
                if (tipoRecurso.current===1)
                    setTitulo('Agregando Recurso Genérico');
                if (tipoRecurso.current===2)
                    setTitulo('Agregando Recurso Específico');

                if (proyects.DataRecurso === undefined) return;
                if (!proyects.DataRecurso[0]) return;
    

                const NRecurso={
                    ActualizacionFecha: "2018-12-19T09:30:12.597",
                    ActualizacionUsuario: "Erwin",
                    CodInsumo: proyects.DataRecurso[0].CodInsumo.substring(0,10)+proyects.CodigoObtenidoRecurso[0]?.Output1,
                    CodInsumoI: proyects.CodigoObtenidoRecurso[0]?.Output1,
                    
                    CodInsumoP: tipoRecurso.current===1 ? proyects.DataRecurso[0].CodInsumo.substring(0,6):proyects.DataRecurso[0].CodInsumo.substring(0,10),
                    
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
                if (proyects.CodigoObtenidoRecurso[0]?.Output1!=='') realiza.current=1;
                else realiza.current=0;
    
                setRecursoN(NRecurso)
    

            }
            if (editando===2){
                setTitulo('Duplicando Recurso');
                if (proyects.DataRecurso === undefined) return;
                if (!proyects.DataRecurso[0]) return;
                //setselecOP(proyects.seleccionado)
                console.log('ESTA ES LA DATA DE MI recurso')
                console.log(proyects.DataRecurso)
                //proyects.DataPartida[0].CodPartidaP=proyects.DataPartida[0].CodPartida.substring(0,10);
                //proyects.DataPartida[0].CodPartidaI=proyects.DataPartida[0].CodPartida.substring(10,12);

                proyects.DataRecurso[0].CodInsumo= proyects.DataRecurso[0].CodInsumo.substring(0,10)+proyects.CodigoObtenidoRecurso[0]?.Output1;
                proyects.DataRecurso[0].CodInsumoI= proyects.CodigoObtenidoRecurso[0]?.Output1;
                proyects.DataRecurso[0].CodInsumoP= tipoRecurso.current===1 ? proyects.DataRecurso[0].CodInsumo.substring(0,6):proyects.DataRecurso[0].CodInsumo.substring(0,10);

                proyects.DataRecurso[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
                //proyects.DataRecurso[0].UnidadSimbolo=partidaSeleccionada[0].Unidad;
                proyects.DataRecurso[0].Descripcion=partidaSeleccionada[0].Descripcion + ' Copia';
                setRecursoN(proyects.DataRecurso[0])
            }
            
        }
        //alert(proyects.AuxModelo);
    }, [proyects.DataRecurso])

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
        setRecursoN( (state) => ({...state,Descripcion:data.value}));
	}
   
    const CambiaDescripcionAlterna = (data) => {
        if (data.value.length>250){
            data.value=data.value.substring(0,250);
        }
        setRecursoN( (state) => ({...state,DescripcionAlterna:data.value}));
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
        setRecursoN( (state) => ({...state,CodAlterno:data.value}));
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

       /* let Cod1 = proyects.treeGrpRecursosN3.filter(item => item.PhantomParentId === recursoN.CodInsumoP);
        console.log(proyects.treeGrpRecursosN3)
        console.log(Cod1)
        alert(recursoN.CodInsumoP)


        return;*/

        if (editando===1){
            //alert('editando')

            /*let grupo=1;
            if(grupoSel==='Partida') grupo='1'; else grupo='2';
            let CodUn1="Null";
            if(recursoN.CodUnidadPeso===null || recursoN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + recursoN.CodUnidadPeso + "'";*/
            
            //guardarPartida = (CodPartida, CodPresupuesto, PropioPartida, Nivel, CodigoAlterno, Descripcion, DescripcionAlterna, CodUnidad, Grupo, RendimientoMO,RendimientoEQ, Jornada, CodUnidadPeso, Peso ,userId) => {
            //dispatch(modificarPartida(partidaN.CodPartidaP + partidaN.CodPartidaI,partidaN.CodPresupuesto,partidaN.PropioPartida,partidaN.Nivel,partidaN.CodigoAlterno, partidaN.Descripcion, partidaN.DescripcionAlterna, partidaN.CodUnidad, grupo, partidaN.RendimientoMO, partidaN.RendimientoEQ, partidaN.Jornada, CodUn1, partidaN.Peso, ''));
            //modificarRecurso = (CodInsumo, CodAlterno, Nivel, Descripcion, CodUnidad, userId) => {
            dispatch(modificarRecurso(recursoN.CodInsumo,recursoN.CodAlterno,4, recursoN.Descripcion,  recursoN.CodUnidad, ''));
            recursoeditando.Descripcion=recursoN.Descripcion;
            recursoeditando.SimboloUnidad=recursoN.UnidadSimbolo;
            dispatch(modificaRecursos(recursoeditando));

            console.log('Estos son los datos de mi partida seleccionada')
            console.log(recursoeditando)

        }else{
            //alert('agregando')
            //if (editando===0){
                /*let grupo=1;
                if(grupoSel==='Partida') grupo='1'; else grupo='2';
                let CodUn1="Null";
                if(recursoN.CodUnidadPeso===null || recursoN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + recursoN.CodUnidadPeso + "'";*/



                if (tipoRecurso.current===1)
                    dispatch(agregarRecurso(recursoN.CodInsumoP+recursoN.CodInsumoI,recursoN.CodAlterno,3, recursoN.Descripcion,  recursoN.CodUnidad, ''));
                if (tipoRecurso.current===2)
                    dispatch(agregarRecurso(recursoN.CodInsumoP+recursoN.CodInsumoI,recursoN.CodAlterno,4, recursoN.Descripcion,  recursoN.CodUnidad, ''));
                //dispatch(agregarRecurso(partidaN.CodPartidaP + partidaN.CodPartidaI,proyects.DatosPresupuesto[0]?.CodPresupuesto,'99','6',partidaN.CodigoAlterno, partidaN.Descripcion, partidaN.DescripcionAlterna, partidaN.CodUnidad, grupo, partidaN.RendimientoMO, partidaN.RendimientoEQ, partidaN.Jornada, CodUn1, partidaN.Peso, ''));
               
                let Cod1 = proyects.treeGrpRecursosN3.find(item => item.CodInsumo === recursoN.CodInsumoP);
                console.log(proyects.treeGrpRecursosN3)
                console.log(Cod1)    
                if (Cod1){
                    //alert('si tiene respuesta')
                    
                    let nuevaeP = {...recursoeditando};
                    nuevaeP.CodInsumo=recursoN.CodInsumoP + recursoN.CodInsumoI;
                    nuevaeP.Descripcion=recursoN.Descripcion;
                    nuevaeP.SimboloUnidad=recursoN.UnidadSimbolo;
                    nuevaeP.InsumoN3=Cod1.CodInsumo + ' ' + Cod1.Descripcion;

                    let Cod2 = proyects.treeGrpRecursosN2.find(item => item.CodInsumo === Cod1.PhantomParentId);
                    if (Cod2){
                        //alert('tiene respuesta cod2')
                        console.log(Cod2)    
                        nuevaeP.InsumoN2=Cod2.CodInsumo + ' ' + Cod2.Descripcion;

                        let Cod3 = proyects.treeGrpRecursos.find(item => item.CodInsumo === Cod2.PhantomParentId);
                        if (Cod3){
                            //alert('tiene respuesta tambien cod3')
                            nuevaeP.InsumoN1=Cod3.CodInsumo + ' ' + Cod3.Descripcion;
                        }
    
                    }


                    console.log(nuevaeP) 
                    //AÑADIR LOS GRUPOS SI EN CASO SE MODIFICAN, SI CAMBIA DE UBICACION SIEMPRE ACTUALIZAR
                    dispatch(agregaRecursos(nuevaeP));
    
                }else
                {
                    //alert('no existe en tabla')
                
                let nuevaeP = {...recursoeditando};
                nuevaeP.CodInsumo=recursoN.CodInsumoP + recursoN.CodInsumoI;
                nuevaeP.Descripcion=recursoN.Descripcion;
                nuevaeP.SimboloUnidad=recursoN.UnidadSimbolo;
                //AÑADIR LOS GRUPOS SI EN CASO SE MODIFICAN, SI CAMBIA DE UBICACION SIEMPRE ACTUALIZAR
                dispatch(agregaRecursos(nuevaeP));
            
            
                }



            if (editando===0){
                setTimeout(() => {
                    //dispatch(selectPARTIDAS(textoB, '20', pagina, ''));    
                }, 1200);
                
                //hacer el dispatch
            }
            
                
            //}
        }

        //alert(presupuestoN.CostoBase1);
        //if (presupuestoN.CostoBase1==='-')
        
        /*let cbase=presupuestoN.CostoBase1.replace(',', '');

        setPresupuestoN( (state) => ({...state, CostoBase1:cbase}));
        alert(presupuestoN.CostoBase1);*/

   /* const Nuevo=[{
            CodPresupuesto: itemSelected+presupuestoN.CodPresupuesto,
            Descripcion: presupuestoN.Descripcion,
            ERPCode: itemSelected+presupuestoN.CodPresupuesto,
            Fila: presupuestoN.Fila,
            Nivel: 3,
            PhantomId: itemSelected+presupuestoN.CodPresupuesto,
            PhantomParentId: itemSelected
        }];  */
        
        //let fecha1=new Date(presupuestoN.Fecha);
      /*  let fecha1=new Date(presupuestoN.Fecha);
        let dia=parseInt(fecha1.getDate(),10);
        let mes=parseInt(fecha1.getMonth(),10)+1;
        let fechaStr = dia + "/" + mes + '/' + fecha1.getFullYear();*/
        //dispatch(guardarGrupo(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, 3, ''));
        //alert(presupuestoN.Fecha);
        //let fechaStr = presupuestoN.Fecha.substring(8,10) + "/" + presupuestoN.Fecha.substring(5,7) + '/' + presupuestoN.Fecha.substring(0,4);
        //dispatch(guardarGrupo(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, 3, ''));
        //dispatch(agregaGrupo1(Nuevo));

       /* setTimeout(() => {            
          //  dispatch(guardarPresupuesto(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, presupuestoN.Plazo,  fechaStr, presupuestoN.Jornada, '0' ,presupuestoN.CostoDirectoBase1,presupuestoN.CostoIndirectoBase1,presupuestoN.CostoBase1,presupuestoN.CostoDirectoOferta1,presupuestoN.CostoIndirectoOferta1,presupuestoN.CostoOferta1,presupuestoN.CodCliente,presupuestoN.CodLugar,presupuestoN.CodMoneda,'',presupuestoN.CodAlterno,presupuestoN.JornadaSemana,presupuestoN.JornadaMes,presupuestoN.JornadaAno,''));                
        }, 1000);*/
        
/*
        const Modificado1=[{
            CodPresupuesto: itemSelected+presupuestoN.CodPresupuesto,
            CodSubpresupuesto: '001',
            Descripcion: presupuestoN.Descripcion,
        }];   */
        
       // dispatch(agregaSub1(Modificado1));
        //console.log('LOS DATOS QUE SE GUARDARIAN')
        //console.log(itemSelected+presupuestoN.CodPresupuesto, presupuestoN.Descripcion, presupuestoN.Plazo,  fechaStr, presupuestoN.Jornada, '0' ,presupuestoN.CostoDirectoBase1,presupuestoN.CostoIndirectoBase1,presupuestoN.CostoBase1,presupuestoN.CostoDirectoOferta1,presupuestoN.CostoIndirectoOferta1,presupuestoN.CostoOferta1,presupuestoN.CodCliente,presupuestoN.CodLugar,presupuestoN.CodMoneda,'',presupuestoN.CodAlterno,presupuestoN.JornadaSemana,presupuestoN.JornadaMes,presupuestoN.JornadaAno,'')
        Swal.fire(
            'Bien!',
            'Los datos de tu Partida  ' + recursoN.Descripcion + ' se almacenaron Correctamente!',
            'success'
          )
          setNuevoPres(false);
        /*notify({
            message: 'You have submitted the form',
            position: {
              my: 'center top',
              at: 'center top'
            }
          }, 'success', 3000);*/
          e.preventDefault();
    }
    
    const ReglaNumerica = {
        X: /[02-9]/
      };

    return (
        <div className="animate__animated animate__fadeIn" style={{ marginLeft: '15px', marginTop: '10px', height: '50%', width: '99%' }}>
            
            <BuscaUnidad tipo="Nuevo" partidaN={recursoN} setPartidaN={setRecursoN} setShow={setShow} show={show} Indica={Indica.current} />
            (<Card id="CardT222" className="animate__animated animate__fadeIn" style={{ overflow: 'scroll', marginLeft: '20px', height: '68vh', padding: '15px'/*, background:'blue'*/ }}>
                <Card.Header style={{ fontSize: '1rem', background: '#398bf7', color: 'white', fontWeight: '550' }}>{titulo}
                </Card.Header>
                <Card.Body class="ml-0" >
                    {!editando ? <Resizable
                        className="tree-fixed p-0 d-flex justify-content-between"
                        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                        style={{ background: '#f5f6f8' }}
                        size={{ width: width, height: ($("#CardT222").innerHeight() - 80) }}
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
                                {realiza.current===1 ? <TreeGRRec
                                    Accion="Presupuesto"
                                    //filtrado={textoB}
                                    levelStart={1}
                                    idProject=""
                                    marginTop="60"
                                    marginLeft='0px'
                                    CodPres={proyects.DataRecurso[0].CodInsumo}  
                                    setRecursoN={setRecursoN}
                                    tipoRecurso={tipoRecurso}
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
                                        dispatch(selectGRPRECURSOS('0','',50,1,'','',"LISTAR_GRP_RECURSOS"));
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
                                /*background: 'rgba(1,1,1,0.2)',*/ width: $("#CardT222").innerWidth() - width 
                    }}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: !editando ? 250-width: '250px', top: '-55px' }}
                        ><i class="far fa-save"></i>   Guardar</Button1>
                        <Form.Group as={Row} className="mb-1 mt-3" controlId="formCodigo">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Codigo (*)
                                    </Form.Label>
                            <Col sm={2}>
                                <TextBox
                                    defaultValue={recursoN.CodInsumoP}
                                    value={recursoN.CodInsumoP}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={recursoN.CodInsumoI}
                                    value={recursoN.CodInsumoI}
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
                                    defaultValue={recursoN.CodAlterno}
                                    value={recursoN.CodAlterno}
                                    valueChangeEvent="keyup"
                                    //onValueChanged={CambiaCodigoAlterno}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                            <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                Descripcion (*)
                                    </Form.Label>
                            <Col sm={10}>
                                <TextBox
                                    defaultValue={recursoN.Descripcion}
                                    value={recursoN.Descripcion}
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
                                    defaultValue={recursoN.DescripcionAlterna}
                                    value={recursoN.DescripcionAlterna}
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
                                    defaultValue={recursoN.CodUnidad}
                                    value={recursoN.CodUnidad}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="unidad es requerida" />
                                    </Validator>
                                </TextBox>

                            </Col>
                            <Col sm={4}>
                                <TextBox
                                    defaultValue={recursoN?.DescripcionUnidad}
                                    value={recursoN?.DescripcionUnidad}
                                    readOnly={true}
                                >
                                    <Validator>
                                        <RequiredRule message="Unidad es requerida" />
                                    </Validator>
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <TextBox
                                    defaultValue={recursoN?.UnidadSimbolo}
                                    value={recursoN?.UnidadSimbolo}
                                    readOnly={true}
                                >
                                </TextBox>
                            </Col>
                            <Col sm={1}>
                                <Button1 variant="outline-info" height="35px" onClick={() => {
                                    Indica.current = 1;
                                    dispatch(selectUNIDADES('', '20', '1', ''));
                                    setShow(true);
                                   // console.log(proyects.DataUnidades)
                                }}>...</Button1>

                                <Button1 variant="outline-info" height="35px" style={{ marginLeft: '10px' }} onClick={() => {
                                    setRecursoN((state) => ({ ...state, CodUnidad: '', DescripcionUnidad: '', UnidadSimbolo: '' }))
                                }}>X</Button1>
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

export default RecursoAdd
