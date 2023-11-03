import Image from "next/image";

export default function CamposLista(props) {
  const Item = ({ item }) => (
    <button className={"my-2 flex w-full px-6 py-3 bg-gray-100 border border-gray-400 rounded-lg shadow hover:bg-gray-200"}>
        <div className={"align-middle"}>
            <Image src="/assets/location.png" alt={"LocationIcon"} width={24} height={24} />
        </div>
        <div className={"text-left"}>
            <div>
              <p className={"font-bold"} >{item.nombre}</p>
              <p className={"text-xs"} >Area: {item.area}km<sup>2</sup></p>
            </div>
        </div>
        <div className={""}>
            <button onClick={() => props.deleteCampo(item.id)} className='btn btn-outline-danger' >
                <Image src="/assets/delete.png" alt={"DeleteIcon"} width={24} height={24} />
            </button>
        </div>
    </button>
  );  

  return (
    <div className={"overflow-auto max-h-"}>
      {
        props.camposBusqueda.map((item) => (
          <Item key={item.id} item={item} />
        ))
      }
    </div>
  )
}