//import React from 'react'
import { Card, Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import { Col, Nav } from "react-bootstrap";
import Button1 from 'devextreme-react/button';
//import Bar from "./Charts/Bar";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery';
import { cleanDataChart, cleanDataChart22, cleanDataChartAPU, establecerMetrado, guardarMedicionMasiva, guardarMetrado, limpiaAsociado, modificaItem, selectAPUS, selectAsociados, selectCalculo, selectCalculoDet, selectEstructura, selectItems, selectMETRADOS, selectPARTIDAS, selectTITULOS, guardarCantidadMetrado, eliminarMetradoItem, removerItem, eliminarItemSub, limpiarItemsIngresados, agregaItem, actualizarSecuenciales, estableceItems, establecerPartidasM, seleccionaItemGlb, modificarItemSub, modificarItemRend, selectRecursosPres, limpiarPRECIOSRECURSOS } from "../actions/proyects.actions";
import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column,
	Sorting,
	SearchPanel,
	ColumnFixing,
	RowDragging
} from 'devextreme-react/tree-list';
import { Resizable } from "re-resizable";
import { Collapse } from "@material-ui/core";
//import { relative } from "path";

import Apus from "../components/Apus";
import Asociados from "../components/Asociados";
import Estructura from "../components/Estructura";
import Calculo from "../components/Calculo";
import Metrados from "../components/Metrados";
import Tree from "./TreeAll";
//import { ViewScreen1 } from "../views/ViewScreen1";
import { ViewerSc, RefrescarV, ObtenerPropiedad, ObtenerPropiedades, filtrar_campo } from "../views/ViewerSc";
import { ContextMenu, DropDownButton, Template, TextBox } from "devextreme-react";
import { Tooltip } from 'devextreme-react/tooltip';
//import notify from 'devextreme/ui/notify';
/*import { Width } from "devextreme-react/chart";
import zIndex from "@material-ui/core/styles/zIndex";
import { red } from "@material-ui/core/colors";*/
import BuscaModelo from "./BuscaModelo";
/*import BuscaTitulo from "./BuscaTitulo";
import BuscaPartida from "./BuscaPartida";*/
import { CellRend_Items } from "./Cellrend";
import BuscarItems from "./BuscarItems";
import CmpPrecios from "./CmpPrecios";

import { Export } from 'devextreme-react/data-grid';
import { Workbook, Excel } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import BuscaMoneda from "./BuscaMoneda";


const animationConfig = {
	show: {
		type: 'slide',
		from: {
			top: -100,
			opacity: 0
		},
		to: {
			top: 0,
			opacity: 1
		}
	},
	hide: {
		type: 'pop',
		from: {
			scale: 1,
			opacity: 1
		},
		to: {
			scale: 0.1,
			opacity: 0
		}
	}
};


const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];


const menuModo = [
	{ id: 1, name: 'Solo hoja', icon: 'doc' },
	{ id: 1, name: 'Detalle', icon: 'menu' },
	{ id: 4, name: 'Detalle y modelo', icon: 'event' },
	{ id: 2, name: 'Modelo', icon: 'image' },
];


const ItemsM = [
	{
		text: 'Nuevo',
		icon: 'dx-icon-add',
		items: [
			/*{ text: 'Partida' },*/
			{ text: 'Título' , icon: 'dx-icon-startswith' }]
	},
	{ text: 'Generar Metrado', icon: 'dx-icon-columnproperties' },
	{ text: 'Eliminar', icon: 'dx-icon-remove' },	
];


const ItemsM2 = [
	{
		text: 'Nueva Partida',
		icon: 'dx-icon-add',
	},
	{
		text: 'Duplicar',
		icon: 'dx-icon-copy',
	},
	{
		text: 'Editar',
		icon: 'dx-icon-cellproperties',
	},
	{
		text: 'Eliminar',
		icon: 'dx-icon-remove',
	}

];

const ItemsM3 = [
	{
		text: 'Nuevo Título',
		icon: 'dx-icon-add',
	},
	{
		text: 'Duplicar Título',
		icon: 'dx-icon-copy',
	},
	{
		text: 'Editar Título',
		icon: 'dx-icon-cellproperties',
	},
	{
		text: 'Eliminar Título',
		icon: 'dx-icon-remove',
	}

];


