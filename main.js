// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "hoodie-marchitado",
        titulo: "HOODIE MARCHITADO",
        imagen: "imagenes/hoodie01.png",
        categoria: {
            nombre: "Hoodies",
            id: "hoodies"
        },
        precio: 25000
    },
    {
        id: "hoodie-Iglesia",
        titulo: "HOODIE IGLESIA",
        imagen: "imagenes/hoodie02.png",
        categoria: {
            nombre: "hoodies",
            id: "hoodies"
        },
        precio: 25000
    },
  // Stickers
  {
    id: "STICKER-SA",
    titulo: "STICKER SA",
    imagen: "imagenes/calcas01.png",
    categoria: {
        nombre: "Stickers",
        id: "Stickers"
    },
    precio: 500
},
{
    id: "STICKER-GRAFFITI",
    titulo: "STICKER GRAFFITI",
    imagen: "imagenes/calcas02.png",
    categoria: {
        nombre: "Stickers",
        id: "Stickers"
    },
    precio: 500
},
{
    id: "STICKER-SA-TORNASOL",
    titulo: "STICKER SA TORNASOL",
    imagen: "imagenes/calcas03.png",
    categoria: {
        nombre: "Stickers",
        id: "Stickers"
    },
    precio: 500
},
// CAMISAS
{
    id: "CAMISA-TIRANTES",
    titulo: "CAMISA TIRANTES",
    imagen: "imagenes/camisas01.png",
    categoria: {
        nombre: "Camisas",
        id: "camisas"
    },
    precio: 10000
},
{
    id: "CAMISA-SK8",
    titulo: "CAMISA SK8",
    imagen: "imagenes/camisas02.png",
    categoria: {
        nombre: "camisas",
        id: "camisas"
    },
    precio: 12000
},
{
    id: "CAMISA-LOW-COST",
    titulo: "CAMISA LOW COST",
    imagen: "imagenes/camisas03.png",
    categoria: {
        nombre: "camisas",
        id: "camisas"
    },
    precio: 12000
},
];

const ContenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")

function cargarproductos(productosElegidos){

    ContenedorProductos.innerHTML = "",
    productosElegidos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo} ">
    <div class="producto-detalles">
        <h3 class="procucto-titulo"> ${producto.titulo} </h3>
        <pa class="producto-precio">₡ ${producto.precio}</pa>
        <button class="producto-agregar"id="${producto.id}">Agregar</button>
        
    </div>
    `;
    ContenedorProductos.append(div); 
 })
 actualizarBotonesAgregar();
}

cargarproductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(boton => 
            boton.classList.remove("active"));
        e.currentTarget.classList.add("active"); 

        if(e.currentTarget.id != "todos"){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        
             tituloPrincipal.innerText = productoCategoria.categoria.nombre;

         const productosBoton = productos.filter(producto =>producto.categoria.id === e.currentTarget.id); 
          cargarproductos(productosBoton);
          
         } else{
               tituloPrincipal.innerText = "Todos los productos "
               cargarproductos(productos);

         }
    })
});


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
   
}

const productosEnCarrito = [];
function agregarAlCarrito(e) {
 const idBoton = e.currentTarget.id;
 const productoAgregado = productos.find(producto => producto.id === idBoton)

     if(productosEnCarrito.some (producto => producto.id === idBoton)){ 
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
     productosEnCarrito[index].cantidad++;

     }else{
        productoAgregado.cantidad =1;
        productosEnCarrito.push(productoAgregado);
}
actualizarNumerito();

   localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0);
    numerito.innerText = nuevoNumerito;
}
