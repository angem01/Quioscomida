'use client';

import Image from "next/image"

function Categoria({categoria}) {

    const { nombre, icono, id } = categoria

  return (
    <div className="flex items-center gap-4 border p-5 hover:bg-amber-400">
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="imagen icono"
      />
      <button 
        type="button"
        className="text-2xl font-bold hover:cursor-pointer"
      >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria
