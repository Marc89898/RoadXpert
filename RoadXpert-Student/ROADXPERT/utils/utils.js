// Función para validar el formato del DNI (DNI español)
export const isValidDNI = (dni) => {
    const dniRegExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/;
    return dniRegExp.test(dni);
  };
  
  // Función para validar la contraseña
  export const isValidPassword = (password) => {
    const passwordRegExp = /^[a-zA-Z0-9]+$/;
    return password.length >= 4 && passwordRegExp.test(password);
  };
  