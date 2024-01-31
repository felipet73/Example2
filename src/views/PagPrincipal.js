import {useEffect, useLayoutEffect, useRef, useState, Suspense} from "react";

import { useDispatch } from "react-redux";
import Video from "../Video";
import {Tiles} from "../Tiles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Form, Container, Button, Image } from "react-bootstrap";
import '../styles/auth.css';
import Cuadro from "../components/Cuadro";
import Gradas from "../components/Gradas";
import gsap from 'gsap';
import { DropDownButton } from "devextreme-react";

import '../styles.css'
import Galeria from '../Galeria'

import { Document, Page } from 'react-pdf';
import { Url } from "devextreme-react/chart";

import pdffile from './CVFTL.pdf'
import pdffileing from './CVFTeng.pdf'

const Hover=[false,true,false, false,false,false,false,false,false,false,false,false, false, false, false ,false ]

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(7319158) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(1714208) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(777001) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(1194713) },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(414579) },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(2781195) },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(3109168) },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1824392) },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1882802) }
]

const menuModo = [
	{ id: 1, name: 'Español', icon: 'doc' },
	{ id: 2, name: 'English', icon: 'menu' },
];

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const opc1 = ['████','■Acad■','■Revit■','■ForGe■', '■Office■', '■BIM■', '■CAD■'];

export default function PagPrincipal() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [archivoF, setArchivoF] = useState(pdffile);
  const [archivoFeng, setArchivoFeng] = useState(pdffileing);

  const [hov, SetHov] = useState(Hover);
  
  const [opc, setOpc] = useState(1);

  const [textoact, setTextoAct] = useState('■■■');
  const [textoact1, setTextoAct1] = useState('■■');
  const [nvideo, setNvideo] = useState('/drei2.mp4');

  const [modo, setModo] = useState('Español');

  

  const showFn = () =>{
	  setShow(true)
  }
  // Formulario y validación con formik y Yup
  const formik = useFormik({
    initialValues: {
      UserName: ''/*ctorres@s10peru.com'*/,
      Password: ''/*uT9pLH4V'*/,
    },
    validationSchema: Yup.object({
      UserName: Yup.string()
        .email("El email no es válido")
        .required("El Email es Obligatorio"),
      Password: Yup.string().required("El password no puede ir vacio"),
    }),
    onSubmit: (data) => {
    //   console.log("enviando...");
      //dispatch(signIn(data, showFn));
    },
  });


 

 useLayoutEffect(() => {
  //animar();


}, [])

const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    //setNumPages(numPages);
    alert()
  }


const toca = useRef(0);
const opci = useRef(1);

