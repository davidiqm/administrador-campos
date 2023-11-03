'use client'

import { useState, useEffect } from "react"
import Map from "@/components/Map"
import CamposContainer from "@/components/CamposContainer";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import * as turf from '@turf/turf'

export default function HomeView() {
  const [campos, setCampos] = useState([]);
  const [camposBusqueda, setCamposBusqueda] = useState([]);
  const [search, setSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [coordenadas, setCoordenadas] = useState([]);
  const [esFormVisible, setEsFormVisible] = useState(false);

  const getCampos = async () => {
    let polygon = JSON.parse(localStorage.getItem("campos"))
    
    if (polygon === null || polygon ===undefined) {
      polygon = []
    }
    
    setCampos(polygon)
    setCamposBusqueda(polygon)
  }
  
  const addCampo = async () => {
    if (!nombre) {
      alert('El campo nombre está vacío')
      return
    } else if (!descripcion) {
      alert('El campo descripción está vacío')
      return
    } else if (coordenadas.length === 0) {
      alert('El campo coordenadas está vacío')
      return
    }

    const poly= {
      type: 'Polygon',
      coordinates: [coordenadas]
    }
    const area = turf.area(poly)
    const area2 = area/10000

    const campo = {
      id: campos.length + 1,
      nombre: nombre,
      descripcion: descripcion,
      area: area2,
      coordenadas: coordenadas,
    }

    campos.push(campo)

    localStorage.setItem("campos", JSON.stringify(campos))
    setEsFormVisible(false)
    setCoordenadas([])
    const MySwal = withReactContent(Swal)
    MySwal.fire(
      'Creado',
      'Se ha creado el campo exitósamente',
      'success'
    ).then(async() => {
      await getCampos()
    })

  }

  const deleteCampo = async (id) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: '¿Seguro que deseas eliminar el campo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
            const nuevaLista = campos.filter(x => x.id != id)
            setCampos(nuevaLista)
            localStorage.setItem("campos", JSON.stringify(nuevaLista))
            return true
      }
      return false
    }).then(async (resultado) => {
      console.log(resultado)
      if (resultado) {
        MySwal.fire(
          'Eliminado',
          'Campo eliminado exitósamente',
          'success'
        )
      }

      await getCampos()
    }) 

  } 

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = campos.filter((campo) => {
        return campo.nombre.toLowerCase().startsWith(keyword.trim().toLowerCase());
      });
      setCamposBusqueda(results);
    } else {
      setCamposBusqueda(campos);
    }

    setSearch(keyword);
  };

  useEffect(() => {
    getCampos()
    return () => {
    }
  }, [])

  return (
    <div className="flex">
      <div className="campos-container">
        <CamposContainer 
          setNombre={setNombre}
          setDescripcion={setDescripcion}
          setCoordenadas={setCoordenadas}
          setEsFormVisible={setEsFormVisible}
          coordenadas={coordenadas}
          esFormVisible={esFormVisible}
          search={search}
          filter={filter}
          camposBusqueda={camposBusqueda}
          addCampo={addCampo} 
          deleteCampo={deleteCampo} />
      </div>
      <div className={"mapa-container"}>
        <Map coordenadas={coordenadas} esFormVisible={esFormVisible} setCoordenadas={setCoordenadas} campos={campos} />
      </div>
    </div>
  )
}