const ItemI = [{
	CodPresupuesto: "",
	CodSubpresupuesto: "",
	Descripcion: "",
	ERPCode: "",
	Item: "",
	Metrado: 0,
	Nivel: 1,
	Orden: "",
	OrdenJerarquico: "",
	PhantomParentId: "",
	Precio1: 0,
	Precio2: 0,
	Secuencial: 0,
	Unidad: null,
}];

/*CodPresupuesto: "0501001",
CodSubpresupuesto: "002",
Descripcion: "PINTURA EN TUBERIAS DE INSTALACIONES SANITARIAS Y ELECTRICAS",
ERPCode: "0501001002000000000000167",
Item: "000000000000167",
Metrado: 1,
Nivel: 3,
Orden: "01.15.12",
OrdenJerarquico: "00202.15.12",
PhantomParentId: "00202.15",
Precio1: 0,
Precio2: 0,
Secuencial: 153,
Unidad: "glb",*/




const Items = ({ widthItems, widthNav = 0, levelStart = 1, idProject, Open4, SetOpen4, idioma }) => {


	const [ancho, setAncho] = useState('90vw')
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [dataItems, setDataItems] = useState([])

	const [minimoW, setMinimoW] = useState(1200);

	const [modo, setModo] = useState('Detalle y modelo');
	const [sourceData, setSourceData] = useState([]);


	const [minimop, setMinimoP] = useState(400);
	const [width, setWidth] = useState(400);
	//const [width1, setWidth1] = useState(500);

	const [height, setHeight] = useState(window.innerHeight - 380 - 18);

	



	const [open, setOpen] = useState(true);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(true);

	

	

	const [textoB, setTextoB] = useState('');
	//const [tiempoEspera, setTiempoEspera] = useState(2200);


	

	const [levelPC, setLevelPC] = useState(1);
	const [level, setLevel] = useState(2);

	const [ultimoAPU, setUltimoAPU] = useState('');
	const [generaMetrado, setGeneraMetrado] = useState(0);
	
	
	const [ultimoMETRADO, setUltimoMETRADO] = useState('');
	const [ultimoESTRUCTURA, setUltimoESTRUCTURA] = useState('');
	const [ultimoASOCIADOS, setUltimoASCOCIADOS] = useState('');
	const [ultimoCALCULO, setUltimoCALCULO] = useState('');

	const [itemSeleccionado, setItemSeleccionado] = useState('');
	const [itemSel, setItemSel] = useState(null);

	
	//const [itemAgregarRec, setItemAgregarRec] = useState([]);
	//const key_inicio = useRef(0);


	const [focusedRowKey, SetfocusedRowKey] = useState(0);
	const [sumasApu, setSumasApu] = useState({S_mo:'0.00',S_mat:'0.00',S_eq:'0.00',S_subc:'0.00',S_subp:'0.00',TotalPU:'0.00'});
	const [rendimientoMO, setRendimientoMO] = useState('0.00');
	const [rendimientoEQ, setRendimientoEQ] = useState('0.00');

	const emptySelectedText = 'Nobody has been selected';

	const [itemsMenu, setItemsMenu] = useState(ItemsM);
	
	const [estadoFiltro, setEstadoFiltro] = useState(false);

	const cantidadP = useRef(0);
	const tiposSeleccion = useRef(1);
	const CampoKey = useRef('CodPartida');
	const Secu = useRef(0);
	const realizar = useRef(false);
	const actualizado_final = useRef('');
	const tiempoEspera = useRef(2200);
	

	const analisis_modificado = useRef(0);

	const [state, setState] = useState(
		{
			selectedRowKeys: [],
			recursive: false,
			selectedEmployeeNames: emptySelectedText,
			selectionMode: 'all'
		}
	)
	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/


	const [loading, setLoading] = useState(true);
	const [toltip, setToltip] = useState({
		defaultVisible: false,
		withAnimationVisible: false,
		withTemplateVisible: false
	});


	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	//const subproyects = useSelector((state) => state.subproyects);

	let arregloA=[];
	
	


	





	
	
	function formatNumber(num) {
		if (!num || num == 'NaN') return '-';
		if (num == 'Infinity') return '&#x221e;';
		var num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num))
			num = "0";
		var sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		var cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10)
			cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + '.' + cents);
	}

	function roundN(num, n) {
		return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
	}

	




	


	

	const orderTree2 = (tree) => {

		if (!tree) return;
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];


			//if (item.Orden === "") item.Orden = null;
			/*	if (item.PhantomParentId === null && item.Orden==="") {
					item.Orden = "00";
					//item.PhantomParentId = null;
				}
				if (item.PhantomParentId === "") {
					item.PhantomParentId = "00";
					//item.PhantomParentId = null;
				}
	
				if (item.Orden === "") item.Orden = i+'01';*/

			//item.Orden = i+item.Orden;


			//else item.Metrado = roundN(item.Metrado, 2);


			if (item.Metrado === null) item.Metrado = null;
			else item.Metrado = roundN(item.Metrado, 2);

			if (item.Precio1 === null) item.Precio1 = null;
			else item.Precio1 = roundN(item.Precio1, 2);

			if (item.Total === null) item.Total = 0.00;
			else item.Total = roundN(item.Metrado * item.Precio1, 2);

			//item.Metrado=dosDecimales(item.Metrado);

			//orderedLevels[0].push({...item, open: false})
		}
	}

	useEffect(() => {
		//alert('')
		if (proyects.DataPc.length===0){
			
		

		}else{

			SetfocusedRowKey(proyects.DataPc[0]);
			setItemSel(proyects.DataPc[0]);


			

		}

		//alert()
		if (proyects.Sub_sel !== '') return;
		if (proyects.treeSubControl)
			if (proyects.treeSubControl.length !== 0) {
				//llamar a metrados de tosod los subs
				//console.log('DATOS DE PROYECTOS');
				//console.log(proyects.DatosPresupuesto);

				/*for (let i=0;i<proyects.treeSubControl.length;i++){
					if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]){
	
						//alert('se jecuta' + proyects.DatosPresupuesto[0].CodPresupuesto + ' - ' + proyects.treeSubControl[i].CodSubpresupuesto);
						//alert(proyects.treeSubControl[i].CodSubpresupuesto);
						dispatch(selectItems(proyects.DatosPresupuesto[0].CodPresupuesto, proyects.treeSubControl[i].CodSubpresupuesto, ''));
						
					}
				}*/
				//alert(proyects.DatosPresupuesto[0].CodPresupuesto);
				//alert(proyects.DatosPresupuesto[0].CodPresupuesto);
				if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0])
					dispatch(selectItems(proyects.DatosPresupuesto[0].CodPresupuesto, '', ''));

				orderTree2(proyects.DataPc);
				//orderTree(proyects.DataPc);
				dispatch(cleanDataChart());

			}
	}, [proyects.treeSubControl])


	


	

	//alert();
	
	

	/*const verificar_hijos = (Codigo) => {

		let hijosAux = dataItems.filter(item => item.PhantomParentId === Codigo).sort((a, b) => a.Secuencial - b.Secuencial)
		
		

		for (let j = 0; j < hijosAux.length; j++) {
			hijosAux[j].PhantomParentId = NuevaCadena;
			hijosAux[j].Secuencial = hijosAux[j].Secuencial+1;
			verificar_hijos(hijosAux[j].OrdenJerarquico);
			let cad2 = '0';
			if (j + 1 >= 10) cad2 = '';
			hijosAux[j].OrdenJerarquico = NuevaCadena + cad2 + (j+1) ;
			//let hijosAux2 = dataItems.filter(item => item.PhantomParentId === datosOrigen[i].OrdenJerarquico).sort((a, b) => a.Secuencial - b.Secuencial)

		}


	}*/



	


	  function ItemTemplate(e) {
		return (
		  <>
			<span className={ e.icon } />			
			{ `  ` + e.text }
			{ e.items ? <span className="dx-icon-spinright" style={{marginLeft:'25px'}}/> : null }
		  </>
		);
	  }


	  

	// const { selectedRowKeys, recursive, selectionMode, selectedEmployeeNames } = state;

	const scrollToca1 = useRef(300);
	const pagToca1 = useRef(2);



	  //alert(idioma)

	return (
		<>

			<div id="ContenedorTotal1" className="d-flex flex-wrap justify-content-between overflow-hidden h-100" style={{ height: height - 20, fontSize: '0.8rem !important' }}>
				

				<Resizable
					id="RPrincipal"
					//className="tree-fixed p-0 d-flex justify-content-between"
					className="p-0 d-flex justify-content-between"
					size={{ width: width, height: height }}
					enable={{ top: false, right: open2, bottom: true, left: false, topRight: open2, bottomRight: open2, bottomLeft: false, topLeft: false }}
					//maxHeight="60vh"
					maxWidth={open ? minimoW : 20}
					//minHeight="67.5vh"
					maxHeight={window.innerHeight - 200}
					minWidth={minimop}
					minHeight="320px"
					onResizeStart={(e, direction, ref, d) => {
						//$("#ab").hide();
						$("#ab").fadeOut();
					}}
					onResizeStop={(e, direction, ref, d) => {
						//$("#ab").show();
						$("#ab").fadeIn(900);
						setWidth(width + d.width);
						if (open1)
							setHeight(height + d.height - 5);
						//alert('');
						if (open1) {
							//$("#barra1").animate({ height: height + d.height }, 0);
							$("#barra2").animate({ marginTop: height + d.height - 10 }, 0);
							$("#ContenedorTotal").animate({ height: height + d.height }, 0);
							$("#Card1").animate({ height: height + d.height - 20 }, 0);
							$("#ContDet").animate({ top: height + d.height + 10 }, 0);
							$("#ContDet2").animate({ top: height + d.height + 3 }, 0);
							$("#ab").animate({ height: height + d.height - 30 }, 0);
							$("#forgeViewer").animate({ height: '100%' }, 0);
						}
						$("#barra1").animate({ height: height + d.height - 20 }, 0);
						setTimeout(() => {
							RefrescarV();
						}, 150);
					}}
					onResize={(e, direction, ref, d) => {
						if (open1) {
							$("#barra1").animate({ height: height + d.height - 20 }, 0);
							$("#barra2").animate({ marginTop: height + d.height - 10 }, 0);
							$("#ContenedorTotal").animate({ height: height + d.height }, 0);
							$("#Card1").animate({ height: height + d.height - 20 }, 0);
							$("#ContDet").animate({ top: height + d.height + 10 }, 0);
							$("#ContDet2").animate({ top: height + d.height + 3 }, 0);
							$("#ab").animate({ height: height + d.height - 25 }, 0);
							$("#forgeViewer").animate({ height: '100%' }, 0);
						}
						
					}}
				//onResizeStop={()=>{}}
				>
					<Collapse in={open}>
						<Card id="Card1" style={{
							height: height - 20, overflow: 'hidden',
							background: 'black'
						}}>

							<Card.Header style={{ fontSize: '1rem' }}>{idioma==='Español' ? 'Selecciona un Modelo':'Choose a Model'}</Card.Header>
							<Card.Body>
								<Form id="FormLista">
									<BuscaModelo/>

									<ContextMenu
										dataSource={itemsMenu}
										width={150}
										target="#ListaIt"
										itemRender={ItemTemplate}
										//onItemClick={itemClick}
									/>

								</Form>
							</Card.Body>
						</Card>
					</Collapse>
					{open2 ? (
						<div
							id="barra1"
							className="bara-cerrar d-flex align-items-center barras"
							style={{
								width: '6px',
								height: "100%",
								background: 'rgba(0,127,127,0.1)',
								marginLeft: 5,
								borderStyle: 'none double none double',
								borderColor: 'rgba(0,127,127,0.2)',
							}}
						>
							<div
								style={{
									cursor: "pointer", width: '40px',
									zIndex: '1'
								}}
								className="h-0 w-100 "
								onClick={() => {
									$("#RPrincipal").fadeOut(10);
									$("#RPrincipal").fadeIn(900);
									if (open) {
										setMinimoP(0);
										setWidth(20);
									} else {
										setWidth(400);
										setMinimoP(400);
									}
									$("#ab").fadeOut(10);
									$("#ab").fadeIn(1000);
									setOpen(!open);
									//alert('');
									//$("#ab").animate({ with: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }, 100);
									setTimeout(() => {
										RefrescarV();
									}, 120);
									//$("#ab").animate({ height: height -30 }, 100);
								}}
								aria-controls="example-collapse-text"
								aria-expanded={open}
								style={{ background: 'transparent', zIndex: '1', width: '80px' }}
							>
								{open ? (
									<ion-icon name="chevron-back-outline" style={{ cursor: "pointer", color: 'white', borderColor: 'rgba(0,127,127,0.1)', marginLeft: '-8px', background: 'rgba(0,127,127,0.2)', zIndex: '2', width: '15px', height: '70px', borderRadius: '10px', borderStyle: 'solid', borderWidth: '0.5px', }}></ion-icon>
								) : (
									<ion-icon name="chevron-forward-outline" style={{ cursor: "pointer", color: 'white', borderColor: 'rgba(0,127,127,0.1)', marginLeft: '-8px', background: 'rgba(0,127,127,0.2)', zIndex: '2', width: '15px', height: '70px', borderRadius: '10px', borderStyle: 'solid', borderWidth: '0.5px' }}></ion-icon>
								)}
							</div>
						</div>

					) : ''
					}
					<div
						id="barra2" className="bara-cerrar d-flex align-items-center barras"
						style={{
							/*cursor: 'row-resize',*/
							position: 'absolute',
							//width: '98%',
							width: '100vw',
							height: '6px',
							marginLeft: 5,
							marginTop: height - 12,
							background: 'rgba(0,127,127,0.1)',
							borderStyle: 'none none double none',
							borderColor: 'rgba(0,127,127,0.2)',
						}}
					>
						<div
							style={{
								cursor: "pointer", marginLeft: $("#ContDet2").innerWidth() / 2 - 80, width: '20px', height: '18px', zIndex: '1',
							}}
							className="h-0 "
							onClick={() => {
								//$("#ContDet").show(1200);
								$("#ab").fadeOut(10);

								$("#ContDet2").hide(10);
								$("#ContDet2").fadeOut(10);

								if (open1)
									$("#barra2").animate({ marginTop: window.innerHeight - 380 }, 700);
								else
									if (window.innerHeight < 800) {
										//setHeight(window.innerHeight - 250 - 18);
										$("#barra2").animate({ marginTop: window.innerHeight - 380 }, 700);
										//$("#barra1").animate({ height: window.innerHeight - 250  }, 600);									
									} else {
										//setHeight(window.innerHeight - 480 - 18);
										//$("#barra1").animate({ height: window.innerHeight - 500  }, 600);
										$("#barra2").animate({ marginTop: window.innerHeight - 510 }, 700);
									}

								if (open1) {
									setHeight(window.innerHeight - 360);
									$("#barra1").animate({ height: window.innerHeight - 380 }, 700);
									if (open2)
										setModo('Modelo');
									else
										setModo('Solo hoja');
								} else {

									if (window.innerHeight < 800) {
										setHeight(window.innerHeight - 250 - 18);
										$("#barra1").animate({ height: window.innerHeight - 380 }, 700);
									} else {
										setHeight(window.innerHeight - 480 - 18);
										$("#barra1").animate({ height: window.innerHeight - 500 }, 700);
									}
									//setHeight(window.innerHeight - 500);
									if (open2)
										setModo('Detalle y modelo');
									else
										setModo('Detalle');
									//setModo('Solo hoja');									
								}
								if (open1)
									$("#Card1").animate({ height: window.innerHeight - 60 - 30 }, 700);
								else
									if (window.innerHeight < 800) {
										$("#Card1").animate({ height: window.innerHeight - 250 - 18 - 30 }, 700);
									} else {
										$("#Card1").animate({ height: window.innerHeight - 480 - 18 - 30 }, 700);
									}

								setTimeout(() => {
									setOpen1(!open1);

									$("#ContDet2").fadeIn(1500);
									$("#ab").fadeIn(1500);

									setTimeout(() => {
										RefrescarV();
									}, 120);

								}, 700);

							}}
							aria-expanded={open}
						>
							{open1 ? (
								<ion-icon name="chevron-down-outline" style={{ cursor: 'pointer', marginTop: '4px', color: 'white', borderColor: 'rgba(0,127,127,0.1)', marginLeft: '4px', background: 'rgba(0,127,127,0.2)', zIndex: '99', width: '70px', height: '15px', borderRadius: '20px', borderStyle: 'solid', borderWidth: '0.5px', }}></ion-icon>
							) : (
								<ion-icon name="chevron-up-outline" style={{ cursor: 'pointer', color: 'white', borderColor: 'rgba(0,127,127,0.1)', marginLeft: '4px', background: 'rgba(0,127,127,0.2)', zIndex: '99', width: '70px', height: '15px', borderRadius: '20px', borderStyle: 'solid', borderWidth: '0.5px' }}></ion-icon>
							)}
						</div>
					</div>
				</Resizable>
			</div>

			<Resizable
				id="Conten1"
				//style={{ position: 'absolute', left: width + 10, top: '5px', height: height - 30, width: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }}
				style={{ position: 'absolute', left: width + 10, top: '5px', bottom: '-15px' }}
				size={{ width: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 50, height: height - 10 }}
				//maxWidth={open ? 1200 : 0}
				maxHeight={window.innerHeight - 200}
				enable={{ top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
				//minWidth="20px"
				minHeight="320px"
				onResizeStop={(e, direction, ref, d) => {
					if (open1)
						setHeight(height + d.height);
					$("#ab").fadeOut(10);
					$("#ab").fadeIn(1000);

					setTimeout(() => {
						RefrescarV();
					}, 150);
				}}
				onResize={(e, direction, ref, d) => {
					//console.log('resizando');
					//$("#barra2").marginTop=width;
					if (open1) {
						$("#barra1").animate({ height: height + d.height }, 0);
						$("#barra2").animate({ marginTop: height + d.height }, 0);
						$("#ContenedorTotal").animate({ height: height + d.height }, 0);
						$("#Card1").animate({ height: height + d.height }, 0);
						$("#ContDet").animate({ top: height + d.height + 15 }, 0);
						$("#ContDet2").animate({ top: height + d.height + 3 }, 0);
						$("#ab").animate({ height: height + d.height - 25 }, 0);
						$("#forgeViewer").animate({ height: '100%' }, 100);
					}
				}}

			>

				
						
						
				{open2 ? <div id="ab" /*style={{width:'100%'}}*/ style={{ position: 'absolute', left: '7px', /*left: width + 25, */top: '5px', height: height - 40, width: window.innerWidth - width - 58, zIndex:'9999', background:'black' }}>

					{
						
						<ViewerSc
						//dataItems={dataItems}
						/>
						
					}
				</div> : ''}
			</Resizable>

			<div id="ContDet2" className="" style={{
				position: 'absolute', top: height + 3, height: window.innerHeight - height - 60, width: '99%',
				background: 'transparent',
				/*, zIndex: '9', background: 'red'*/
			}}>
				<Collapse in={open1} style={{
					height: '90%',
					background: 'transparent',
				}}>
					<div className="p-2 w-100" style={{ height: '90%', }}>
						<Nav
							variant="tabs"
							defaultActiveKey="/home"
							className="eyelashes"
							style={{ height: '100%' }}
						>
							<Nav.Item
								onClick={() => {
									setLevel(2);
									setLevelPC(1);
								}}
							>
								<Nav.Link href="#"
									active={level === 2}
									onClick={() => {
										
									}}
								>
									
									OPCION 1
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									setLevel(1);
									setLevelPC(2);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-1"
									active={level === 1}
									onClick={() => {
										
									}}
								>
									OPCION 2
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {									
										setLevel(3);
										setLevelPC(3);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-2"
									active={level === 3}
									onClick={() => {
									}}
								>
									OPCION 3
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
											setLevel(4);
											setLevelPC(4);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-3"
									active={level === 4}
									onClick={() => {
										
									}}
								>
									OPCION 4
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									
											setLevel(5);
											setLevelPC(5);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-4"
									active={level === 5}
									onClick={() => {
										if (ultimoCALCULO !== itemSeleccionado) {
											//alert(itemSeleccionado.substring(0,7));
											//alert(itemSeleccionado.substring(7,10));
											//alert(itemSeleccionado.substring(10,25));
											dispatch(selectCalculo(itemSeleccionado.substring(0, 7), itemSeleccionado.substring(7, 10), itemSeleccionado.substring(10, 25), ''));
											dispatch(selectCalculoDet(itemSeleccionado.substring(0, 7), itemSeleccionado.substring(7, 10), itemSeleccionado.substring(10, 25), ''));
											setUltimoCALCULO(itemSeleccionado);
										}
										///////////////////////////////////////////////////////

									}}
								>
									OPCION 5
								</Nav.Link>
							</Nav.Item>

							{proyects.idCard && (
								<Nav.Item
									onClick={() => {
										setLevelPC(1);
										setLevel(null);
									}}
								>
									<Nav.Link
										href="#"
										eventKey="link-1"
										active={levelPC === 4}
									>
										PC
									</Nav.Link>
								</Nav.Item>
							)}
						</Nav>


						<div id="DetalleItem" className="mt-0 p-1 overflow-scroll" style={{
							position: 'absolute', top:'50px', height: '50%', overflow: 'hidden',
							background: 'transparent'
						}}>
							{levelPC === 1 ? (
								<>

								
								</>
							) : (
								levelPC === 3 ? (
									<></>
								) : (
									levelPC === 4 ? (
										<></>
									) : (
										levelPC === 5 ? (
											<></>
										) : (
											levelPC === 2 ? (
												<></>
											) : (
												<Tree levelStart={level} nodeSelected={""} />
											))))
							)}
						</div>
					</div>
				</Collapse>

			</div>
		</>
	)
}

export default Items
