import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Products from '../../api/Products';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormCreate from '../../components/formCreateProducts';
import FormList from '../../components/formListProducts';
import { useAlert } from 'react-alert';
import FormUpdate from '../../components/formUpdateProducts';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();


export default function DataTable() {

  const alert = useAlert()
  const [openReadProduct, setOpenReadProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false)
  const handleOpenProduct = () => setOpenReadProduct(true);
  const handleCloseProduct = () => setOpenReadProduct(false);

  const [openEditProduct, setOpenEditProduct] = useState(false)
  const handleOpenEditProduct = () => setOpenEditProduct(true);
  const handleCloseEditProduct = () => setOpenEditProduct(false);

  const [openDeleteCheck, setOpenDeleteCheck] = useState(false)
  const handleOpenDeleteCheck = () => setOpenDeleteCheck(true);
  const handleCloseDeleteCheck = () => setOpenDeleteCheck(false);

  const [item, setItem] = useState([])
  const [idDelete, setIdDelete] = useState([])
  const [nameProduct, setNameProduct] = useState([])

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
    {
      field: 'Ações',
      headerName: 'Ações',
      type: 'text',
      width: 500,
      renderCell: (params) => {
        return (
          <>
            <Button color="secondary" variant="contained" style={{ marginLeft: '10px' }} onClick={() => {
              setDeleteProduct(false)
              handleOpenProduct()
              setItem(params.row)
            }}>Show</Button>
            <Button color="warning" variant="contained" style={{ marginLeft: '10px' }} onClick={() => {
              setDeleteProduct(false)
              setItem(params.row)
              handleOpenEditProduct()
            }}>Edit</Button>
            <Button color="error" variant="contained" style={{ marginLeft: '10px' }} onClick={() => {
              setNameProduct(params.row.nome)
              setIdDelete(params.row.id)
              handleOpenDeleteCheck();
            }}>Delete</Button>
          </>
        )
      }
    }
  ];

  const [products, setProducts] = useState([])
  const getProducts = async () => {
    let response = await Products.getAll();
    if (response.status !== 'error') {
      setProducts(response)
    }
  }

  const deleteProductRequest = async () => {
    let response = await Products.delete(idDelete);
    if (response.status !== 'error') {
      handleCloseDeleteCheck();
      getProducts();
      alert.success("Produto deletado");
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    if (deleteProduct) {
      handleCloseProduct();
      handleCloseEditProduct();
      getProducts();
    }
  }, [deleteProduct])

  return (
    <div>

      <FormCreate />
      {/* Read Product */}

      <Modal
        open={openReadProduct}
        onClose={handleCloseProduct}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <FormList
                    object={item}
                    deletedProduct={setDeleteProduct}
                    value={deleteProduct}
                  />
                </Box>
              </Container>
            </ThemeProvider>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openEditProduct}
        onClose={handleCloseEditProduct}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormUpdate
          object={item}
          deletedProduct={setDeleteProduct}
          value={deleteProduct}
        />
      </Modal>

      <Modal
        open={openDeleteCheck}
        onClose={handleCloseDeleteCheck}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete the product {nameProduct}?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button color="error" variant="contained" size="large" onClick={deleteProductRequest}>Yes</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button color="warning" variant="contained" size="large" onClick={handleCloseDeleteCheck}>No</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </ThemeProvider>
          </Typography>
        </Box>
      </Modal>

      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}