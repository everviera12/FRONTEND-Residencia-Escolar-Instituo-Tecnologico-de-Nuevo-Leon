// POST
export const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    nombre: formData.get("nombre"),
    precio: formData.get("precio"),
    stock: formData.get("stock"),
    descripcion: formData.get("descripcion"),
  };

  try {
    const response = await fetch("http://localhost:3000/productos/producto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Producto guardado exitosamente");
      
      setTimeout(() => {
        window.location.reload()
      }, 2000);

    } else {
      alert("Error al guardar el producto");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar los datos");
  }
};