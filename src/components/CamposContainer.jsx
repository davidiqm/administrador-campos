import CamposLista from "./CamposLista"
import AgregarButton from "./AgregarButton"
import NuevoCampoForm from "./NuevoCampoForm"

export default function CamposContainer(props) {
  return (
    <div >
      <div className="bg-[#9b56fe] py-10 px-4">
        <h1 className={"text-3xl font-bold text-white"}>Administrador de Campos</h1>
        {
          props.esFormVisible &&
          <div>
            <hr className="my-2" />
            <h2 className={"text-base font-light text-gray-50"}>Crear campo</h2>
          </div>
        }
      </div>
      <div className={"py-5 px-2"}>
        {
          !props.esFormVisible &&
          <div>
            <input
              className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"}
              value={props.search} 
              onChange={props.filter} 
              type={"text"} 
              placeholder={'Buscar campo...'} />
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
            addCampo={props.addCampo}
            areaCampo={props.areaCampo}
            setAreaCampo={props.setAreaCampo} />
        }
      </div>
    </div>
  )
}