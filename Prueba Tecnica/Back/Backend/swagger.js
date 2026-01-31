export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API Ventas",
    version: "1.0.0",
    description: "Prueba técnica Backend"
  },
  servers: [{ url: "http://localhost:3000" }],

  paths: {

    /* ==================== VENDEDORES ==================== */
    "/vendedores": {
      get: {
        summary: "Listar vendedores",
        responses: { 200: { description: "Lista de vendedores" } }
      },
      post: {
        summary: "Crear vendedor",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  correo: { type: "string" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Vendedor creado" } }
      }
    },

    "/vendedores/{id}": {
      get: {
        summary: "Obtener vendedor por ID",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: { 200: { description: "Vendedor encontrado" } }
      },
      put: {
        summary: "Actualizar vendedor",
        parameters: [{ name: "id", in: "path", required: true }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  correo: { type: "string" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Vendedor actualizado" } }
      }
    },

    "/vendedores/{id}/desactivar": {
      patch: {
        summary: "Desactivar vendedor (soft delete)",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: { 200: { description: "Vendedor desactivado" } }
      }
    },

    /* ==================== PRODUCTOS ==================== */
    "/productos": {
      get: {
        summary: "Listar productos",
        responses: { 200: { description: "Lista de productos" } }
      },
      post: {
        summary: "Crear producto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  precio: { type: "number" },
                  stock: { type: "number" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Producto creado" } }
      }
    },

    "/productos/{id}": {
      get: {
        summary: "Obtener producto por ID",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: { 200: { description: "Producto encontrado" } }
      },
      put: {
        summary: "Actualizar producto",
        parameters: [{ name: "id", in: "path", required: true }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  precio: { type: "number" },
                  stock: { type: "number" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Producto actualizado" } }
      }
    },

    /* ==================== VENTAS ==================== */
    "/ventas": {
      get: {
        summary: "Listar ventas",
        responses: { 200: { description: "Lista de ventas" } }
      },
      post: {
        summary: "Registrar venta",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  producto_id: { type: "number" },
                  vendedor_id: { type: "number" },
                  cantidad: { type: "number" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Venta registrada" } }
      }
    },

    "/ventas/{id}": {
      get: {
        summary: "Obtener venta por ID",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: { 200: { description: "Venta encontrada" } }
      }
    }

  }
};
