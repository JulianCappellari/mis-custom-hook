// Importación de las funciones y objetos necesarios de React
import { useEffect, useRef, useState } from "react";

// Definición del hook personalizado useFetch que acepta una URL como argumento
const useFetch = (url) => {
  // useRef para mantener un rastreador de montaje
  const estaMontado = useRef(true);

  // useState para gestionar el estado de la solicitud
  const [state, setState] = useState({
    data: null, // Los datos de la solicitud
    loading: true, // Indica si la solicitud está en curso
    error: null, // Almacena errores en caso de que ocurran
  });

  // useEffect para establecer el estado de estaMontado a falso cuando el componente se desmonta
  useEffect(() => {
    return () => {
      estaMontado.current = false;
    };
  }, []);

  // useEffect para realizar la solicitud de red cuando la URL cambia
  useEffect(() => {
    // Establecer el estado inicial de la solicitud
    setState({ data: null, loading: true, error: null });

    // Realizar la solicitud de red usando la URL proporcionada
    fetch(url)
      .then((resp) => resp.json()) // Convertir la respuesta a formato JSON
      .then((data) => {
        // Verificar si el componente está montado antes de actualizar el estado
        if (estaMontado.current) {
          setState({
            loading: false, // La solicitud ha terminado, ya no está en curso
            error: null, // No hay errores
            data, // Los datos de la respuesta se almacenan en el estado
          });
        }
      })
      .catch((error) => {
        // Manejar errores en caso de que ocurran durante la solicitud
        if (estaMontado.current) {
          setState({
            loading: false, // La solicitud ha terminado, ya no está en curso
            error, // Almacena el error para su referencia
            data: null, // No hay datos válidos debido al error
          });
        }
      });
  }, [url]); // El efecto se vuelve a ejecutar cuando la URL cambia

  // Devuelve el estado actual de la solicitud para que el componente que utiliza este hook pueda acceder a él
  return state;
};

// Exporta el hook personalizado useFetch para que pueda ser utilizado en otros componentes
export default useFetch;
