import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actualizaMetrado, agregaMetrado, borraMetrado, eliminarXCodigo, guardarCantidadMetrado, guardarMedicion, guardarMetrado, modificaItem  } from "../actions/proyects.actions";
import { MostarModelo } from "../views/ViewerSc";
import Swal from 'sweetalert2'

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
	SearchPanel
} from 'devextreme-react/tree-list';
import { ContextMenu, Template } from "devextreme-react";
import { CellRend_Metrados } from "./Cellrend";


const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];

const ItemsM = [
	{ text: 'Agregar Item Metrado', icon:'dx-icon-add' },
//	{ text: 'Agregar Título', icon:'dx-icon-startswith' },
	//{ text: 'Eliminar', icon:'dx-icon-remove' },
];

const LPlanos = [{
	'CodPlano': 'n4VduC1mikKexAKq81VrPw==',
	'NombreArchivRvt': "OBRA-2021-01-EST_UTP-TRUJILLO_210323_felipet79XYRPT",
	'RutaArchivoRvt': 'C:\Users\CRISTIAN\Documents\OBRA-2021-01-EST_UTP-TRUJILLO_210323_felipet79XYRPT.rvt',
	'UrnAddIn': 'urn:adsk.wipprod:fs.file:vf.i-ZglBH8RtWEb5f-BZvgCA?version=1',
	'UrnWeb': 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x',
	'EmailUsuario': 'ctorres@s10peru.com',
}, {
	'CodPlano': 'au5cX016Pkq2F8FLjAqHeA==',
	'NombreArchivRvt': "Edificio colinas_felipet79XYRPT",
	'RutaArchivoRvt': 'C:\Users\CRISTIAN\Documents\Edificio colinas_felipet79XYRPT.rvt',
	'UrnAddIn': 'urn:adsk.wipprod:fs.file:vf.eRzcm6VWTMy2VuycStaTdQ?version=1',
	'UrnWeb': 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmVSemNtNlZXVE15MlZ1eWNTdGFUZFE/dmVyc2lvbj0x',
	'EmailUsuario': 'ctorres@s10peru.com',
}];


