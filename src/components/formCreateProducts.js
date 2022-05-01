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


export default function FormCreate() {

  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(false)
  const [profile, setProfile] = useState("");
  const [price, setPrice] = useState(0);
  const handleFileChange = e => {
    var filePhotoActual = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      setProfile(reader.result)
      setImage(true)
    }

    if (filePhotoActual) {
      reader.readAsDataURL(filePhotoActual);
    } else {
      setProfile("")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form = {
      avatar: profile,
      nome: data.get('nome'),
      marca: data.get('marca'),
      preco: price.replace('R$ ', '').replace(',', '.'),
      qt_estoque: parseInt(data.get('qt_estoque')),
      qt_vendas: parseInt(data.get('qt_vendas')),
    }

    let response = await Products.createProduct(form)
    if(response.status !== 'error') {
      alert.success("Produto criado com sucesso");
      handleClose();
    } else {
      alert.error("Erro na criação, verifique as informações")
    }
  };

  function k(i) {
    var v = i.value.replace(/\D/g,'');
    v = (v/100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = 'R$ ' + v;
    setPrice(i.value)
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
      >Register Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registration of a new product
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
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        {image && (
                          <img src={profile} style={{width: '150px'}}/>
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
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="marca"
                          label="Marca"
                          name="marca"
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
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}