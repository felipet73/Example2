import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Row, Col,  Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { guardarPartida, modificarPartida, eliminarPartida, selectUNIDADES, modificaPartidas, agregaPartidas } from '../actions/proyects.actions';
import Button1 from 'devextreme-react/button';
import Swal from 'sweetalert2'
import { SelectBox, TextBox } from 'devextreme-react';

//import { ViewScreen1 } from './ViewScreen1'

import ValidationSummary from 'devextreme-react/validation-summary';
import {
  Validator,
  RequiredRule,
} from 'devextreme-react/validator';
import Apus from '../components/Apus';
import BuscaUnidad from '../components/BuscaUnidad';

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

const selectBoxData = [
    { id: 1, grupo: "Partida" },
    { id: 2, grupo: "Estimada" },
    // ...
];

const PartidaAdd = ({itemSelected, setNuevoPres, editando, partidaSeleccionada, setPartidaSeleccionada,partidaeditando}) => {

    /*const [ItemSub, setItemSub] = useState({


    });*/

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
        if (editando===1){
            /*if (proyects.DataPartida === undefined) return;
            if (!proyects.DataPartida[0]) return;
            //setselecOP(proyects.seleccionado)
            console.log('ESTA ES LA DATA DE MI PARTIDA')
            console.log(proyects.DataPartida)

            proyects.DataPartida[0].CodPartidaI=proyects.DataPartida[0].CodPartida.substring(10,12);

            setPartidaN(proyects.DataPartida[0])*/
        }
        else{

            if (proyects.DataPartida === undefined) return;
            if (!proyects.DataPartida[0]) return;
            console.log('Este es mi codigo obtenido')
            console.log(proyects.CodigoObtenido)
            proyects.DataPartida[0].CodPartidaI=proyects.CodigoObtenido[0]?.Output1;
            setPartidaN({...partidaN,CodPartidaI:proyects.CodigoObtenido[0]?.Output1});
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

        
        //alert(partidaN.CodPartidaP + partidaN.CodPartidaI)
        //alert(grupoSel)


        if (editando===1){
            //alert('editando')

            let grupo=1;
            if(grupoSel==='Partida') grupo='1'; else grupo='2';
            let CodUn1="Null";
            if(partidaN.CodUnidadPeso===null || partidaN.CodUnidadPeso==='') CodUn1="Null"; else CodUn1="'" + partidaN.CodUnidadPeso + "'";
            

            //guardarPartida = (CodPartida, CodPresupuesto, PropioPartida, Nivel, CodigoAlterno, Descripcion, DescripcionAlterna, CodUnidad, Grupo, RendimientoMO,RendimientoEQ, Jornada, CodUnidadPeso, Peso ,userId) => {
            dispatch(modificarPartida(partidaN.CodPartidaP + partidaN.CodPartidaI,partidaN.CodPresupuesto,partidaN.PropioPartida,partidaN.Nivel,partidaN.CodigoAlterno, partidaN.Descripcion, partidaN.DescripcionAlterna, partidaN.CodUnidad, grupo, partidaN.RendimientoMO, partidaN.RendimientoEQ, partidaN.Jornada, CodUn1, partidaN.Peso, ''));

            partidaeditando.Descripcion=partidaN.Descripcion;
            partidaeditando.UnidadPartida=partidaN.UnidadSimbolo;
            dispatch(modificaPartidas(partidaeditando));


            console.log('Estos son los datos de mi partida seleccionada')
            console.log(partidaeditando)


        }else{
            //alert('agregando')
            
            //if (editando===0){
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
            'Los datos de tu Partida  ' + partidaN.Descripcion + ' se almacenaron Correctamente!',
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
            
            <BuscaUnidad tipo="Nuevo" partidaN={partidaN} setPartidaN={setPartidaN} setShow={setShow} show={show} Indica={Indica.current} />

                (<Card className="animate__animated animate__fadeIn" style={{ overflow: 'scroll', marginLeft: '20px', height: '78vh', padding: '15px' }}>
                    <Card.Header style={{fontSize:'1rem', background:'#398bf7', color:'white', fontWeight:'550' }}>{titulo}
                            
                    </Card.Header>
                    <Card.Body class="ml-5">

                        <Form onSubmit={valida}>
                        <Button1 useSubmitBehavior={true} type="Submit" variant="outline-info" style={{ position: 'absolute', left: '270px', top: '23px' }} 
                            /*onClick={() => {
                            if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {

                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Ingrese todos los campos',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        }}*/><i class="far fa-save"></i>   Guardar</Button1>
                            <Form.Group as={Row} className="mb-1 mt-3" controlId="formCodigo">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Codigo
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        //defaultValue={itemSelected ? itemSelected : ''}
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
                                    {/* <Form.Control type="Input" placeholder="Codigo" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.CodPartidaI}
                                        value={partidaN.CodPartidaI}
                                        readOnly={true}
                                        //onValueChanged={CambiaCodigo}
                                        valueChangeEvent="keyup"
                                        //onValueChanged={CambiaCodigo}
                                        
                                    >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                    </TextBox> 

                                    {/* <NumberBox
                                    //showSpinButtons={true}
                                    //defaultValue="005"
                                    defaultValue={presupuestoN.CodPresupuesto}
                                    value={presupuestoN.CodPresupuesto}                                    
                                    valueChangeEvent="keyup"
                                    onValueChanged={CambiaCodigo}
                                    //rtlEnabled={this.state.rtlEnabled}
                                    >
                                    <Validator>
                                        <RequiredRule message="Codigo es requerido" />
                                    </Validator>
                                    </NumberBox> */}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="formAlterno">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Alterno
                            </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="Alterno" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodAlterno : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={partidaN.CodAlterno}
                                        value={partidaN.CodAlterno}
                                        valueChangeEvent="keyup"
                                        onValueChanged={CambiaCodigoAlterno}
                                        //onFocusOut={()=>{alert('saliste')}}
                                    /*valueChangeEvent="keyup"
                                    onValueChanged={(data)=>{
                                        console.log(data.value);

                                    }}*/
                                    //value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodPresupuesto : ''}                                    
                                    />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Descripcion
                            </Form.Label>
                                <Col sm={10}>
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.Descripcion}
                                        value={partidaN.Descripcion}
                                        onValueChanged={CambiaDescripcion}
                                    //readOnly={true}
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
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.DescripcionAlterna}
                                        value={partidaN.DescripcionAlterna}
                                        onValueChanged={CambiaDescripcionAlterna}
                                    //readOnly={true}
                                    >
                                    
                                    </TextBox>
                                </Col>
                            </Form.Group>
                            

                            <Form.Group as={Row} className="mb-1" controlId="formGeograqfica">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Unidad
                            </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="ID Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodLugar : ''} onChange={handlerOnChange} /> */}

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
                                    {/* <Form.Control type="Input" placeholder="Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].UbicacionGeografica : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={partidaN?.DescripcionUnidad }
                                        value={partidaN?.DescripcionUnidad }
                                        readOnly={true}
                                    >
                                    <Validator>
                                        <RequiredRule message="Unidad es requerida" />
                                    </Validator>
                                    </TextBox>                                         

                                </Col>

                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].UbicacionGeografica : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={partidaN?.UnidadSimbolo}
                                        value={partidaN?.UnidadSimbolo}
                                        readOnly={true}
                                    >
                                    </TextBox>                                         

                                </Col>


                                <Col sm={1}>
                                    <Button1 variant="outline-info" height="35px" onClick={() => {
                                        //if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            /*setShowUb(true); /*dispatch(limpiaUbicaciones()); dispatch(selectUBICACIONES('','20','1', ''));*/
                                            //alert();
                                            Indica.current=1;
                                            dispatch(selectUNIDADES('','20','1', ''));
                                            setShow(true);
                                            console.log(proyects.DataUnidades)
                                        /*} else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }*/

                                    }}>...</Button1>


                                    <Button1 variant="outline-info" height="35px" style={{marginLeft:'10px'}} onClick={() => {
                                            setPartidaN((state) => ({...state,CodUnidad:'',DescripcionUnidad :'', UnidadSimbolo:''}))
		                                    //setPartidaN((state) => ({...state,CodUnidadPeso:ubicacionSel.Codigo,DescripcionUnidadPeso:ubicacionSel.Descripcion, UnidadPesoSimbolo:ubicacionSel.Simbolo}))
                                    }}>X</Button1>


                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>

                            </Form.Group>


                            
                            <Form.Group as={Row} className="mb-1" controlId="formGeograqfica">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Unidad Peso
                                </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="ID Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodLugar : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.CodUnidadPeso}
                                        value={partidaN.CodUnidadPeso}
                                        readOnly={true}                                        
                                    >
                                    {/* <Validator>
                                        <RequiredRule message="unidad es requerida" />
                                    </Validator> */}
                                    </TextBox>                                         

                                </Col>
                                <Col sm={4}>
                                    {/* <Form.Control type="Input" placeholder="Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].UbicacionGeografica : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={partidaN?.DescripcionUnidadPeso}
                                        value={partidaN?.DescripcionUnidadPeso}
                                        readOnly={true}
                                    >
                                    {/* <Validator>
                                        <RequiredRule message="Unidad es requerida" />
                                    </Validator> */}
                                    </TextBox>                                         

                                </Col>

                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].UbicacionGeografica : ''} onChange={handlerOnChange} /> */}
                                    <TextBox
                                        defaultValue={partidaN?.UnidadPesoSimbolo}
                                        value={partidaN?.UnidadPesoSimbolo}
                                        readOnly={true}
                                    >
                                    </TextBox>                                         

                                </Col>



                                <Col sm={1}>
                                    <Button1 variant="outline-info" height="35px" onClick={() => {
                                        //if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] && proyects.DatosPresupuesto[0].CodPresupuesto !== "") {
                                            /*setShowUb(true); /*dispatch(limpiaUbicaciones()); dispatch(selectUBICACIONES('','20','1', ''));*/
                                            //alert();
                                            Indica.current=2;
                                            dispatch(selectUNIDADES('','20','1', ''));
                                            setShow(true);
                                        /*} else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'No tiene un Presupuesto seleccionado',
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                            })
                                        }*/

                                    }}>...</Button1>

                                    <Button1 variant="outline-info" height="35px" style={{marginLeft:'10px'}} onClick={() => {
                                            //setPartidaN((state) => ({...state,CodUnidad:'',DescripcionUnidad :'', UnidadSimbolo:''}))
		                                    setPartidaN((state) => ({...state,CodUnidadPeso:'',DescripcionUnidadPeso:'', UnidadPesoSimbolo:''}))
                                    }}>X</Button1>


                                    {/* <Button variant="outline-info"><i class="fas fa-binoculars"></i></Button> */}
                                </Col>



                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Peso
                                </Form.Label>
                                <Col sm={1}>
                                    {/* <Form.Control type="Input" placeholder="ID Ubicación" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodLugar : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.Peso}
                                        value={partidaN.Peso}
                                        readOnly={false}
                                        rtlEnabled={true}
                                        onValueChanged={CambiaPeso}
                                    >
                                    {/* <Validator>
                                        <RequiredRule message="unidad es requerida" />
                                    </Validator> */}
                                    </TextBox>                                         

                                </Col>

                            </Form.Group>

                            


                            <Form.Group as={Row} className="mb-1" controlId="formMoneda">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Grupo
                            </Form.Label>
                                
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="Modeda" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Moneda : ''} onChange={handlerOnChange} /> */}
                                    
                                    <SelectBox items={grupos}
                                        defaultValue={grupoSel}
                                        //displayExpr={grupoSel}
                                        //valueExpr={grupoSel}                                        
                                        //value={grupoSel}
                                        valueChangeEvent="keyup"
                                        onValueChanged={onValueChangedGrupo}
                                    //readOnly={true} 
                                    >
                                        <Validator>
                                        <RequiredRule message="Grupo es requerido"/>
                                    </Validator>
                                    </SelectBox>
                                    
                                    {/* <TextBox
                                        defaultValue={partidaN.NombreGrupo }
                                        value={partidaN.NombreGrupo}
                                        //stylingMode={'underlined'}                                    
                                        readOnly={true}
                                    >
                                    <Validator>
                                        <RequiredRule message="Grupo es requerido"/>
                                    </Validator>
                                    </TextBox>                                          */}

                                </Col>

                                

                            </Form.Group>



                            
                           
                            <Form.Group as={Row} className="mb-1" controlId="formDescripcion">
                                <Form.Label column sm={1} style={{ fontSize: titulos }}>
                                    Rendimiento MO
                                </Form.Label>
                                <Col sm={2}>
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.RendimientoMO}
                                        value={partidaN.RendimientoMO}
                                        onValueChanged={CambiaRendimientoMO}
                                        rtlEnabled={true}
                                    //readOnly={true}
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
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

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
                                    {/* <Form.Control type="Input" placeholder="Descripcion" value={proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Descripcion : ''} onChange={handlerOnChange} /> */}

                                    <TextBox
                                        defaultValue={partidaN.Jornada}
                                        value={partidaN.Jornada}
                                        onValueChanged={CambiaJornada}
                                        rtlEnabled={true}
                                    //readOnly={true}
                                    >
                                    <Validator>
                                        <RequiredRule message="Descripcion es requerida" />
                                    </Validator>
                                    </TextBox>
                                </Col>

                            </Form.Group>

                    <Form.Group as={Row} className="mb-3 mt-3">
                    <Col sm={12}>
						<Nav
							variant="tabs"
							defaultActiveKey="/home"
							className="eyelashes"
							style={{ height: '100%' }}
						>
							<Nav.Item
								/*onClick={() => {
									setLevel(1);
									setLevelPC(2);
								}}*/
							>
								<Nav.Link
									href="#"
									eventKey="link-1"
									active={true}
									onClick={() => {
										
									}}
								>
									<i className="fas fa-table" style={{ marginRight: '10px', fontWeight: 'bold' }}></i>
									Detalle de Recursos
								</Nav.Link>
							</Nav.Item>

							
						</Nav>



                </Col>
                </Form.Group>


                            <Form.Group as={Row} className="mb-3">
                            <Col sm={11}>
                            <Apus
                                levelStart={1}
                                idProject={proyects.idCard}
                            //itemSel={itemSel}
                            />
                            </Col>
                            </Form.Group>

                           
                            <Form.Group as={Row} className="mb-3">
                                    <ValidationSummary id="summary" style={{ position:'relative', marginLeft:'45%'}}></ValidationSummary>                               
                            </Form.Group>




                        </Form>


                    </Card.Body>
                </Card>)
             
            

        </div>
    )
}

export default PartidaAdd
