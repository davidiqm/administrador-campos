import { MapContainer, TileLayer, Polygon, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

export default function Map({coordenadas, esFormVisible, setCoordenadas, campos}) {
  const onCreated = (e) => {
    if (coordenadas.length > 0) {
      alert('Ya existe un poligono')
      return
    }

    const layer = e.layer
    let poligono = []
    
    layer._latlngs[0].forEach(element => {
      let coord = [element.lat, element.lng]

      poligono.push(coord)
    })

    setCoordenadas(poligono)
    console.log(poligono)
  }

  const onEdited = (e) => {
    console.log(e)
    const layer = e.layers._layers
    let poligono = []
    console.log(layer)
    
    layer._latlngs[0].forEach(element => {
      let coord = [element.lat, element.lng]

      poligono.push(coord)
    })

    setCoordenadas(poligono)
    console.log(poligono)
  }

  const onDelete = (e) => {
    console.log(e)
    setCoordenadas([])
  }

  return (
    <div>
      <MapContainer center={[23.7792261,-101.9428326,2361974]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
          maxZoom={20}
          subdomains={['mt1', 'mt2', 'mt3']}
        />
        {
          esFormVisible &&
          <FeatureGroup>
            <EditControl 
              position="topright"
              onCreated={onCreated}
              onEdited={onEdited}
              onDeleted={onDelete}
              draw={{
                rectangle: false,
                polyline: false,
                circle: false,
                circlemarker: false,
                marker: false
              }} />
          </FeatureGroup>
        }
        {
          campos.map((item) => (
            <Polygon key={item.id} positions={item.coordenadas}></Polygon>
          ))
        }
      </MapContainer>
    </div>
  )
}