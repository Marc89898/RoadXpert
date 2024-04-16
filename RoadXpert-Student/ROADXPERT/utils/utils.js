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


const crypto = require('crypto');
export function sha256(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}