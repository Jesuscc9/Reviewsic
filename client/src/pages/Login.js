import { useState, useEffect } from 'react';
import React from 'react';

const Login = () =>{

  const [value, setValue] = useState('initial');

  useEffect(() => {
    console.log('ASas');
  }, [value])

  return(
    <h1>Inicio de sesión</h1>
  )
}

export default Login;