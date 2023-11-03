'use client'

import { useState, useEffect } from "react"
import Map from "@/components/Map"
import CamposContainer from "@/components/CamposContainer";

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

  const deleteCampo = async (id) => {
    const nuevaLista = campos.filter(x => x.id != id)
    setCampos(nuevaLista)
    localStorage.setItem("campos", JSON.stringify(nuevaLista))

    await getCampos()
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

    const campo = {
      id: campos.length + 1,
      nombre: nombre,
      descripcion: descripcion,
      coordenadas: coordenadas,
    }

    campos.push(campo)

    localStorage.setItem("campos", JSON.stringify(campos))
    setEsFormVisible(false)
    setCoordenadas([])
    await getCampos()
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
      <div>
        <Map coordenadas={coordenadas} esFormVisible={esFormVisible} setCoordenadas={setCoordenadas} campos={campos} />
      </div>
    </div>
  )
}