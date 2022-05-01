import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Products from '../../api/Products';


export default function DataTable() {

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 180,
      renderCell: (params) => {
        return (
          <span>{params.value}</span>
        )
      }
    },
    { field: 'nome', headerName: 'First name', width: 130 },
    { field: 'marca', headerName: 'Marca', width: 130 },
    {
      field: 'preco',
      headerName: 'Preço',
      type: 'number',
      width: 130,
      renderCell: (params) => {
        return (
          <span>R$ {params.value}</span>
        )
      }
    },
    {
      field: 'qt_estoque',
      headerName: 'Quantidade de Estoque',
      type: 'number',
      width: 200,
    },
    {
      field: 'qt_vendas',
      headerName: 'Quantidade de Vendas',
      type: 'number',
      width: 200,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const [products, setProducts] = useState([])
  const getProducts = async () => {
    let response = await Products.getAll();
    if (response.status !== 'error') {
      setProducts(response)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}