import { useEffect, useState } from "react"
import * as turf from '@turf/turf'

const CoordenadasItem = ({coordenadas}) => {
  useEffect(() => {
    console.log(coordenadas)
    return () => {
    }
  }, [coordenadas])

  return (
    <div>
      {
        coordenadas.length === 0 ?
          <div>
            Sin coordenadas
          </div>
        :
          coordenadas.map((element, index) => {
            return (
              <div key={index} className={"my-2 w-full px-6 py-3 bg-gray-100 border border-gray-400 rounded-lg shadow"}>
                <h1>Coordenada {index}</h1>
                <p>Lat: {element[0]}</p>
                <p>Lng: {element[1]}</p>
              </div>
            )
          })
      }
    </div>
  )
}

export default function NuevoCampoForm(props) {

  useEffect(() => {
    console.log(props.areaCampo)
    const poly= {
      type: 'Polygon',
      coordinates: [props.coordenadas]
    }
    const area = turf.area(poly)

    console.log(area)
    props.setAreaCampo(area)
    return () => {
    }
  }, [props.coordenadas])

  return (
    <div>
      <form>
        <div>
          <label className={"block mb-2 text-sm font-medium text-gray"}>Nombre del campo</label>
          <input
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"} 
            onChange={(e) => props.setNombre(e.target.value)} 
            type="text" 
            placeholder="Inserte nombre..." />
        </div>
        <div>
          <label className={"block mb-2 text-sm font-medium text-gray"}>Descripción</label>
          <input 
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"}
            onChange={(e) => props.setDescripcion(e.target.value)}
            type="text"
            placeholder="Inserte descripción..." />
        </div>
        <div className={"mb-3"}>
          <p className={"font-bold"}>Area: {props.areaCampo}km<sup>2</sup></p>
        </div>
        <button
          className={"text-white rounded bg-green-600 w-full p-2.5 mb-3"} 
          onClick={props.addCampo} 
          type="button">
          Enviar
        </button>
        <button
          className={"text-white rounded bg-red-500 w-full p-2.5 mb-3"} 
          onClick={() => {
          props.setNombre("")
          props.setDescripcion("")
          props.setCoordenadas([])
          props.setEsFormVisible(false);
          props.setAreaCampo(0)
        }}>
          Cancelar
        </button>
      </form>
      <div>
        <h1 className={"font-bold"}>Coordenadas:</h1>
        <CoordenadasItem coordenadas={props.coordenadas} />
      </div>
    </div>
  )
}