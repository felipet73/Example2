
import { useSelector, useDispatch } from 'react-redux';
import Button1 from 'devextreme-react/button';
import $ from 'jquery';
import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column
} from 'devextreme-react/tree-list';
import { useEffect, useState } from 'react';
import { ContextMenu, Template, TextBox } from 'devextreme-react';


import { selectAPUSCATALOGOSUBP } from '../actions/proyects.actions';
import  { CellRend28 } from './Cellrend';
import ApusDetSubp from './ApusDetSubp';
import { Resizable } from 're-resizable';
import { Collapse } from '@material-ui/core';
import GrupoCellSub from './GrupoCellSub';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
	return (
	  <Draggable
		handle="#draggable-dialog-title"
		cancel={'[class*="MuiDialogContent-root"]'}
	  >
		<Paper {...props} />
	  </Draggable>
	);
  }



const DetalleSubPartida = ({ tipo='',presupuestoN,show, setShow, DatoActual }) => {
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	
	const proyects = useSelector((state) => state.proyects);
	//dispatch(selectAPUS(codP, codSub, codItem, ''));

	const [ubicacionSel, setUbicacionSel] = useState({
		Codigo: '',
		Descripcion: '',
	});

	/*const [pagina, setPagina] = useState(1);
	const [tpagina, setTPagina] = useState(1);
	const [textoB, setTextoB] = useState('');*/

	const [open, setOpen] = useState(true);
	const [width, setWidth] = useState('100%');

	const [open1, setOpen1] = useState(true);
	const [height, setHeight] = useState('100%');


	const [sumasApu, setSumasApu] = useState({S_mo:'0.00',S_mat:'0.00',S_eq:'0.00',S_subc:'0.00',S_subp:'0.00',TotalPU:'0.00'});

	const [rendimientoMO, setRendimientoMO] = useState('0.00');
	const [rendimientoEQ, setRendimientoEQ] = useState('0.00');

	const [Pseleccionada, setPseleccionada] = useState(null);

	//const NombreDatoActual = useRef('');
	const [NombreDatoActual, setNombreDatoActual] = useState('');

	const seleccionar = () => {

		if (ubicacionSel.Descripcion === '') {

			//mensaje de error 
			return;
		}
		/*if (tipo===''){
			proyects.DatosPresupuesto[0].CodLugar = ubicacionSel.Codigo;
			proyects.DatosPresupuesto[0].UbicacionGeografica = ubicacionSel.Descripcion;
		}else
		{*/
			presupuestoN.CodLugar = ubicacionSel.Codigo;
			presupuestoN.UbicacionGeografica = ubicacionSel.Descripcion;
		//}
		
		//proyects.DatosPresupuesto[0].CodCliente=clienteSel.Codigo;
		//proyects.DatosPresupuesto[0].Cliente=clienteSel.Descripcion;

		setShow(false);
	}


	
	/*useEffect(() => {
		var paginas = localStorage.getItem("paginacion");
		var arrayDeCadenas = [];
		if (paginas)
		arrayDeCadenas = paginas.split('/');

		var totalesp = Math.trunc((arrayDeCadenas[1] / 20));
		if (arrayDeCadenas[1] % 20 !== 0) {
			totalesp = totalesp + 1;
		}
		//alert((arrayDeCadenas[1]/arrayDeCadenas[0]));
		//alert(totalesp);
		setTPagina(totalesp);

	}, [proyects.DataUbicaciones, textoB])*/


	/*const valueChanged = (data) => {
		/*setState({
		  emailValue: `${data.value.replace(/\s/g, '').toLowerCase() }@corp.com`
		});
		setTextoB(data.value);
		//dispatch(limpiaUbicaciones()); 
		dispatch(selectUBICACIONES(data.value, '20', 1, ''));
		setPagina(1);
	}

	const handleChange = (event, value) => {
		setPagina(value);
		//dispatch(limpiaUbicaciones()); 
		dispatch(selectUBICACIONES(textoB, '20', value, ''));
	};*/
	useEffect(() => {
		
		if (proyects.DataArbolSubpartidas.length > 0){
			for (let i=0;i<proyects.DataArbolSubpartidas.length;i++){
				//alert(DatoActual.current.Descripcion + ' ' + proyects.DataArbolSubpartidas[i].Descripcion)
				if (proyects.DataArbolSubpartidas[i].Descripcion===DatoActual?.current?.Descripcion){
					
					//Pseleccionada.current=[proyects.DataArbolSubpartidas[i].OrdenJerarquico];
					setPseleccionada(proyects.DataArbolSubpartidas[i].OrdenJerarquico)
					
					//alert(proyects.DataArbolSubpartidas[i].OrdenJerarquico)
					//setPseleccionada([proyects.DataArbolSubpartidas[i].OrdenJerarquico]);
					//alert(Pseleccionada.current)
				}

			}

		}

	}, [proyects.DataArbolSubpartidas])


	function ItemTemplate(e) {
		return (
			<>
				<span className={e.icon} />
				{ `  ` + e.text}
				{ e.items ? <span className="dx-icon-spinright" style={{ marginLeft: '25px' }} /> : null}
			</>
		);
	}

	return (
		<>

<Dialog
				open={show}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
				maxWidth={false}
			>
				<DialogTitle style={{ cursor: 'move', background:'#398bf7', color:'white', marginBottom:'10px', height:'50px' }} id="draggable-dialog-title">
				Detalle de SubPartida
				<Button1 
						variant="primary"
						onClick={handleClose}
						style={{ position:'absolute', right:'15px', top:'8px',background: '#398bf7', color: 'white'}}
						><i class="fas fa-times"></i>
					</Button1>
        		</DialogTitle>
				
				<DialogContent>
					<DialogContentText>
					<Resizable
					id="RPrincipal22"
					className="p-0 d-flex justify-content-between"
					size={{ width: width, height: height - 20 }}
					enable={{ top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
					maxWidth={open ? '100%' : 20}
					maxHeight={window.innerHeight - 80}
					minWidth={500}
					minHeight="320px"
					onResizeStart={(e, direction, ref, d) => {
					}}
					onResizeStop={(e, direction, ref, d) => {
						setHeight(height + d.height);
						if (open1) {
							$("#barra22").animate({ top: height + d.height -25 }, 0);
							if (height + d.height > window.innerHeight - 120) {
								setHeight(window.innerHeight - 250);
								//$("#barra22").animate({ top: height + 250 + d.height +22 }, 0);
								$("#barra22").animate({ top: window.innerHeight - 250 -25 }, 0);
							}
						}
					}}
					onResize={(e, direction, ref, d) => {
						$("#barra22").animate({ top: height + d.height - 25  }, 0);
						//$("#barra22").animate({ top: height + d.height + 10 }, 0);
						$("#ContDet22").animate({ top: height + d.height + 25 }, 0);
						$("#ContDet22").animate({ height: 30 }, 0);
						if (open1) { }
					}}
				>
				
						
				<TreeList
				id="TreeGrpsP"	
				dataSource={proyects.DataArbolSubpartidas}
				keyExpr="OrdenJerarquico"
				parentIdExpr="PhantomParentId"
				showBorders={true}
				focusedRowEnabled={true}
				defaultExpandedRowKeys={['01']}
				//defaultSelectedRowKeys={Pseleccionada.current}
				//defaultFocusedRowKey={Pseleccionada ? Pseleccionada.current:''}
				//focusedRowKey={Pseleccionada}
				focusedRowKey={Pseleccionada}
				//selectedRowKeys={[CodPres.substring(0,10)]}
				//expandedRowKeys={arregloExp}
				columnAutoWidth={false}
				rootValue={-1}
				rowAlternationEnabled={true}
				headers={false}
				//selectedRowKeys={selectedRowKeys}
				//onCellClick={(e)=>{console.log(e)}}
				//onSelectionChanged={() => {alert('hola')}}
				
				autoExpandAll={true}
				onFocusedRowChanged={(e) => {
					
					//if (e.displayValue!==true && e.displayValue!==false){
					//if (e.columnIndex!==0 ){
					//alert()
						//alert(e.row.data.Descripcion);
					//console.log(e);
					setPseleccionada(e.component.option('focusedRowKey'));
					console.log(e);
					
					//alert(e.row.data.CodPartida)
					//dispatch(selectAPUSCATALOGOSUBP(DatoActual.current.CodPresupuestoR,'999',DatoActual.current.CodPartidaR,DatoActual.current.CodPresupuestoR,DatoActual.current.PropioPartidaR));
					dispatch(selectAPUSCATALOGOSUBP(DatoActual?.current?.CodPresupuestoR,'999',e.row.data.CodPartida,DatoActual?.current?.CodPresupuestoR,DatoActual?.current?.PropioPartidaR));
					//NombreDatoActual.current=e.row.data.Descripcion;
					setNombreDatoActual(e.row.data.Descripcion);
					
					//alert(e.row.data.Descripcion)
				}}
				wordWrapEnabled={true}
			>
				<Editing
					allowUpdating={false}
					allowDeleting={false}
					selectTextOnEditStart={true}
					useIcons={true}
				/>
				<HeaderFilter
					visible={false}
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
				<Column
					width={'20%'}
					dataField="CodPartida"
					caption="Codigo"
					cellTemplate="employeeTemplate"
				/>

				<Column
					width={'100%'}
					dataField="Descripcion"
					caption="Arbol de SubPartidas"
					cellTemplate="employeeTemplate1"
				/>
				<Column
					width={'10%'}
					dataField="Simbolo"
					caption="Unidad"
					cellTemplate="employeeTemplate1"
				/>

				<Pager
					//allowedPageSizes={allowedPageSizes}
					showPageSizeSelector={true}
					showNavigationButtons={true}
				/>

				<Paging
					enabled={true}
					defaultPageSize={500}
				/>
				<Template name="employeeTemplate" render={GrupoCellSub} />
				<Template name="employeeTemplate1" render={CellRend28} />
			</TreeList>
			{/* </div> */}
			<ContextMenu
				dataSource={{}}
				width={130}
				target="#TreeGrpsP"
				//onItemClick={itemClick}
				itemRender={ItemTemplate}
			/>





				</Resizable>
				<div
					id="barra22" className="bara-cerrar d-flex align-items-center barras"
					style={{
						position: 'absolute',
						//width: '98%',
						width: '98%',
						height: '2px',
						/*background: "#dee2e6",*/
						marginLeft: 0,
						top: height-20 ,
						background: 'transparent',
						borderStyle: 'none none double none',
						borderColor: '#c6c7d0',
						//borderRightWidth:'0.5px',
						//zIndex:'1',
					}}
				>
					<div
						style={{
							//cursor: "pointer", marginLeft: $("#ContDet2").innerWidth() / 2 - 80, width: '5px', height: '20px', zIndex: '1'
							cursor: "pointer", marginLeft: $("#RPrincipal22").innerWidth() / 2 - 80, width: '5px', height: '20px', zIndex: '1'
						}}
						className="h-0 "
						onClick={() => {
							setOpen1(!open1);
							if (!open1) {
								setHeight(window.innerHeight - 500);
								$("#barra22").animate({ top: window.innerHeight - 500 -28  }, 700);
								$("#RPrincipal22").animate({ height: window.innerHeight - 500 - 20 }, 700);
								$("#ContDet22").fadeOut(10);
								$("#ContDet22").fadeIn(2600);
							} else {
								$("#ContDet22").fadeOut(10);
								setHeight(window.innerHeight - 80 + 10);
								$("#barra22").animate({ top: window.innerHeight - 80 }, 700);
								$("#RPrincipal22").animate({ height: window.innerHeight - 80 }, 700);
							}
						}}
					>
						{open1 ? (
							<ion-icon name="chevron-down-outline" style={{ cursor: 'pointer', marginTop: '4px', color: 'black', borderColor: '#c6c7d0', marginLeft: '4px', background: 'white', zIndex: '2', width: '20px', height: '20px', borderRadius: '20px', borderStyle: 'solid', borderWidth: '0.5px', }}></ion-icon>
						) : (
							<ion-icon name="chevron-up-outline" style={{ cursor: 'pointer', color: 'black', borderColor: '#c6c7d0', marginLeft: '4px', background: 'white', zIndex: '2', width: '20px', height: '20px', borderRadius: '20px', borderStyle: 'solid', borderWidth: '0.5px' }}></ion-icon>
						)}
					</div>
				</div>

				<Collapse in={open1} style={{
					//height: '90%',
					background: 'transparent',
				}}>
					<div id="ContDet22" className="" style={{
						position: 'absolute', top: height -20, height: window.innerHeight - height - 80, width: '100%', left: '0px',
						background: 'transparent',
					}}>
						<div className="w-100" style={{}}>
							
								
						</div>
					</div>
				</Collapse>







					
					<div style={{ height: '25px', width: '100%', background: 'white'/*, boxShadow:'inset 0.8px 0.8px rgba(0,0,0,0.2)'*/, marginTop: '10px' }}>
						<spam style={{ position: 'absolute', marginTop: '8px', marginLeft: '5px', fontSize: '0.9rem' }}> PU: {sumasApu.TotalPU === undefined || !sumasApu.TotalPU ? '0.00' : sumasApu.TotalPU}</spam>
						<spam style={{ position: 'absolute', marginTop: '12px', marginLeft: '140px', fontSize: '0.65rem' }}> Rendimiento MO:
									<TextBox
								style={{ position: 'relative', marginLeft: '85px', marginTop: '-22px', width: '70px', height: '25px' }}
								defaultValue={rendimientoMO}
								value={rendimientoMO}
								rtlEnabled='true'
							//readOnly={true}
							></TextBox>
						</spam>
						<spam style={{ position: 'absolute', marginTop: '12px', marginLeft: '300px', fontSize: '0.65rem' }}> Rendimiento EQ:
									<TextBox
								style={{ position: 'relative', marginLeft: '85px', marginTop: '-22px', width: '70px', height: '25px' }}
								defaultValue={rendimientoEQ}
								value={rendimientoEQ}
								rtlEnabled='true'
							//readOnly={true}
							></TextBox>
							<spam style={{ position: 'absolute', marginLeft: '220px', marginTop: '-22px', width: '680px', height: '25px', color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem' }}>{'PARTIDA: '} {NombreDatoActual}</spam>
						</spam>
					</div>
					<div style={{ height: '25px', width: '100%', background: 'white'/*, boxShadow:'inset 0.8px 0.8px rgba(0,0,0,0.2)'*/, marginBottom: '3px' }}>
						<spam style={{ position: 'absolute', marginTop: '10px', left: '10px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Mano Obra: {sumasApu.S_mo === undefined || !sumasApu.S_mo ? '0.00' : sumasApu.S_mo}</spam>
						<spam style={{ position: 'absolute', marginTop: '10px', left: '160px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Material: {sumasApu.S_mat === undefined || !sumasApu.S_mat ? '0.00' : sumasApu.S_mat}</spam>
						<spam style={{ position: 'absolute', marginTop: '10px', left: '300px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Equipo: {sumasApu.S_eq === undefined || !sumasApu.S_eq ? '0.00' : sumasApu.S_eq}</spam>
						<spam style={{ position: 'absolute', marginTop: '10px', left: '450px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Subcontrato: {sumasApu.S_subc === undefined || !sumasApu.S_subc ? '0.00' : sumasApu.S_subc}</spam>
						<spam style={{ position: 'absolute', marginTop: '10px', left: '600px', fontSize: '0.7rem', color: 'rgba(0,0,0,0.7)' }}> Subpartidas: {sumasApu.S_subp === undefined || !sumasApu.S_subp ? '0.00' : sumasApu.S_subp}</spam>
					</div>
					


					
					
					<ApusDetSubp
						levelStart={1}
						idProject={proyects.idCard}
					//itemSel={itemSel}
					//analisis_modificado={analisis_modificado}
					/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					
				<Button1
						variant="primary"
						onClick={seleccionar}
						style={{}}
					>
						<ion-icon name="checkmark-done-outline"></ion-icon>
						Seleccionar
					</Button1>

					<Button1
						variant="secondary"
						onClick={handleClose}
					>
						<ion-icon name="close-outline"></ion-icon>
						Cancelar
			</Button1>
				</DialogActions>
			</Dialog>



			
		

					</>
	)
}

export default DetalleSubPartida