const Metrados = ({ levelStart = 1, idProject, itemSel, setDataItems,dataItems }) => {



	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);

	const [itemsMenu, setItemsMenu] = useState(ItemsM);
	
	const [itemMetradoSel, setItemMetradoSel] = useState({});
	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/
	const [focusedRowKey, SetfocusedRowKey] = useState(0);
	

	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	//const subproyects = useSelector((state) => state.subproyects);


	const orderTree = (tree) => {
		//let orderedLevels = {};

		/*for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			if (item.Nivel >= levelStart) {
				if (!orderedLevels[item.Nivel])
					orderedLevels[item.Nivel] = []
				if (item.Nivel > lastLevel)
					setLastLevel(item.Nivel)
				orderedLevels[item.Nivel].push({...item, open: false})
			}
		}*/

		/*let orderedLevels = {};
		orderedLevels[0] = [];
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			orderedLevels[0].push({...item, open: false})
		}
		setAllLevels(orderedLevels);*/

		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			if (item.PhantomParentId === "")
				item.PhantomParentId = null;

			if (item.Descripcion === 'Metrados Personalizados' && item.Posicion===null)
				item.Posicion = 1;
			else 
			if (item.Posicion===null)
				item.Posicion = i+2;
			//orderedLevels[0].push({...item, open: false})
		}
		//setAllLevels(orderedLevels);


		//setAllLevels(orderedLevels);
		//console.log('datos de apus')
		//console.log(orderedLevels)

	}

	useEffect(() => {
		//console.log('datos de metrado')
		//console.log(proyects.DataMetrado)
		/*proyects.DataMetrado=[ {CodMedicion="",Descipcion="Raiz" } ,...proyects.DataMetrado]
		if (proyects.DataMetrado==undefined) return;
		orderTree(proyects.DataMetrado);
		//alert('ejecutó la primera carga');
			// console.log(result);
		// }
		 // <eslint-disable-next-line></eslint-disable-next-line>*/

		if (proyects.DataMetrado == undefined) return;
		orderTree(proyects.DataMetrado);


	}, [proyects.DataMetrado])



	const Seleccion_Item = (Item) => {
		//const codP= Item.ERPCode.substring(1, 7);
		//const codSub= Item.ERPCode.substring(8, 10);
		/*const codP= Item.CodPresupuesto;
		const codSub= Item.CodSubpresupuesto;
		const codItem= Item.Item;
		alert(codP + "-" + codSub + "-" + codItem);

		dispatch(selectAPUS(codP, codSub, codItem,''));
		//dispatch(cleanDataChartAPU());*/

		MostarModelo(Item.UniqueId);


	}



	const drawerItems1 = (nivelact) => {

		if (allLevels == null || allLevels == undefined) return;
		if (allLevels[nivelact] == null || allLevels[nivelact] == undefined) return;
		//alert('ejecutó la carga');

		/*console.log('datos de subProyectos actualizados')
		console.log(allLevels1[0])
		
		return allLevels1[0].map( filter => {
				//const newTitle = `${parentName}${filter.Descripcion}`;
				 return (
				<StyledTreeItem
					nodeId={filter.CodSubpresupuesto}
					label={filter.Descripcion}
					key={filter.CodSubpresupuesto}
					onLabelClick={() => changeItem1(filter)} 
				>
				</StyledTreeItem>
			)})*/
		return (
			allLevels && allLevels[nivelact] ?
				allLevels[nivelact].map(filter => {
					return (<tr onClick={() => Seleccion_Item(filter)}>
						<td>{filter.Descripcion}</td>
						<td>{filter.Cantidad}</td>
						<td>{filter.Longitud}</td>
						<td>{filter.Ancho}</td>
						<td>{filter.Alto}</td>
						<td>{filter.Total}</td>
						<td>{filter.Detalle}</td>
						<td>{filter.Vinculo}</td>
						<td>{filter.UniqueId}</td>
					</tr>
					)
				}) : ''
		)


	}



	function ObtenerCadena(Item) {
		var cadenaMostrar = "";
		if (Item.UniqueId === "") {
			const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === Item.CodMedicion);
			for (let i = 0; i < filtro.length; i++) {
				if (filtro[i].Tipo === "Medicion") {
					if (cadenaMostrar === "")
						cadenaMostrar = filtro[i].UniqueId;
					else
						cadenaMostrar = cadenaMostrar + ',' + filtro[i].UniqueId;
				} else {
					//buscar los datos de los hijos
					var CadenaAux = ObtenerCadena(filtro[i]);
					if (cadenaMostrar === "")
						cadenaMostrar = CadenaAux;
					else
						cadenaMostrar = cadenaMostrar + ',' + CadenaAux;
				}

			}

		} else
			return Item.UniqueId;
		return cadenaMostrar;
	}


	/*function dosDecimales(n) {
		let t=n.toString();
		let regex=/(\d*.\d{0,2})/;
		return t.match(regex)[0];
	  }*/

	//console.log(dosDecimales(3232.3456))






	function onSelectionChanged(e) {
		//console.log(e);
		SetfocusedRowKey(e.component.option('focusedRowKey'));
		//alert(e.row.data.Descripcion);
		const Item = e.row.data;


		var ItemsM1=[];
		//alert(Item.Unidad);
		/*if (itemSeleccionado !== (codP + codSub + codItem) )
		{*/
		
			
	
		


			

		//alert(codP + "-" + codSub + "-" + codItem);
		if (e.row.data.Vinculo === 'Personalizado'){
			ItemsM1.push ( 
				{ text: 'Agregar Item', icon:'dx-icon-add' },
				{ text: 'Agregar Título', icon:'dx-icon-startswith' },
				{ text: 'Eliminar', icon:'dx-icon-remove' },
			);

		}else{
			ItemsM1.push ( 
				{ text: 'Agregar Item Personalizado', icon:'dx-icon-add' },
			);


		}
		
		setItemsMenu(ItemsM1);

		//verificar si es el plano

		//Item
		const filtro2 = LPlanos.find((filtro1) => filtro1.CodPlano === Item.Vinculo);
		if (filtro2)
			if (filtro2.UrnWeb !== proyects.Urn) {
				//alert(filtro2.UrnWeb + ' ' + proyects.Urn);



				/*dispatch(SelectUrn(filtro2.UrnWeb));*/
			}

		var cadenaMostrar = "";
		if (Item.UniqueId === "") {
			//proyects.DataMetrado
			const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === Item.CodMedicion);
			//console.log('Datos de metrados filtrados');
			//console.log(filtro);

			for (let i = 0; i < filtro.length; i++) {
				if (filtro[i].Tipo === "Medicion") {
					if (cadenaMostrar === "")
						cadenaMostrar = filtro[i].UniqueId;
					else
						cadenaMostrar = cadenaMostrar + ',' + filtro[i].UniqueId;
				} else {
					//buscar los datos de los hijos
					var CadenaAux = ObtenerCadena(filtro[i]);
					if (cadenaMostrar === "")
						cadenaMostrar = CadenaAux;
					else
						cadenaMostrar = cadenaMostrar + ',' + CadenaAux;
				}


			}

			MostarModelo(cadenaMostrar);
			//console.log(cadenaMostrar);


		} else
			MostarModelo(Item.UniqueId);

		//const selectedData = e.component.getSelectedRowsData(state.selectionMode);
		/*setState({
		  selectedRowKeys: e.selectedRowKeys,

		  //selectedEmployeeNames: this.getEmployeeNames(selectedData)
		});*/
	}


	/*useEffect(() => {
		dispatch(SelectUrn('dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x'));
	},[])*/


	function itemClick(e) {
		if (!e.itemData.items) {
			//notify(`The "${ e.itemData.text }" item was clicked`, 'success', 1500);
			

			if (e.itemData.text === 'Partida ') {
				
			}



		}
	}

	function roundN(num, n) {
		return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
	}


	function ItemTemplate(e) {
		return (
		  <>
			<span className={ e.icon } />			
			{ `  ` + e.text }
			{ e.items ? <span className="dx-icon-spinright" style={{marginLeft:'25px'}}/> : null }
		  </>
		);
	  }

	  function getRandomString(length) {
		var s = '';
		do { s += Math.random().toString(36).substr(2); } while (s.length < length);
		s = s.substr(0, length);

		return s;
	}