useEffect(() => {
  

  setTimeout(() => {
    if (opci.current===1){
      if (toca.current>6)
        toca.current=0;
      setTextoAct(opc1[toca.current]);
    toca.current++;
    }
  }, 8000);



}, [textoact])



  return (
    <div className="auth" style={{background:'yellow'}}>
	  {/* <SelectCompany setShow={setShow} show={show} /> */}
      <Container className="d-flex justify-content-center" style={{background:'transparent'}}>
      <Form method="POST" onSubmit={()=>{}}>
        <Card className="mt-4 " style={{ background:'transparent'}}>
          <Card.Header className="estilo1c" style={{zIndex:'2'}}>
            <Image style={{ marginTop:'-20px', marginLeft:'-30px'  }} src={''} width="180"  />
         
              </Card.Header>              
              <div id='linea1' className="estilotex" style={{position:'absolute', top:'-25px', left:'165px', fontSize:'18px', marginTop:'10px', color:'white', zIndex:'2', textShadow:'1px 1px 2px rgba(255, 255, 255, 0.93), 0 0 1em rgba(255, 255, 255, 0.73), 0 0 0.4em rgba(0, 147, 127, 0.3)'}}>DESARROLLO WEB MOVIL BIM</div>
              <div id='linea1' className="estilotex" style={{position:'absolute', top:'-5px', left:'165px', fontSize:'18px', marginTop:'10px', color:'white', zIndex:'2', textShadow:'1px 1px 2px rgba(255, 255, 255, 0.93), 0 0 1em rgba(255, 255, 255, 0.73), 0 0 0.4em rgba(0, 147, 127, 0.3)'}}>el portal ....</div>
              <div id='linea2' className="estilotex" style={{position:'absolute', top:'120px', left:'115px', fontSize:'13px', marginTop:'10px', color:'white', zIndex:'2', textShadow:'1px 1px 2px rgba(255, 255, 255, 0.93), 0 0 1em rgba(255, 255, 255, 0.73), 0 0 0.4em rgba(0, 147, 127, 0.3)'}}>{modo === 'Español' ? '':''} </div>
              <Form.Label id='linea3' className="estilotex"></Form.Label>
          <Card.Body  className="d-flex justify-content-center estilo2" draggable="true" style={{width:'96vw'}} >
            <div className="w-100">

              <Form.Group>
              </Form.Group>
             
            </div>
          </Card.Body>

          <div className="estilo2" style={{width:'97vw', position:'absolute',top:'-30px', height:'10px'}}>
          </div>
          <div className="estilo2" style={{width:'97vw', position:'absolute',top:'95vh'}}>
          </div>
          <div className="" style={{position:'absolute', left:'130px', top:'-20px',width:'680', height:'200px', zIndex:'1'}}>
          {/* <Cuadro/> */}
          </div>
          <div className="" style={{position:'absolute', left:'250px', top:'-20px',width:'70vw', height:'280px', zIndex:'1', background:'transparent'}}>
          <Gradas
           hov={hov}
           SetHov={SetHov}
          /> 
          </div>
          <div className="" style={{position:'absolute', left:'10px', top:'280px',width:'97vw', height:'60vh', zIndex:'0', background:'transparent'}}>

         
          {/* <input type="file" name="test" id="testFile"  style={{position:'absolute', right:'120px', top:'-210px', width:'360px'}}/> */}

          {opc===1 ?
          <>
            <Video texto={textoact} nvideo={'/drei.mp4'} opc={1}/>
          </>
          :opc===2 ?
          <>
            <Video texto={'■'} nvideo={'/drei2.mp4'} opc={2}/>
            <div style={{position:'absolute', top:'0px', left:'0px', zIndex:'3', width:'100%', height:'100%', background:'black'}} >            
              <Galeria images={images} idioma={modo} /> 
            
            </div>
          </>
            
          :opc===3 ?
            <Video texto={textoact1} nvideo={nvideo} opc={3}/>
          :opc===4 ?
            <Video texto={textoact1} nvideo={nvideo} opc={3}/>
          :opc===5 ?
            <>
            <Video texto={' '} nvideo={nvideo} opc={3}/>
            <div style={{position:'absolute', top:'0px', left:'0px', zIndex:'3', width:'100%', height:'100%', background:'black', overflow:'hidden'}} >
              
            </div>
            </>
          :opc===6 ?
            // <Video texto={'■Office■'} nvideo={nvideo}/>
            <Video texto={textoact1} nvideo={nvideo} opc={3}/>
          :opc===7 ?
            <Video texto={textoact} nvideo={nvideo} opc={3}/>
          :opc===8 ?
          <>

            <Video texto={'■'} nvideo={'/drei2.mp4'} opc={2}/>
            <div style={{position:'absolute', top:'0px', left:'0px', zIndex:'3', width:'100%', height:'100%', background:'black'}} >
            <Suspense fallback={null}>
             <Tiles />
            </Suspense>
            
             </div>
            
          </>
          
          :opc===9 ?
          <>

            <Video texto={'■'} nvideo={'/drei2.mp4'} opc={2}/>
            <div style={{position:'absolute', top:'0px', left:'0px', zIndex:'3', width:'100%', height:'100%', background:'black'}} >
            <embed id="idpdf" src={modo==='Español' ? archivoF:archivoFeng} type="application/pdf" style={{width:'100%', height:'100%'}}/>
            
            {/* <Document
            file={archivoF}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document> */}

              {/* <object
                style={{width:'100%', height:'100%'}}
                data={require('./sample.pdf')}
                type="application/pdf"

                //width="100%"
                //height="100%"
              >
              </object> */}

              {/* <p>Page {pageNumber} of {numPages}</p> */}
             </div>
          </>          
          :''
          }
          </div>


          


          <DropDownButton
                    style={{position:'absolute', right:'60px', top:'200px'}}
										splitButton={true}
										width='180px'
										useSelectMode={false}
										text={modo}
										//icon="dist/img/manager.png"
										icon="tips"
										items={menuModo}
										displayExpr="name"
										keyExpr="id"
										//onButtonClick={this.onButtonClick}
										onItemClick={(e) => {
											setModo(e.itemData.name);
											//notify(e.itemData.name || e.itemData, 'success', 300);
										

											if (e.itemData.name === 'Español') {
											}

											
										}}
									/>



          <Button variant="primary" block className="py-3 rounded-3 estilo2" style={{
                position:'absolute',
                width:'90px',
                top:'198px',
                left:'20px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                opci.current=1;
                 setTimeout(() => {
                  if (toca.current>6)
                  toca.current=0;
                  setTextoAct(opc1[toca.current]);
                  toca.current++;
                 }, 4000);
                 setOpc(1);                  
              }}
              >
              	INTRO
              </Button>
              
              <Button variant="primary" block className="py-3 rounded-3 estilo2" style={{
                position:'absolute',
                width:'100px',
                top:'190px',
                left:'110px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                 opci.current=2;
                 setTextoAct('■');
                 setOpc(2);
              }}
              >
              	{modo==='Español' ? 'SOBRE MI':'ABOUT'}
              </Button>


              <Button variant="primary" block className="py-3 rounded-0 estilo2" style={{
                position:'absolute',
                width:'100px',
                top:'190px',
                left:'210px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                 opci.current=2;
                  if (modo==='Español')
                    setNvideo('/autocad.mp4');
                  else
                    setNvideo('/autocading.mp4');
                  setOpc(3);
                  setTextoAct1('■Acad■');
                  setTimeout(() => {
                    setTextoAct1('█████');
                  }, 6000);
 

              }}
              >
              	AUTOCAD
              </Button>
              <Button variant="primary" block className="py-3 rounded-0 estilo2" style={{
                position:'absolute',
                width:'100px',
                top:'190px',
                left:'310px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                 opci.current=2;
                 if (modo==='Español')
                  setNvideo('/revit.mp4');
                  else
                  setNvideo('/reviting.mp4');
                 setOpc(4);
                 setTextoAct1('■Revit■');                 
                 setTimeout(() => {
                  setTextoAct1('█████');
                 }, 6000);


              }}
              >
              	REVIT
              </Button>
              <Button variant="primary" block className="py-3 rounded-0 estilo2" style={{
                position:'absolute',
                width:'150px',
                top:'190px',
                left:'410px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                 opci.current=2;
                  setTextoAct('■Forge■');
                  //SetHov([false,false,false, true,false,true,false,false,false,false,false,false, false, false, false ,true]);
                  //opci.current=2;
                  setNvideo('/drei2.mp4');
                  setOpc(5);

              }}
              >
              	WEB-FORGE
              </Button>
              <Button variant="primary" block className="py-3 rounded-0 estilo2" style={{
                position:'absolute',
                width:'220px',
                top:'190px',
                left:'560px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                  //SetHov([false,false,false, true,false,true,false,false,false,false,false,false, false, false, false ,true]);
                  //setTextoAct('■Office■');
                  opci.current=2;
                  if (modo==='Español')
                    setNvideo('/excel.mp4');
                    else
                    setNvideo('/exceling.mp4');
                  setOpc(6);
                  setTextoAct1('■Office■');
                  setTimeout(() => {
                    setTextoAct1('█████');
                  }, 6000);
 
              }}
              >
              	{modo==='Español' ? 'OFFICE AUTOMATIZACION':'OFFICE AUTOMATION'}
              </Button>

              <Button variant="primary" block className="py-3 rounded-0 estilo2" style={{
                position:'absolute',
                width:'320px',
                top:'190px',
                right:'260px',
                height:'45px',
                zIndex:'3'
              }}
              onClick={()=>{
                 // alert();
                  //SetHov([false,false,false, true,false,true,false,false,false,false,false,false, false, false, false ,true]);
                  //setTextoAct('■Office■');
                  
                  

                  opci.current=2;
                  if (modo==='Español')
                    setNvideo('/excel.mp4');
                    else
                    setNvideo('/exceling.mp4');
                  setOpc(8);
 
              }}
              >
              	{modo==='Español' ? 'EXPERIENCIA OBRAS CONSTRUCCION':'OUTSITE CONSTRUCTION EXPERIENCE'}
              </Button>

              <Button variant="primary" block className="py-3 rounded-0 estilo2" style={{
                position:'absolute',
                width:'50px',
                top:'2vh',
                right:'60px',
                height:'45px'
              }}
              onClick={()=>{
                 // alert();
                 opci.current=2;
                  if (modo==='Español')
                    setNvideo('/excel.mp4');
                    else
                    setNvideo('/exceling.mp4');

                    //var file = document.getElementById("testFile");
										//reader.readAsArrayBuffer(file.files[0]);
                    //let pdffileUrl = URL.createObjectURL(file.files[0]);
                    //setArchivoF(pdffileUrl);
                    //setArchivoF(file.files[0]);
									//alert(file.files[0])


										


                  setOpc(9);
                  //SetHov([false,false,false, true,false,true,false,false,false,false,false,false, false, false, false ,true]);
              }}
              >
                
              	{/* <i className="fas fa-sign-out-alt"></i> CV */}CV
              </Button>

        </Card>
      </Form>
    </Container>
    </div>
  );
}
