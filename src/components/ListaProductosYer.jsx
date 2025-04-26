 // Componente exclusivo para Presupuesto YER con carga manual desde yerlista.json
 // ListaProductosYer (sin cuotas) con carga manual desde yerlista.json
 // ListaProductosYer (sin cuotas) con carga manual desde yerlista.json
 import React, { useEffect, useState } from "react";
 import { FaEye } from "react-icons/fa";
 import Modal from "react-bootstrap/Modal";
 
 function ListaProductosYer({ productos, setProductos, setMostrarAcciones }) {
   const [baseProductos, setBaseProductos] = useState([]);
   const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
   const [descripcionSeleccionada, setDescripcionSeleccionada] = useState("");
   const [imagenesDisponibles, setImagenesDisponibles] = useState({});
   const [cargando, setCargando] = useState(true);
 
   const total = productos.reduce((acc, p) => acc + p.precio * (p.cantidad || 1), 0);
 
   // Notifica al componente padre si hay productos cargados
   useEffect(() => {
     if (typeof setMostrarAcciones === "function") {
       setMostrarAcciones(productos.length > 0);
     }
   }, [productos, setMostrarAcciones]);
 
   useEffect(() => {
     setCargando(true);
     fetch("/yerlista.json")
       .then((res) => res.json())
       .then((data) => {
         setBaseProductos(data?.productos || []);
         setCargando(false);
       })
       .catch((err) => {
         console.error("Error cargando yerlista.json:", err);
         setCargando(false);
       });
   }, []);
 
   const actualizarProductoPorDescripcion = (index, valor) => {
     const normalizado = valor.trim().replace(/\s+/g, "").toLowerCase();
     const productoEncontrado = baseProductos.find((p) =>
       p.descripcion?.toLowerCase().replace(/\s+/g, "") === normalizado
     );
 
     const nuevos = [...productos];
 
     if (productoEncontrado && productoEncontrado.precio > 0) {
       nuevos[index] = {
         ...productoEncontrado,
         cantidad: productos[index].cantidad || 1,
       };
     } else {
       nuevos.splice(index, 1);
     }
     setProductos(nuevos);
   };
 
   useEffect(() => {
     const verificarImagenes = async () => {
       const disponibilidad = {};
       for (const producto of productos) {
         const codigo = producto.codigo?.toString().trim();
         if (!codigo) continue;
 
         const urlJPG = `/img/${codigo}.jpg`;
         const urlPNG = `/img/${codigo}.png`;
 
         try {
           const resJPG = await fetch(urlJPG, { method: "HEAD" });
           if (resJPG.ok) {
             disponibilidad[codigo] = ".jpg";
             continue;
           }
         } catch {}
 
         try {
           const resPNG = await fetch(urlPNG, { method: "HEAD" });
           disponibilidad[codigo] = resPNG.ok ? ".png" : null;
         } catch {
           disponibilidad[codigo] = null;
         }
       }
       setImagenesDisponibles(disponibilidad);
     };
 
     if (productos.length > 0) verificarImagenes();
   }, [productos]);
 
   const maximoProductos = 7;
   const puedeAgregarProducto = productos.length < maximoProductos;
 
   if (cargando) {
     return (
       <div className="text-center p-5">
         <div className="spinner-border text-primary" role="status">
           <span className="visually-hidden">Cargando...</span>
         </div>
         <p className="mt-3">Cargando productos YER...</p>
       </div>
     );
   }
 
   return (
     <div className="container p-0 m-0">
       <ul className="list-group ocultar-al-exportar">
         {productos.map((producto, index) => (
           <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
             <input
               type="text"
               list="sugerencias-yer"
               value={producto.descripcion}
               className="form-control form-control-sm border-0"
               onFocus={(e) => e.target.select()}
               onChange={(e) => {
                 const nuevos = [...productos];
                 nuevos[index].descripcion = e.target.value;
                 setProductos(nuevos);
               }}
               onBlur={(e) => actualizarProductoPorDescripcion(index, e.target.value)}
               inputMode="text"
               autoComplete="off"
               style={{ textAlign: "left", paddingLeft: "8px", paddingRight: "8px" }}
             />
 
             <select
               className="form-select form-select-sm mx-2"
               value={producto.cantidad || 1}
               onChange={(e) => {
                 const nuevos = [...productos];
                 nuevos[index].cantidad = Number(e.target.value);
                 setProductos(nuevos);
               }}
               style={{ width: "60px" }}
             >
               {[...Array(9)].map((_, i) => (
                 <option key={i + 1} value={i + 1}>{i + 1}</option>
               ))}
             </select>
 
             <strong>
               ${ (producto.precio * (producto.cantidad || 1)).toLocaleString("es-AR", {
                 minimumFractionDigits: 0,
                 maximumFractionDigits: 0
               }).replace(/,/g, ".") }
             </strong>
 
             <button
               className="btn btn-danger btn-sm ms-2 ocultar-al-exportar"
               onClick={() => setProductos(productos.filter((_, i) => i !== index))}
             >
               <i className="bi bi-trash text-white"></i>
             </button>
           </li>
         ))}
       </ul>
 
       <datalist id="sugerencias-yer">
         {baseProductos.map((p, i) => (
           <option key={i} value={p.descripcion} label={`$${p.precio} | Cód: ${p.codigo}`} />
         ))}
       </datalist>
 
       <div className="text-start mt-2 ocultar-al-exportar">
         <button
           className="btn btn-primary btn-mobile"
           onClick={() => setProductos([...productos, { descripcion: "", cantidad: 1, precio: 0 }])}
           disabled={!puedeAgregarProducto}
         >
           Agregar Producto YER<i className="bi bi-cart3 ms-2"></i>
         </button>
         {!puedeAgregarProducto && (
           <small className="text-danger d-block mt-1">
             Límite máximo de 7 productos alcanzado.
           </small>
         )}
       </div>
 
       {productos.length > 0 && (
         <div className="p-3 border bg-white mt-4 presupuesto-print-inner">
           <table className="table">
             <thead>
               <tr>
                 <th>Descripción</th>
                 <th className="text-center ocultar-al-exportar">Ver</th>
                 <th className="text-end">Cantidad</th>
                 <th className="text-end">Subtotal</th>
               </tr>
             </thead>
             <tbody>
               {productos.map((producto, index) => {
                 const codigo = producto.codigo?.toString().trim();
                 const extension = imagenesDisponibles[codigo];
                 const rutaImagen = extension ? `/img/${codigo}${extension}` : null;
                 const mostrarOjo = !!extension;
 
                 return (
                   <tr key={index}>
                     <td>{producto.descripcion}</td>
                     <td className="text-center ocultar-al-exportar">
                       {mostrarOjo ? (
                         <button
                           className="btn btn-outline-secondary btn-sm"
                           onClick={() => {
                             setImagenSeleccionada(rutaImagen);
                             setDescripcionSeleccionada(producto.descripcion);
                           }}
                         >
                           <FaEye />
                         </button>
                       ) : (
                         <span style={{ display: "inline-block", width: "32px" }}></span>
                       )}
                     </td>
                     <td className="text-end">{producto.cantidad || 1}</td>
                     <td className="text-end">
                       <strong>
                         ${ (producto.precio * (producto.cantidad || 1)).toLocaleString("es-AR", {
                           minimumFractionDigits: 0,
                           maximumFractionDigits: 0
                         }).replace(/,/g, ".") }
                       </strong>
                     </td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
 
           <h5 className="text-end fw-bold text-price">
             Total Presupuesto YER:
             <span className="precio-destacado">
               ${total.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/,/g, ".")}
             </span>
           </h5>
         </div>
       )}
 
       <Modal show={!!imagenSeleccionada} onHide={() => setImagenSeleccionada(null)} centered size="lg">
         <Modal.Header closeButton>
           <Modal.Title>{descripcionSeleccionada}</Modal.Title>
         </Modal.Header>
         <Modal.Body className="text-center">
           {imagenSeleccionada && (
             <img src={imagenSeleccionada} alt="Imagen producto" className="img-fluid" style={{ maxHeight: "400px" }} />
           )}
         </Modal.Body>
       </Modal>
     </div>
   );
 }
 
 export default ListaProductosYer;
 