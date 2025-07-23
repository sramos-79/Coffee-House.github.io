document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { id: "1", nombre: "Café Berlín", precio: 12000 },
        { id: "2", nombre: "Café Molido de Ecuador", precio: 14000 },
        { id: "3", nombre: "Café Filtrante", precio: 17000 },
        { id: "4", nombre: "Café Costa Coffee Blend", precio: 10000 }
    ];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
function actualizarContadorCarrito() {

let totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);  
 let totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0); 


 const contadorCarrito = document.getElementById("cart-count"); 
    if (contadorCarrito) {
        contadorCarrito.innerText = totalProductos;  
    }


    const totalCarrito = document.getElementById("totalCarrito");
    if (totalCarrito) {
        totalCarrito.innerText = `$${totalCompra}`;  
    }
}

    actualizarContadorCarrito();
    document.querySelectorAll(".precio").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoId = e.target.dataset.id;
            const productoNombre = e.target.dataset.nombre;
            const productoPrecio = parseInt(e.target.dataset.precio);
            const productoCantidad = 1;

            let productoEnCarrito = carrito.find(item => item.id === productoId);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad += productoCantidad;
            } else {

                carrito.push({ id: productoId, nombre: productoNombre, precio: productoPrecio, cantidad: productoCantidad });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarContadorCarrito();
            e.target.innerHTML = "¡Añadido!";
            e.target.classList.add("added");
            setTimeout(() => {
                e.target.innerHTML = `Añadir más`;
                e.target.classList.remove("added");
            }, 1000);
        });
    });
    document.getElementById("vaciarCarrito")?.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        carrito = [];
        actualizarContadorCarrito();
        mostrarCarrito();
    });
    function mostrarCarrito() {
        const carritoContainer = document.getElementById("productosCarrito");
        carritoContainer.innerHTML = '';

        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>No tienes productos en tu carrito.</p>';
        } else {
            carrito.forEach(producto => {
                carritoContainer.innerHTML += `
                    <div class="row">
                        <div class="col-8">
                            <h4>${producto.nombre}</h4>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <p>Precio unitario: $${producto.precio}</p>
                        </div>
                        <div class="col-4 text-end">
                            <button class="btn btn-danger eliminar" data-id="${producto.id}">Eliminar</button>
                        </div>
                    </div>
                    <hr>
                `;
            });
        }
        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const productoId = e.target.dataset.id;
                carrito = carrito.filter(item => item.id !== productoId);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
                actualizarContadorCarrito();
            });
        });
    }
    if (document.getElementById("productosCarrito")) {
        mostrarCarrito();
    }
});
