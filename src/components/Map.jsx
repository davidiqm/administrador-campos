import { MapContainer, TileLayer, Polygon, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import { useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { latLng } from "leaflet";


import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const Center = ({centro}) => {
  const map = useMapEvents({})
  

  useEffect(() => {
    console.log(centro)

    if (centro != undefined && centro != null) {
      const coord = latLng({lat: centro[0], lng:centro[1]})
      map.flyTo(coord, 15)
    }

    return () => {
    }
  }, [centro])
  
  return (
    <div></div>
  )
}
export default function Map({centro, coordenadas, esFormVisible, setCoordenadas, campos}) {

  const onCreated = (e) => {
    const layer = e.layer
    let poligono = []
    
    layer._latlngs[0].forEach(element => {
      let coord = [element.lat, element.lng]

      poligono.push(coord)
    })

    setCoordenadas(poligono)
  }

  // const onEdited = (e) => {
  //   const layer = e.layers._layers
  //   let poligono = []
    
  //   layer._latlngs[0].forEach(element => {
  //     let coord = [element.lat, element.lng]

  //     poligono.push(coord)
  //   })

  //   setCoordenadas(poligono)
  // }

  const onDeleted = (e) => {
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
              // onEdited={onEdited}
              onDeleted={onDeleted}
              draw={{
                rectangle: false,
                polyline: false,
                circle: false,
                circlemarker: false,
                marker: false
              }} />
          </FeatureGroup>
        }
        <Center centro={centro} />
        {
          campos.map((item) => (
            <Polygon key={item.id} positions={item.coordenadas}></Polygon>
          ))
        }
      </MapContainer>
    </div>
  )
}