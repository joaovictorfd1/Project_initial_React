import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputMask from 'react-input-mask';
import User from '../../api/User';
import { cpf } from 'cpf-cnpj-validator';
import { useAlert } from 'react-alert';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function Registry() {

  const alert = useAlert();
  const [valueDate, setValueDate] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [cpfUser, setCpfUser] = React.useState("");
  const [cep, setCep] = React.useState(false);
  const [dataCep, setDataCep] = React.useState(null);
  const [city, setCity] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [complementAddress, setComplementAddress] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [currency, setCurrency] = React.useState('EUR');
  const currencies = [
    {
      value: 'M',
      label: 'Men',
    },
    {
      value: 'Y',
      label: 'Women',
    },
    {
      value: 'O',
      label: 'Other',
    },
  ]

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let form = {
      nome: data.get('firstName'),
      sobrenome: data.get('lastName'),
      email: data.get('email'),
      cpf: cpfUser.replace(/\D/g, ''),
      senha: data.get('password'),
      sexo: currency,
      dt_aniversario: dayjs(valueDate).format("DDMMYYYY"),
    }

    if (!cpf.isValid(cpfUser)) {
      alert.error("CPF INVALIDO")
    } else {
      let response = await User.registerUser(form);
      if (response.status !== 'error') {
        console.log(response.data)
      } else {
        console.log(response.data)
      }
    }
  };

  const checkCep = () => {
    const cepCheck = cep.replace(/\D/g, '');

    fetch(`https://viacep.com.br/ws/${cepCheck}/json/`)
      .then(res => res.json()).then(data => {
        setDataCep(data.cep);
        setCity(data.localidade);
        setUf(data.uf);
        setDistrict(data.bairro);
        setComplementAddress(data.complemento);
        setStreet(data.logradouro)
      })
  }

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <InputMask
                  inputMode='numeric'
                  type="text"
                  name="Cpf"
                  placeholder="CPF/CNPJ"
                  className="input"
                  value={cpfUser}
                  required
                  mask="999.999.999-99"
                  onChange={(event) => setCpfUser(event.target.value)}
                >
                  {() =>
                    <TextField
                      required
                      fullWidth
                      name="cpf"
                      label="CPF"
                      type="text"
                      id="cpf"
                      autoComplete="cpf"
                    />
                  }
                </InputMask>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="Gender"
                  type="gender"
                  id="gender"
                  autoComplete="gender"
                  select
                  value={currency}
                  onChange={handleChange}
                  helperText="Please select your gender"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date Birthday"
                    inputFormat="dd/MM/yyyy"
                    value={valueDate}
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid container justifyContent="center" item xs={12}>
                <Typography component="h4" variant="h5">
                  Address Informations
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputMask
                  inputMode='numeric'
                  type="text"
                  name="CEP"
                  className="input"
                  value={cep}
                  required
                  mask="99999-999"
                  onChange={(event) => {
                    setCep(event.target.value)
                  }}
                >
                  {() =>
                    <TextField
                      autoComplete="cep"
                      name="CEP"
                      required
                      fullWidth
                      id="cep"
                      label="CEP"
                      autoFocus
                    />
                  }
                </InputMask>
              </Grid>

              <Grid alignContent="center" item xs={12} sm={6}>
                <Button variant="contained" onClick={checkCep}>Validar CEP</Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="city"
                  required
                  disabled={!dataCep}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  required
                  disabled={!dataCep}
                  fullWidth
                  value={uf}
                  onChange={(event) => setUf(event.target.value)}
                  id="state"
                  label="State"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="public place"
                  required
                  disabled={!dataCep}
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  fullWidth
                  id="public place"
                  label="Public Place"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="district"
                  required
                  disabled={!dataCep}
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  fullWidth
                  id="district"
                  label="District"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="complement"
                  disabled={!dataCep}
                  fullWidth
                  value={complementAddress}
                  onChange={(event) => setComplementAddress(event.target.value)}
                  id="complement"
                  label="Complement"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}