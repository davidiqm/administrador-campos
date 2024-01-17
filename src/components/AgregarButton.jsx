import Image from "next/image"

export default function AgregarButton({setEsFormVisible}) {
  const handleClick = () => {
    setEsFormVisible(true);
  }
  
  return (
      <button 
        onClick={handleClick} 
        className={'my-2 flex w-full px-6 py-3 bg-gray-100 border border-gray-400 rounded-lg shadow hover:bg-gray-200'}>
          <Image src="/assets/add.png" alt={"LocationIcon"} width={24} height={24} style={{ marginRight: 10 }} />
          <span>Agregar predio</span>
      </button>
  )
}