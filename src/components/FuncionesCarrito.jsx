import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch {}
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        const nuevaCantidad = existe.cantidad + cantidad;

        if (nuevaCantidad > producto.stock) {
          return prev.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: producto.stock }
              : item
          );
        }

        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
      }

      return [
        ...prev,
        {
          ...producto,
          cantidad: Math.min(cantidad, producto.stock),
          imagen: producto.imagen || null,
        },
      ];
    });
  };

  const restarCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        restarCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
