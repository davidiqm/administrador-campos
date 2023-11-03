'use client'

import { useState, useEffect } from "react"
import Map from "@/components/Map"
import CamposContainer from "@/components/CamposContainer";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '@/utils/firebase';

export default function HomeView() {
  const [campos, setCampos] = useState([]);
  const [camposBusqueda, setCamposBusqueda] = useState([]);
  const [search, setSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [coordenadas, setCoordenadas] = useState([]);
  const [esFormVisible, setEsFormVisible] = useState(false);
  const [areaCampo, setAreaCampo] = useState(0)

  const getCampos = async () => {
    const querySnapshot = await getDocs(collection(db, "campos"))
    let camposQuery = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      let campo = {
        id: doc.id,
        nombre : data.nombre,
        descripcion : data.descripcion,
        area : data.area,
        coordenadas : JSON.parse(data.coordenadas),
      }

      camposQuery.push(campo)
    });
    
    setCampos(camposQuery)
    setCamposBusqueda(camposQuery)
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
      nombre: nombre,
      descripcion: descripcion,
      area: areaCampo,
      coordenadas: JSON.stringify(coordenadas),
    }

    try {
      const docRef = await addDoc(collection(db, "campos"), campo);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }



    setEsFormVisible(false)
    setCoordenadas([])
    setAreaCampo(0)
    getCampos()
    
    const MySwal = withReactContent(Swal)
    MySwal.fire(
      'Creado',
      'Se ha creado el campo exitósamente',
      'success'
    )
  }

  const deleteCampo = async (id) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: '¿Seguro que deseas eliminar el campo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
          await deleteDoc(doc(db, "campos", id));
          return true
      }
      return false
    }).then(async (resultado) => {
      if (resultado) {
        MySwal.fire(
          'Eliminado',
          'Campo eliminado exitósamente',
          'success'
        )
        
        await getCampos()
      }

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
          deleteCampo={deleteCampo}
          areaCampo={areaCampo}
          setAreaCampo={setAreaCampo} />
      </div>
      <div className={"mapa-container"}>
        <Map coordenadas={coordenadas} esFormVisible={esFormVisible} setCoordenadas={setCoordenadas} campos={campos} />
      </div>
    </div>
  )
}