function itemClick(e) {
		
	if (!e.itemData.items) {

		if (!proyects.DatosPresupuesto || !proyects.DatosPresupuesto[0]) return;
		if (proyects.Sub_sel === '') {
			Swal.fire({
				title: 'Error!',
				text: 'Debe seleccionar un SubPresupuesto',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
			return;
		}
		

		if (e.itemData.text === 'Agregar Item Personalizado') { //CUANDO ESTA VACIO
		
			if (itemSel?.Unidad===null){
				Swal.fire({
					title: 'Error!',
					text: 'Debe seleccionar una partida',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
				return;
			}

			let personalizado = proyects.DataMetrado.find((filtro1) => filtro1.Descripcion === 'Metrados Personalizados');

			if (personalizado){

				let Nivt=2;
				let idpadre=personalizado.CodMedicion;
				var ItemN1 = {
					ActualizacionFecha: "2021-09-20T17:34:39.247",
					ActualizacionUsuario: "ctorres",
					Alto: "",
					Ancho: "",
					Cantidad: "1.00",
					CodMedicion: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-08-07T19:48:30.723",
					CreacionUsuario: "ctorres@s10peru.com",
					Descripcion: "Nuevo Item",
					Detalle: "Metrado de Nivel " + Nivt,
					Item: itemSel?.Item,
					Longitud: "",
					Nivel: Nivt,
					Posicion: 1,
					PhantomParentId: idpadre,
					Tipo: "Medicion",
					Total: "1.00",
					UniqueId: "",
					Vinculo: "Personalizado",
				};
				dispatch(agregaMetrado(ItemN1));
				dispatch(guardarMedicion(ItemN1.CodPresupuesto,ItemN1.CodSubpresupuesto,ItemN1.Item,ItemN1.CodMedicion,ItemN1.Descripcion,ItemN1.Cantidad,ItemN1.Longitud,ItemN1.Ancho,ItemN1.Alto,ItemN1.Total,ItemN1.Detalle,ItemN1.Vinculo,ItemN1.UniqueId,ItemN1.PhantomParentId,ItemN1.Nivel,ItemN1.Tipo,ItemN1.Posicion,''));				
				SetfocusedRowKey(ItemN1.CodMedicion);

				let padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === ItemN1.PhantomParentId);
				//console.log('resultado de filtro'); console.log(padre)
				let totalp=parseFloat(padre.Total)+1;
				padre.Total=roundN(totalp,2);	
				dispatch(actualizaMetrado(padre));
				dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));





			}else{

				let Nivt=1;
				let idpadre=null;
				var ItemN = {
					ActualizacionFecha: "2021-09-20T17:34:39.247",
					ActualizacionUsuario: "ctorres",
					Alto: "",
					Ancho: "",
					Cantidad: "",
					CodMedicion: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-08-07T19:48:30.723",
					CreacionUsuario: "ctorres@s10peru.com",
					Descripcion: "Metrados Personalizados",
					Detalle: "Titulo de Nivel " + Nivt,
					Item: itemSel?.Item,
					Longitud: "",
					Nivel: Nivt,
					Posicion: 1,
					PhantomParentId: idpadre,
					Tipo: "Titulo",
					Total: "1.00",
					UniqueId: "",
					Vinculo: "Personalizado",
				};
				dispatch(agregaMetrado(ItemN));
				dispatch(guardarMedicion(ItemN.CodPresupuesto,ItemN.CodSubpresupuesto,ItemN.Item,ItemN.CodMedicion,ItemN.Descripcion,ItemN.Cantidad,ItemN.Longitud,ItemN.Ancho,ItemN.Alto,ItemN.Total,ItemN.Detalle,ItemN.Vinculo,ItemN.UniqueId,ItemN.PhantomParentId,ItemN.Nivel,ItemN.Tipo,ItemN.Posicion,''));
				Nivt=2;
				idpadre=ItemN.CodMedicion;
				var ItemN1 = {
					ActualizacionFecha: "2021-09-20T17:34:39.247",
					ActualizacionUsuario: "ctorres",
					Alto: "",
					Ancho: "",
					Cantidad: "1.00",
					CodMedicion: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-08-07T19:48:30.723",
					CreacionUsuario: "ctorres@s10peru.com",
					Descripcion: "Nuevo Item",
					Detalle: "Metrado de Nivel " + Nivt,
					Item: itemSel?.Item,
					Longitud: "",
					Nivel: Nivt,
					Posicion: proyects.DataMetrado.length+2,
					PhantomParentId: idpadre,
					Tipo: "Medicion",
					Total: "1.00",
					UniqueId: "",
					Vinculo: "Personalizado",
				};
				dispatch(agregaMetrado(ItemN1));
				dispatch(guardarMedicion(ItemN1.CodPresupuesto,ItemN1.CodSubpresupuesto,ItemN1.Item,ItemN1.CodMedicion,ItemN1.Descripcion,ItemN1.Cantidad,ItemN1.Longitud,ItemN1.Ancho,ItemN1.Alto,ItemN1.Total,ItemN1.Detalle,ItemN1.Vinculo,ItemN1.UniqueId,ItemN1.PhantomParentId,ItemN1.Nivel,ItemN1.Tipo,ItemN1.Posicion,''));
				SetfocusedRowKey(ItemN1.CodMedicion);
			}


		
		
		
		}



				
		if (e.itemData.text === 'Agregar Item Metrado') { //CUANDO ESTA VACIO

			if (itemSel?.Unidad===null){
				Swal.fire({
					title: 'Error!',
					text: 'Debe seleccionar una partida',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
				return;
			}


			if (proyects.DataMetrado.length===0) {

				//TENGO QUE AGREGAR METRADOS PERSONALIZADOS Y UN ITEM
				
				let Nivt=1;
				let idpadre=null;
				var ItemN = {
					ActualizacionFecha: "2021-09-20T17:34:39.247",
					ActualizacionUsuario: "ctorres",
					Alto: "",
					Ancho: "",
					Cantidad: "",
					CodMedicion: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-08-07T19:48:30.723",
					CreacionUsuario: "ctorres@s10peru.com",
					Descripcion: "Metrados Personalizados",
					Detalle: "Titulo de Nivel " + Nivt,
					Item: itemSel?.Item,
					Longitud: "",
					Nivel: Nivt,
					Posicion: 1,
					PhantomParentId: idpadre,
					Tipo: "Titulo",
					Total: "1.00",
					UniqueId: "",
					Vinculo: "Personalizado",
				};

				dispatch(agregaMetrado(ItemN));
				dispatch(guardarMedicion(ItemN.CodPresupuesto,ItemN.CodSubpresupuesto,ItemN.Item,ItemN.CodMedicion,ItemN.Descripcion,ItemN.Cantidad,ItemN.Longitud,ItemN.Ancho,ItemN.Alto,ItemN.Total,ItemN.Detalle,ItemN.Vinculo,ItemN.UniqueId,ItemN.PhantomParentId,ItemN.Nivel,ItemN.Tipo,ItemN.Posicion,''));


				Nivt=2;
				idpadre=ItemN.CodMedicion;
				var ItemN1 = {
					ActualizacionFecha: "2021-09-20T17:34:39.247",
					ActualizacionUsuario: "ctorres",
					Alto: "",
					Ancho: "",
					Cantidad: "1.00",
					CodMedicion: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-08-07T19:48:30.723",
					CreacionUsuario: "ctorres@s10peru.com",
					Descripcion: "Nuevo Item",
					Detalle: "Metrado de Nivel " + Nivt,
					Item: itemSel?.Item,
					Longitud: "",
					Nivel: Nivt,
					Posicion: proyects.DataMetrado.length+2,
					PhantomParentId: idpadre,
					Tipo: "Medicion",
					Total: "1.00",
					UniqueId: "",
					Vinculo: "Personalizado",
				};

				dispatch(agregaMetrado(ItemN1));
				dispatch(guardarMedicion(ItemN1.CodPresupuesto,ItemN1.CodSubpresupuesto,ItemN1.Item,ItemN1.CodMedicion,ItemN1.Descripcion,ItemN1.Cantidad,ItemN1.Longitud,ItemN1.Ancho,ItemN1.Alto,ItemN1.Total,ItemN1.Detalle,ItemN1.Vinculo,ItemN1.UniqueId,ItemN1.PhantomParentId,ItemN1.Nivel,ItemN1.Tipo,ItemN1.Posicion,''));


				SetfocusedRowKey(ItemN1.CodMedicion);

				return;
			}

		}
		

		

		if (e.itemData.text === 'Agregar Item') {

			
			if (itemSel?.Unidad===null){
				Swal.fire({
					title: 'Error!',
					text: 'Debe seleccionar una partida',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
				return;
			}


			if (proyects.DataMetrado.length===0) {

				//TENGO QUE AGREGAR METRADOS PERSONALIZADOS Y UN ITEM


				return;
			}
			
			
			console.log(itemMetradoSel)
			let Nivt=1;
			let idpadre='';
			if (itemMetradoSel.Tipo==='Medicion'){
				Nivt= parseInt(itemMetradoSel.Nivel);
				idpadre=itemMetradoSel.PhantomParentId;
			}
			if (itemMetradoSel.Tipo==='Titulo'){
				Nivt= parseInt(itemMetradoSel.Nivel)+1;
				idpadre=itemMetradoSel.CodMedicion;
			}

			var ItemN = {
				ActualizacionFecha: "2021-09-20T17:34:39.247",
				ActualizacionUsuario: "ctorres",
				Alto: "",
				Ancho: "",
				Cantidad: "1.00",
				CodMedicion: getRandomString(24),
				CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
				CodSubpresupuesto: proyects.Sub_sel,
				CreacionFecha: "2021-08-07T19:48:30.723",
				CreacionUsuario: "ctorres@s10peru.com",
				Descripcion: "Nuevo Item",
				Detalle: "Metrado de Nivel " + Nivt,
				Item: itemSel?.Item,
				Longitud: "",
				Nivel: Nivt,
				Posicion: proyects.DataMetrado.length+2,
				PhantomParentId: idpadre,
				Tipo: "Medicion",
				Total: "1.00",
				UniqueId: "",
				Vinculo: "Personalizado",
			};


			dispatch(agregaMetrado(ItemN));
			dispatch(guardarMedicion(ItemN.CodPresupuesto,ItemN.CodSubpresupuesto,ItemN.Item,ItemN.CodMedicion,ItemN.Descripcion,ItemN.Cantidad,ItemN.Longitud,ItemN.Ancho,ItemN.Alto,ItemN.Total,ItemN.Detalle,ItemN.Vinculo,ItemN.UniqueId,ItemN.PhantomParentId,ItemN.Nivel,ItemN.Tipo,ItemN.Posicion,''));

			let padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === ItemN.PhantomParentId);
			//console.log('resultado de filtro'); console.log(padre)
			let totalp=parseFloat(padre?.Total)+1;
			padre.Total=roundN(totalp,2);

			dispatch(actualizaMetrado(padre));
			dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));


			while(padre.PhantomParentId!==null){

				padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === padre.PhantomParentId);
				//console.log('resultado de filtro'); console.log(padre)
				const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === padre.CodMedicion);
				var Sumatoria = 0.00;
				for (let i = 0; i < filtro.length; i++) {
						Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
				}
				padre.Total=roundN(Sumatoria,2);
				dispatch(actualizaMetrado(padre));
				dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));
			}

			SetfocusedRowKey(ItemN.CodMedicion);
		}







		if (e.itemData.text === 'Agregar Título') {


			if (proyects.DataMetrado.length===0) {

				Swal.fire({
					title: 'Error!',
					text: 'No puede agregarse titulo en este Item',
					icon: 'error',
					confirmButtonText: 'Ok'
				})


				return;
			}

			if (itemSel?.Unidad===null){
				Swal.fire({
					title: 'Error!',
					text: 'Debe seleccionar una partida',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
				return;
			}


			console.log(itemMetradoSel)
			let Nivt=1;
			let idpadre='';
			if (itemMetradoSel.Tipo==='Medicion'){
				Nivt= parseInt(itemMetradoSel.Nivel);
				idpadre=itemMetradoSel.PhantomParentId;
			}
			if (itemMetradoSel.Tipo==='Titulo'){
				Nivt= parseInt(itemMetradoSel.Nivel)+1;
				idpadre=itemMetradoSel.CodMedicion;
			}

			var ItemN = {
				ActualizacionFecha: "2021-09-20T17:34:39.247",
				ActualizacionUsuario: "ctorres",
				Alto: "",
				Ancho: "",
				Cantidad: "",
				CodMedicion: getRandomString(24),
				CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
				CodSubpresupuesto: proyects.Sub_sel,
				CreacionFecha: "2021-08-07T19:48:30.723",
				CreacionUsuario: "ctorres@s10peru.com",
				Descripcion: "Nuevo Titulo",
				Detalle: "Titulo de Nivel " + Nivt,
				Item: itemSel?.Item,
				Longitud: "",
				Nivel: Nivt,
				Posicion: proyects.DataMetrado.length+2,
				PhantomParentId: idpadre,
				Tipo: "Titulo",
				Total: "0.00",
				UniqueId: "",
				Vinculo: "Personalizado",
			};


			dispatch(agregaMetrado(ItemN));
			dispatch(guardarMedicion(ItemN.CodPresupuesto,ItemN.CodSubpresupuesto,ItemN.Item,ItemN.CodMedicion,ItemN.Descripcion,ItemN.Cantidad,ItemN.Longitud,ItemN.Ancho,ItemN.Alto,ItemN.Total,ItemN.Detalle,ItemN.Vinculo,ItemN.UniqueId,ItemN.PhantomParentId,ItemN.Nivel,ItemN.Tipo,ItemN.Posicion,''));

			/*let padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === ItemN.PhantomParentId);
			let totalp=parseFloat(padre.Total)+1;
			padre.Total=roundN(totalp,2);

			dispatch(actualizaMetrado(padre));
			dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,''));


			while(padre.PhantomParentId!==null){

				padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === padre.PhantomParentId);
				//console.log('resultado de filtro'); console.log(padre)
				const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === padre.CodMedicion);
				var Sumatoria = 0.00;
				for (let i = 0; i < filtro.length; i++) {
						Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
				}
				padre.Total=roundN(Sumatoria,2);
				dispatch(actualizaMetrado(padre));
				dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,''));
			}*/


			SetfocusedRowKey(ItemN.CodMedicion);

		}


		if (e.itemData.text === 'Eliminar') {
		
			if (proyects.DataMetrado.length===0) return;
			if (itemMetradoSel.CodMedicion===undefined) return;



			const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: 'btn btn-dark',
			  cancelButton: 'btn btn-light'
			},
			buttonsStyling: false
		  })
		  
		if (itemMetradoSel.Tipo==='Titulo'){
			//idpadre=itemMetradoSel.CodMedicion;
			if (itemMetradoSel.Total!=='0.00'){
				Swal.fire({
					title: 'Error!',
					text: 'No puede eliminar un elemento con detalle, Elimine primero su detalle',
					icon: 'error',
					confirmButtonText: 'Ok'
				})
				return;
			}
			
		}




		  swalWithBootstrapButtons.fire({
			title: 'Estas Seguro de eliminar este elemento ' + itemMetradoSel.Descripcion +'  ?',
			text: "Esta acción no podrá ser revertida!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminarlo!',
			cancelButtonText: 'No, salir!',
			reverseButtons: true
		  }).then((result) => {
			if (result.isConfirmed) {
				



				if (itemMetradoSel.Descripcion==='Metrados Personalizados'){

					dispatch(eliminarXCodigo('Medicion', itemMetradoSel.CodMedicion,''))
					dispatch(borraMetrado(itemMetradoSel))
					const ItemsM2 = [
						{ text: 'Agregar Item Metrado', icon:'dx-icon-add' },
					];
					setItemsMenu(ItemsM2);

				}else{

					let padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === itemMetradoSel.PhantomParentId);
					//console.log('resultado de filtro'); console.log(padre)
					const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === padre.CodMedicion);
					var Sumatoria = 0.00;
					for (let i = 0; i < filtro.length; i++) {
						if (filtro[i].CodMedicion!==itemMetradoSel.CodMedicion)
							Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
						//else{}
					}
					padre.Total=roundN(Sumatoria,2);
					dispatch(actualizaMetrado(padre));
					dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));
	
	
					while(padre.PhantomParentId!==null){
						padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === padre.PhantomParentId);
						const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === padre.CodMedicion);
						var Sumatoria = 0.00;
						for (let i = 0; i < filtro.length; i++) {
								Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
						}
						padre.Total=roundN(Sumatoria,2);
						dispatch(actualizaMetrado(padre));
						dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));
					}
	
					dispatch(eliminarXCodigo('Medicion', itemMetradoSel.CodMedicion,''))
					dispatch(borraMetrado(itemMetradoSel))
	
					SetfocusedRowKey(padre.CodMedicion);

				}


				//dispatch(eliminaAsociado(proyects.filaAsociadoSel.Data.CodAsociado));

				swalWithBootstrapButtons.fire(
					'Borrado!',
					'Su registro ha sido eliminado.',
					'success'
				  )
				
				//localStorage.setItem("EliminadoResp", resp[0].Response);

			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  swalWithBootstrapButtons.fire(
				'Accion cancelada',
				'No se hanb realizado Cambios :)',
				'error'
			  )
			}
		  })

		}


	

		/*{ text: 'Agregar Item', icon:'dx-icon-add' },
				{ text: 'Agregar Título', icon:'dx-icon-startswith' },
				{ text: 'Eliminar', icon:'dx-icon-remove' },*/

		



	}
}






	return (
		<>
			{/*<Bar />*/}

			<TreeList
				id="ListaMet"
				dataSource={proyects.DataMetrado}
				keyExpr="CodMedicion"
				parentIdExpr="PhantomParentId"
				showBorders={true}
				focusedRowEnabled={true}
          		focusedRowKey={focusedRowKey}
				defaultExpandedRowKeys={[1, 2, 3, 5]}
				columnAutoWidth={false}
				rootValue={-1}
				showRowLines={true}
				showColumnLines={true}

				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}
				onFocusedRowChanged={onSelectionChanged}


				onCellClick={(e) => {
					//console.log('OncellClick');console.log(e)
					
					setItemMetradoSel(e?.data);


					//console.log('focused');console.log(focusedRowKey)
					//alert(e.rowIndex);
					//alert(filaAct);
					
					//setCodsele(e.data?.CodAsociado)
				
				}}

				onEditorPreparing={(e) => {
					//console.log('preparando para educion row'); console.log(e)
					if (e.row.data.Vinculo !== 'Personalizado' || e.row.data.Descripcion === 'Metrados Personalizados') {
						//alert('si es nulo')
						//e.allowEditing=false;
						//e.editorOptions.disabled=true;
						//e.editorElement.hidden=true;
						//e.editorElement.clientLeft=25;
						//e.editorElement.offsetLeft=25;
						//e.editorOptions.readOnly=true;
						e.editorOptions.disabled = true;
						//e.cancel=true;
					}

					if (e.caption !== 'Descripcion' && e.row.data.Vinculo === 'Personalizado' && e.row.data.Tipo === 'Titulo') {
						e.editorOptions.disabled = true;
					}


				}}


				
				onRowUpdated={(e) => {
					console.log(e)


					if (e.data.Tipo==='Medicion'){

						if (isNaN(e.data.Cantidad))e.data.Cantidad='1.00';
						if (isNaN(e.data.Longitud))e.data.Longitud='';
						if (isNaN(e.data.Ancho))e.data.Ancho='';
						if (isNaN(e.data.Alto))e.data.Alto='';
	
						if ((e.data.Cantidad.trim()===''))e.data.Longitud='1.00';
						if ((e.data.Longitud.trim()===''))e.data.Longitud='';
						if ((e.data.Ancho).trim()==='')e.data.Ancho='';
						if ((e.data.Alto).trim()==='')e.data.Alto='';
	
	
						let Cant=1.0;let Long=1.0;let Ancho=1.0;let Alto=1.0;let Total=0.0;
	
						if (e.data.Cantidad==='' || e.data.Cantidad===null){
							Cant=1;
						}else{
							Cant=parseFloat(e.data.Cantidad);
							e.data.Cantidad=roundN(Cant,2);
						}
						
	
						if (e.data.Longitud==='' || e.data.Longitud===null){
							Long=1;
						}else{
							Long=parseFloat(e.data.Longitud);
							e.data.Longitud=roundN(Long,2);
						}
						
	
						if (e.data.Ancho==='' || e.data.Ancho===null){
							Ancho=1;
						}else{
							Ancho=parseFloat(e.data.Ancho);
							e.data.Ancho=roundN(Ancho,2);
						}
						
	
						if (e.data.Alto==='' || e.data.Alto===null){
							Alto=1;
						}else{
							Alto=parseFloat(e.data.Alto);
							e.data.Alto=roundN(Alto,2);
						}
						
	
						Total=Cant*Long*Ancho*Alto;
						e.data.Total=roundN(Total,2);
					
						//(Presupuesto, SubPresupuesto, Item, CodMedicion, Descripcion, Cantidad, Longitud, Ancho, Alto, Total, Detalle, Vinculo, UniqueId, PhantomParentId, Nivel, Tipo, userId) => {
						dispatch(guardarMedicion(e.data.CodPresupuesto,e.data.CodSubpresupuesto,e.data.Item,e.data.CodMedicion,e.data.Descripcion,e.data.Cantidad,e.data.Longitud,e.data.Ancho,e.data.Alto,e.data.Total,e.data.Detalle,e.data.Vinculo,e.data.UniqueId,e.data.PhantomParentId,e.data.Nivel,e.data.Tipo,e.data.Posicion,''));
	
						let MetradoPers=0.0;
	
						let padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === e.data.PhantomParentId);
						//console.log('resultado de filtro'); console.log(padre)
						const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === padre.CodMedicion);
						var Sumatoria = 0.00;
						for (let i = 0; i < filtro.length; i++) {
							if (filtro[i].CodMedicion!==e.key)
								Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
							else{
								Sumatoria = Sumatoria + Total;
							}
						}
						padre.Total=roundN(Sumatoria,2);
						MetradoPers=roundN(Sumatoria,2);
						dispatch(actualizaMetrado(padre));
						dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));
	
	
						while(padre.PhantomParentId!==null){
	
							padre = proyects.DataMetrado.find((filtro1) => filtro1.CodMedicion === padre.PhantomParentId);
							//console.log('resultado de filtro'); console.log(padre)
							const filtro = proyects.DataMetrado.filter((filtro1) => filtro1.PhantomParentId === padre.CodMedicion);
							var Sumatoria = 0.00;
							for (let i = 0; i < filtro.length; i++) {
									Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
							}
							padre.Total=roundN(Sumatoria,2);
							MetradoPers=roundN(Sumatoria,2);
							dispatch(actualizaMetrado(padre));
							dispatch(guardarMedicion(padre.CodPresupuesto,padre.CodSubpresupuesto,padre.Item,padre.CodMedicion,padre.Descripcion,padre.Cantidad,padre.Longitud,padre.Ancho,padre.Alto,padre.Total,padre.Detalle,padre.Vinculo,padre.UniqueId,padre.PhantomParentId,padre.Nivel,padre.Tipo,padre.Posicion,''));
						}
	



						let FiltosTitulos = proyects.DataMetrado.filter((filtro1) => filtro1.Tipo === 'Titulo' && filtro1.Vinculo !== 'Personalizado' && filtro1.Nivel === 1);
						let sumatoria=0;

						for (let i=0;i<FiltosTitulos.length;i++){
							sumatoria+=parseFloat(FiltosTitulos[i].Total);
						}

						console.log('ESTOS SON MIS TITULOS');
						console.log(FiltosTitulos);

						console.log('ESTA ES LA SUMATORIA DE MI METRADO');
						console.log(sumatoria);

						sumatoria+=parseFloat(MetradoPers);

						console.log('ESTE ES MI METRADO TOTAL  ========>>>>>>>>');
						console.log(sumatoria);

						

						dispatch(guardarMetrado(proyects.DatosPresupuesto[0].CodPresupuesto,proyects.Sub_sel,itemSel?.Item, sumatoria,''));
						dispatch(guardarCantidadMetrado(proyects.DatosPresupuesto[0].CodPresupuesto,proyects.Sub_sel,itemSel?.Item, proyects.DataMetrado.length,''))

						//actualizar mi metrado en Items DataPC 
						//console.log(proyects.DataPc);

						let elementoCambiar = proyects.DataPc.find((filtro1) => filtro1.CodPresupuesto === proyects.DatosPresupuesto[0].CodPresupuesto && filtro1.CodSubpresupuesto === proyects.Sub_sel && filtro1.Item === itemSel?.Item);
						if (elementoCambiar){

							elementoCambiar.Metrado=roundN(sumatoria,2);
							elementoCambiar.CantidadMetrado=proyects.DataMetrado.length;
							dispatch(modificaItem(elementoCambiar));
							
							
							setDataItems([...dataItems.filter((filtro1) => filtro1.ERPCode !== elementoCambiar.ERPCode ), elementoCambiar])
							
							
							
							//DataPC: .sort((a, b) => a.Secuencial - b.Secuencial)
							/*setTimeout(() => {
								//setCalculaMetrado(calculametrado+1);	
							}, 400);*/
						}






					}

					if (e.data.Tipo==='Titulo'){
						dispatch(guardarMedicion(e.data.CodPresupuesto,e.data.CodSubpresupuesto,e.data.Item,e.data.CodMedicion,e.data.Descripcion,e.data.Cantidad,e.data.Longitud,e.data.Ancho,e.data.Alto,e.data.Total,e.data.Detalle,e.data.Vinculo,e.data.UniqueId,e.data.PhantomParentId,e.data.Nivel,e.data.Tipo,e.data.Posicion,''));
					}

					/*for (let i = 0; i < proyects.DataMetrado.length; i++) {
						if (proyects.DataMetrado[i].CodMedicion===padre.CodMedicion)
							proyects.DataMetrado[i].Total=roundN(Sumatoria,2);
					}*/
					
			
					//console.log(Sumatoria); 
					

					/*ActualizacionFecha: "2021-08-07T19:48:30.727"
					ActualizacionUsuario: "ctorres@s10peru.com"
					Alto: ""
					Ancho: "2.50"
					Cantidad: "1.00"
					CodMedicion: "s1rKutpE0UG0BZTnd26rKA=="
					CodPresupuesto: "0501001"
					CodSubpresupuesto: "001"
					CreacionFecha: "2021-08-07T19:48:30.727"
					CreacionUsuario: "ctorres@s10peru.com"
					Descripcion: "Nuevo nombre"
					Detalle: "Metrado de Nivel 2"
					Item: "000000000000034"
					Longitud: "1.20"
					Nivel: 2
					Ordenado: 1428
					PhantomParentId: "Eh8gqPymi0qNiwg64HcnVQ=="
					Tipo: "Medicion"
					Total: "3.00"
					UniqueId: ""
					Vinculo: "Personalizado"*/


				}}


				wordWrapEnabled={true}
			>
			

				<Editing
					allowUpdating={true}
					allowDeleting={false}
					selectTextOnEditStart={true}
					useIcons={true}
					mode='cell'
				/>
				<HeaderFilter
					visible={true}
				/>
				
				<FilterPanel
					visible={false}
				/>

				<FilterRow
					visible={false}
				/>
			
				<Scrolling
					mode="standard"
				/>
				<Sorting
					mode="singular"
				/>
				<Column
					width={'0%'}
					dataField="Posicion"
					defaultSortOrder="asc"
					caption="OrdenJ"
					visible={false}
				/>
				<Column
					width={'8%'}
					//dataField="" 
					cellTemplate="Template"
				/>

				<Column
					width={'35%'}
					dataField="Descripcion"
					cellTemplate="Template"
					allowEditing={true}
				/>
				<Column
					width={'10%'}
					dataField="Cantidad"
					alignment={'right'}
					cellTemplate="Template"
					allowEditing={true}
				/>
				<Column
					width={'10%'}
					dataField="Longitud"
					caption="Longitud"
					alignment={'right'}
					cellTemplate="Template"
					allowEditing={true}
				/>

				<Column
					width={'10%'}
					dataField="Ancho"
					alignment={'right'}
					cellTemplate="Template"
					allowEditing={true}
				/>

				<Column
					width={'10%'}
					dataField="Alto"
					alignment={'right'}
					cellTemplate="Template"
					allowEditing={true}
				/>

				<Column
					width={'10%'}
					dataField="Total"
					alignment={'right'}
					cellTemplate="Template"
					allowEditing={false}
				/>

				<Column
					width={'20%'}
					dataField="Detalle"
					alignment={'center'}
					cellTemplate="Template"
					allowEditing={true}
				/>
				{/*<Column 
		  width={'10%'}
		dataField= "Vinculo" />		*/}

				<Pager
					allowedPageSizes={allowedPageSizes}
					showPageSizeSelector={true}
					showNavigationButtons={true}
				/>
				<Paging
					enabled={true}
					defaultPageSize={15}
				/>
				<Template name="Template" render={CellRend_Metrados} />
			
			</TreeList>

			<ContextMenu
				dataSource={itemsMenu}
				width={150}
				target="#ListaMet"
				onItemClick={itemClick}
				itemRender={ItemTemplate}
			/>
			
			{/*}	<Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
			>
				<thead>
					<tr>
						<th>Descripcion</th>
						<th>Cantidad</th>
						<th>Longitud</th>
						<th>Ancho</th>
						<th>Alto</th>
						<th>Total</th>
						<th>Detalle</th>
						<th>Vinculo</th>
						<th>UniqueId</th>
					</tr>
				</thead>
				<tbody>
					<>
						{
							drawerItems1(0)
						}
					</>
				</tbody>
					</Table>*/}

		</>
	)
}

export default Metrados
