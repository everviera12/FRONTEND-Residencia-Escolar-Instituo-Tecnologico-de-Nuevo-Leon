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

// DELETE
export const handleDelete = async () => {
  if (!selectedProduct) return;

  const confirmDelete = window.confirm(
    `¿Estás seguro de que quieres eliminar el producto ${selectedProduct.nombre}?`
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://localhost:3000/productos/producto/${selectedProduct.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("Producto eliminado con éxito");
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(`Error al eliminar el producto: ${errorData.message}`);
    }
  } catch (error) {
    alert("Error al eliminar el producto: " + error.message);
  }
};