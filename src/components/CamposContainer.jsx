import CamposLista from "./CamposLista"
import AgregarButton from "./AgregarButton"
import NuevoCampoForm from "./NuevoCampoForm"

export default function CamposContainer(props) {
  return (
    <div>
      {
        !props.esFormVisible &&
        <div>
          <input value={props.search} onChange={props.filter} type={"search"} className={'form-control my-3'} placeholder={'Toca para buscar...'} />
          <AgregarButton setEsFormVisible={props.setEsFormVisible} />
          <CamposLista camposBusqueda={props.camposBusqueda} deleteCampo={props.deleteCampo} />
        </div>
      }
      {
        props.esFormVisible &&
        <NuevoCampoForm 
          setNombre={props.setNombre}
          setDescripcion={props.setDescripcion}
          setEsFormVisible={props.setEsFormVisible}
          setCoordenadas={props.setCoordenadas}
          coordenadas={props.coordenadas}
          addCampo={props.addCampo} />
      }
    </div>
  )
}