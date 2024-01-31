// import {useState} from "react";
import { Col, Collapse } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import "../styles/project.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import TreeCP from "../components/TreeCP";
import $ from 'jquery';
import { RefrescarV } from "./ViewerSc";
import Items from "../components/Items";
import axios from "../config/axios";
import { DropDownButton } from "devextreme-react";
import { limpiaSubs, limpiaTree } from "../actions/proyects.actions";
import Button1 from 'devextreme-react/button';


const menuFiltro = [
	{ id: 1, name: 'Escritorio', icon: 'home' },
	{ id: 2, name: 'Obras ganadas', icon: 'exportselected' },
	{ id: 3, name: 'Bandeja', icon: 'box' },
	{ id: 4, name: 'Archivo central', icon: 'toolbox' },
	{ id: 5, name: 'Papelera', icon: 'trash' },
];

const Presupuestos = ({ match }) => {

	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [modo, setModo] = useState('Escritorio');
	const [modoicono, setModoIcono] = useState('home');
	//const codProject = match.params.codProject;
	const [estado, setEstado] = useState(1);
	// console.log(codProject)
	//const proyects = useSelector((state) => state.proyects);
	const [width, setWidth] = useState(260);
	const [height, setHeight] = useState(window.innerHeight);
	//const [levelPC, setLevelPC] = useState(1);
	//const [level, setLevel] = useState(2);
	const [open, setOpen] = useState(true);
	const [levelPC1, setLevelPC1] = useState(1);
	//const [level1, setLevel1] = useState(2);
	const [favoritos, setFavoritos] = useState(false);
	const [vfavoritos, setVfavoritos] = useState(0);
	//const [reducido, setReducido] = useState(false);
	const [textoB, setTextoB] = useState('');

	useEffect(() => {
		dispatch(limpiaTree());
		dispatch(limpiaSubs());
		//alert();
	}, []);


	useEffect(() => {
		async function init() {
			let company = JSON.parse(localStorage.getItem("company-s10"));
			let connectId = await localStorage.getItem("connectionId");
			if (company && auth.User) {
				const { data } = await axios.post(
					"",
					{
						HasOutputParam: false,
						ObjectName: `dbo.S10_01_Presupuesto_ListarArbol 'ncortez@s10peru.com',${estado},${1}`,
						RequestId: "PARTY_CONTROL22",
						SignalRConnectionID: connectId,
						SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
					},
					{
						headers: {
							Token: company.Token,
							ModuleId: 21,
						},
					}
				);

			}
			//setLoading(false)
		}
		init()
		// eslint-disable-next-line
	}, [] );


	useEffect(() => {
		//alert(estado)
		dispatch(limpiaTree());
		//alert(vfavoritos);
		async function init() {
			let company = JSON.parse(localStorage.getItem("company-s10"));
			let connectId = await localStorage.getItem("connectionId");
			//console.log('connectId desde tree: ' + connectId + company + idProject)  ;
			if (company && auth.User) {
				//alert(data);
				const { data } = await axios.post(
					"",
					{
						HasOutputParam: false,
						ObjectName: `dbo.S10_01_Presupuesto_ListarArbol 'ncortez@s10peru.com',${estado},${vfavoritos}`,						
						//ObjectName: `dbo.S10_01_Presupuesto_ListarArbol 'ctorres@s10peru.com'`,
						RequestId: "PARTY_CONTROL",
						SignalRConnectionID: connectId,
						SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
					},
					{
						headers: {
							Token: company.Token,
							ModuleId: 21,
						},
					}
				);

			}
			//setLoading(false)
		}
		init()
		// eslint-disable-next-line
	}, [estado,vfavoritos] );


	useEffect(() => {
		async function init() {
			//alert('se ejcuta llamado');
			let company = JSON.parse(localStorage.getItem("company-s10"));
			let connectId = await localStorage.getItem("connectionId");
			//console.log('connectId desde tree: ' + connectId + company + idProject)  ;
			console.log(' LLAMANDO A LISTAR TODOS');
			//request.AddParameter("Data", jsonString );			
			if (company && auth.User) {
				//alert(data);
				const { data } = await axios.post(
					"",
					{
						HasOutputParam: false,
						ObjectName: `dbo.S10_01_Subpresupuesto_ListarTodos '001'`,
						RequestId: "LISTAR_SUBS",
						SignalRConnectionID: connectId,
						SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
						//Data:"[{'P':'001','O':0}]",
					},
					{
						headers: {
							Token: company.Token,
							ModuleId: 21,
						},
					}
				);

				//console.log(idProject);
			}
			//setLoading(false)
		}
		init()
		// eslint-disable-next-line
	}, []);
	//setLevelPC(1);



	/*const buscarPres = (e) => {
		setTextoB((state) => {
			return (e.target.value)
		});
		//console.log(e.target.value);
	}*/

	return (
		<>
			<div id="ContenedorTotal" className="d-flex flex-wrap justify-content-between overflow-scroll h-100" style={{ height: '200%' }}>

				<Resizable
					className="tree-fixed p-0 d-flex justify-content-between"
					enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
					style={{ background: '#f5f6f8' }}
					size={{ width: width, height: height }}
					marginLeft="-20px"
					maxWidth={open ? 600 : 0}
					minWidth="20px"
					onResizeStop={(e, direction, ref, d) => {
						setWidth(width + d.width);
						setHeight(height + d.height);
						setTimeout(() => {
							RefrescarV();
						}, 100);
					}}
				>
					<Collapse in={open}>
						<div id="Conte1" className="p-2 h-100 w-100" style={{
							overflow: 'scroll',
							background: '#f5f6f8',
							color: '#333337'

						}}>
							{/* <!-- SidebarSearch Form --> */}
							<div className="form mt-3">

								<div className="input-group" data-widget="">

									<DropDownButton
										splitButton={true}
										width='160px'
										useSelectMode={false}
										text={modo}
										//icon="dist/img/manager.png"
										icon={modoicono}
										items={menuFiltro}
										displayExpr="name"
										keyExpr="id"
										//onButtonClick={this.onButtonClick}
										onItemClick={(e) => {
											setModo(e.itemData.name);
											setModoIcono(e.itemData.icon)
											let timerInterval
											Swal.fire({
												title: 'Cargando datos de directorios!',
												html: 'Aplicando vista en <b></b> .',
												timer: 300,
												timerProgressBar: true,
												didOpen: () => {
													Swal.showLoading()
													const b = Swal.getHtmlContainer().querySelector('b')
													timerInterval = setInterval(() => {
														b.textContent = Swal.getTimerLeft()
													}, 100)
												},
												willClose: () => {
													clearInterval(timerInterval)
												}
											}).then((result) => {
												/* Read more about handling dismissals below */
												if (result.dismiss === Swal.DismissReason.timer) {
													//console.log('I was closed by the timer')
												}
											})
											if (e.itemData.name === 'Escritorio') setEstado(1);
											if (e.itemData.name === 'Obras ganadas') setEstado(2);
											if (e.itemData.name === 'Bandeja') setEstado(3);
											if (e.itemData.name === 'Archivo central') setEstado(8);
											if (e.itemData.name === 'Papelera') setEstado(9);
										}}
									/>
									<Button1 variant="outline-info" style={{ position: 'absolute', right: '-8px', top: '5px',  }} onClick={() => {
										//setNuevoPres(false);

										//BUSCAR PRESUPUESTO
									}
									}><i class="fas fa-search fa-fw"></i></Button1>

									<Button1 variant="outline-info" style={{ position: 'absolute', right: '28px', top: '5px', width:'25px', height:'28px'  }} onClick={() => {
										//setNuevoPres(false);
										//alert()
										if (vfavoritos===1)
										setVfavoritos(0);
										else
										setVfavoritos(1);
										
										setFavoritos(!favoritos)
										
										//BUSCAR PRESUPUESTO
									}
									}>
									{!favoritos ? 
									<img src="https://img.icons8.com/color/48/000000/star--v1.png"
									style={{ width:'25px', height:'28px', marginTop:'-10px', marginLeft:'-8px'}}
									/>:
									<img src="https://img.icons8.com/color/50/000000/filled-star--v1.png"
									style={{ width:'25px', height:'28px', marginTop:'-10px', marginLeft:'-8px'}}
									/>
									}
									</Button1>
								</div>
							</div>
							{/* <div id="DetalleItem" className="mt-0 p-2 h-20 overflow-scroll" style={{ height:'100%', overflow:'scroll' }}> */}
							{levelPC1 === 1 ? (
								<TreeCP
									Accion="Presupuesto"
									filtrado={textoB}
									levelStart={1}
									idProject=""
									marginTop="60"
									marginLeft='0px'
									estado={estado}
									setEstado={setEstado}
								/>
							) : (''
								// levelPC1 === 2 ? (
								// 	<Items />
								// ) : <Tree levelStart={level} nodeSelected={codProject} />
							)}

							{/* </div>  */}

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
								/*background: 'rgb(184,225,252)',
								background: '-moz-linear-gradient(top, rgba(184,225,252,1) 0%, rgba(169,210,243,1) 10%, rgba(144,186,228,1) 25%, rgba(144,188,234,1) 37%, rgba(144,191,240,1) 50%, rgba(107,168,229,1) 51%, rgba(162,218,245,1) 83%, rgba(189,243,253,1) 100%)',
								background: '-webkit-linear-gradient(top, rgba(184,225,252,1) 0%,rgba(169,210,243,1) 10%,rgba(144,186,228,1) 25%,rgba(144,188,234,1) 37%,rgba(144,191,240,1) 50%,rgba(107,168,229,1) 51%,rgba(162,218,245,1) 83%,rgba(189,243,253,1) 100%)',
								background: 'linear-gradient(to bottom, rgba(184,225,252,1) 0%,rgba(169,210,243,1) 10%,rgba(144,186,228,1) 25%,rgba(144,188,234,1) 37%,rgba(144,191,240,1) 50%,rgba(107,168,229,1) 51%,rgba(162,218,245,1) 83%,rgba(189,243,253,1) 100%)',
								filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#b8e1fc", endColorstr="#bdf3fd",GradientType=0',*/
								background: 'white',
								zIndex: '1'
								/*background: 'rgb(184,225,252)',
								background: '-moz-linear-gradient(top, rgba(184,225,252,1) 0%, rgba(169,210,243,1) 10%, rgba(144,186,228,1) 25%, rgba(144,188,234,1) 37%, rgba(144,191,240,1) 50%, rgba(107,168,229,1) 51%, rgba(162,218,245,1) 83%, rgba(189,243,253,1) 100%)',
								background: '-webkit-linear-gradient(top, rgba(184,225,252,1) 0%,rgba(169,210,243,1) 10%,rgba(144,186,228,1) 25%,rgba(144,188,234,1) 37%,rgba(144,191,240,1) 50%,rgba(107,168,229,1) 51%,rgba(162,218,245,1) 83%,rgba(189,243,253,1) 100%)',
								background: 'linear-gradient(to bottom, rgba(184,225,252,1) 0%,rgba(169,210,243,1) 10%,rgba(144,186,228,1) 25%,rgba(144,188,234,1) 37%,rgba(144,191,240,1) 50%,rgba(107,168,229,1) 51%,rgba(162,218,245,1) 83%,rgba(189,243,253,1) 100%)',
								filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#b8e1fc", endColorstr="#bdf3fd",GradientType=0'	*/
							}}
							className="h-0 w-100 "
							onClick={() => {
								//alert('se activa');


								setOpen(!open);


								if (!open) {
									document.getElementById("Conte1").style.width = 0;
									setWidth(260);
								} else {
									document.getElementById("Conte1").style.width = '260px';
									setWidth(20);
								}
								//alert('');
								//$("#forgeViewer").animate({ height: height + d.height }, 100);

								//$("#DetalleItem").animate({ height: window.innerHeight - (height + d.height) - 130 }, 100);

								//alert('');

								setTimeout(() => {
									RefrescarV();
								}, 100);




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
				</Resizable>

				<Col className="w-100" style={{
					/*background: 'rgb(242,245,246)',
					background: '-moz-linear-gradient(top, rgba(242,245,246,1) 0%, rgba(227,234,237,1) 37%, rgba(200,215,220,1) 100%)',
					background: '-webkit-linear-gradient(top, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%)',
					background: 'linear-gradient(to bottom, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%)',
					filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#f2f5f6", endColorstr="#c8d7dc",GradientType=0 )',*/
					background: 'white'

				}}>
					{/* <Route
						path="/projects/project/:codProject"
						component={IdProyect}
					/> */}
					{/* <ViewScreen1 /> */}


					{/* <DatosGenerales/> */}
					<Items
						widthItems={width}
						widthNav={$("#ContenedorSide").innerWidth()}
						Open4={open}
						SetOpen4={setOpen}
					/>

					{/* <Route path="/projects/id-pc/:codPc" component={IdPc} /> */}
				</Col>

			</div>

		</>
	);
};

export default Presupuestos;
