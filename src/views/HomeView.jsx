'use client'

import { useState, useEffect, useMemo } from "react"
import CamposContainer from "@/components/CamposContainer";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { collection, doc, addDoc, getDocs, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '@/utils/firebase';
import * as turf from '@turf/turf'
import dynamic from "next/dynamic";


export default function HomeView() {
  const [campos, setCampos] = useState([]);
  const [camposBusqueda, setCamposBusqueda] = useState([]);
  const [search, setSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [coordenadas, setCoordenadas] = useState([]);
  const [esFormVisible, setEsFormVisible] = useState(false);
  const [areaCampo, setAreaCampo] = useState(0)
  const [centro, setCentro] = useState(null)
  
  const MapNoSSR = useMemo(
    () => dynamic(() => import("@/components/Map"),
    { 
      loading: () => <p>Cargando Mapa...</p>,
      ssr: false 
    }), 
    [])
  
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
    
    const MySwal = withReactContent(Swal)
    MySwal.fire(
      'Creado',
      'Se ha creado el predio exitosamente',
      'success'
    )
  }

  const deleteCampo = async (id) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: '¿Seguro que deseas eliminar el predio?',
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
          'Predio eliminado exitosamente',
          'success'
        )
        
        await getCampos()
      }
    })
  } 

  const getCampo = async (id) => {
    const querySnapshot = await getDoc(doc(db, "campos", id))
    const data = querySnapshot.data();
    
    let campo = {
      id: querySnapshot.id,
      nombre : data.nombre,
      descripcion : data.descripcion,
      area : data.area,
      coordenadas : JSON.parse(data.coordenadas),
    }
    
    
    
    const poly= {
      type: 'Polygon',
      coordinates: [campo.coordenadas]
    }
    const center = turf.center(poly)
    const coord = center.geometry.coordinates 
    setCentro(coord)
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
  }, [esFormVisible])

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
          setAreaCampo={setAreaCampo}
          getCampo={getCampo} />
      </div>
      <div className={"mapa-container"}>
        <MapNoSSR centro={centro} coordenadas={coordenadas} esFormVisible={esFormVisible} setCoordenadas={setCoordenadas} campos={campos} />
      </div>
    </div>
  )
}