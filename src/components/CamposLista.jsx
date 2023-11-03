import Image from "next/image";

export default function CamposLista(props) {
  const Item = ({ item }) => (
    <button className={"my-2 flex w-full px-6 py-3 bg-gray-100 border border-gray-400 rounded-lg shadow hover:bg-gray-200"}>
        <div style={{ width: '10%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Image src="/assets/location.png" alt={"LocationIcon"} width={24} height={24} />
        </div>
        <div style={{ width: '80%' }}>
            <div style={{ color: 'black', fontWeight: 'bold' }}>{item.nombre}</div>
        </div>
        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <button onClick={() => props.deleteCampo(item.id)} className='btn btn-outline-danger' style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
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