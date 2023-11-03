import Image from "next/image"

export default function AgregarButton({setEsFormVisible}) {
  const handleClick = () => {
    setEsFormVisible(true);
  }
  
  return (
      <button onClick={handleClick} style={{ display: 'flex', overflow: 'hidden', marginBottom: 15 }} className={'form-control'}>
          <Image src="/assets/add.png" alt={"LocationIcon"} width={24} height={24} style={{ marginRight: 10 }} />
          <span>Agregar campo</span>
      </button>
  )
}