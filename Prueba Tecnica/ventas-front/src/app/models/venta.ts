export interface Venta {
  id?: number;
  producto_id: number;
  vendedor_id: number;
  cantidad: number;
  total?: number;
  producto?: string;
  vendedor?: string;
  stock?: number;
}
