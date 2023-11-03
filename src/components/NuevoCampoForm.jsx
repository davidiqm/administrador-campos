export default function NuevoCampoForm(props) {
  return (
    <div>
      <input onChange={(e) => props.setNombre(e.target.value)} type="text" placeholder="Nombre del campo" />
      <input onChange={(e) => props.setDescripcion(e.target.value)} type="text" placeholder="Descripcion" />
      <form>
        <button onClick={props.addCampo} type="button">
          Enviar
        </button>
        <button onClick={() => {
          props.setNombre("")
          props.setDescripcion("")
          props.setCoordenadas([])
          props.setEsFormVisible(false);
        }}>
          Cancelar
        </button>
      </form>
      <div>
        <p>{props.coordenadas}</p>
      </div>
    </div>
  )
}