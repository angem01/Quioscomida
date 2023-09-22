'use client';

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const[categorias, setCategorias] = useState([])
    const[categoriaActual, setCategoriaActual] = useState({})
    const[producto, setProducto] = useState({})
    const[modal, setModal] = useState(false)
    const[pedido, setPedido] = useState([])
    const[paso, setPaso] = useState(1)


    const obtenerCategorias = async () => {
        try {
            const { data } = await axios('/api/categories')
            setCategorias(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias() 
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {
        if(pedido.some(productoState => productoState.id  === producto.id )){
            // Actualizar la canttidad 
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleChangePaso = paso => {
        setPaso(paso)
    }

    return(
    <QuioscoContext.Provider
        value={{
           categorias,
           handleClickCategoria,
           categoriaActual,
           producto,
           handleSetProducto,
           modal,
           handleChangeModal,
           handleAgregarPedido,
           pedido,
           handleChangePaso, 
           paso
        }}
    >
        {children}
    </QuioscoContext.Provider>

)}


export {
    QuioscoProvider
}

export default QuioscoContext
