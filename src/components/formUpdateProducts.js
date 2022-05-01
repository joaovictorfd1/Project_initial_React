import * as React from 'react';
import { useState } from 'react';
import Products from '../api/Products';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAlert } from 'react-alert';


export default function FormUpdate(props) {
  let object = props.object
  let price_object = parseFloat(object.preco).toFixed(2)


  const alert = useAlert();
  const [idProduct, setIdProduct] = useState(object.id)
  const [avatar, setAvatar] = useState(object.avatar)
  const [name, setName] = useState(object.nome);
  const [marca, setMarca] = useState(object.marca);
  const [preco, setPreco] = useState(price_object);
  const [stocks, setStocks] = useState(parseInt(object.qt_estoque));
  const [sales, setSales] = useState(parseInt(object.qt_vendas));
  const [profile, setProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleFileChange = e => {
    var filePhotoActual = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      setAvatar(reader.result)
      setProfile(true)
    }

    if (filePhotoActual) {
      reader.readAsDataURL(filePhotoActual);
    } else {
      setProfile(false)
    }
  }

  function k(i) {
    var v = i.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = 'R$ ' + v;
    setPreco(i.value)
  }

  const updateProduct = async (event) => {
    event.preventDefault();
    let form = {
      id: idProduct,
      avatar: avatar,
      nome: name,
      marca: marca,
      preco: preco.replace('R$ ', '').replace(',', '.'),
      qt_estoque: parseInt(stocks),
      qt_vendas: parseInt(sales),
    }

    let response = await Products.update(form)
    if (response.status !== 'error') {
      handleCloseEdit()
      props.deletedProduct(true)
      alert.success("Editado com sucesso")
    } else {
      alert.error('Erro, contacte o suporte')
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const theme = createTheme();

  return (
    <>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Product
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
                <Box component="form" onSubmit={updateProduct} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      {avatar && !profile && (
                        <img src={avatar} style={{ width: '150px' }} />
                      )}

                      {profile && (
                        <img src={avatar} style={{ width: '150px' }} />
                      )}
                      <Button
                        variant="contained"
                        component="label"
                      >
                        Upload Avatar*
                        <input
                          required
                          type="file"
                          onChange={(event) => {
                            handleFileChange(event)
                          }}
                          hidden
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="nome"
                        required
                        fullWidth
                        id="nome"
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="marca"
                        label="Marca"
                        name="marca"
                        value={marca}
                        onChange={(event) => setMarca(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="preco"
                        label="Price"
                        name="preco"
                        type="text"
                        placeholder='R$ 0,00'
                        onKeyUp={(event) => k(event.target)}
                        value={preco}
                        onChange={(event) => setPreco(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="qt_estoque"
                        label="Quantity of Stock"
                        type="number"
                        id="qt_estoque"
                        value={stocks}
                        onChange={(event) => setStocks(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="qt_vendas"
                        label="Sales Amount"
                        type="number"
                        id="qt_vendas"
                        value={sales}
                        onChange={(event) => setSales(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Typography>
      </Box>
    </>
  )
}