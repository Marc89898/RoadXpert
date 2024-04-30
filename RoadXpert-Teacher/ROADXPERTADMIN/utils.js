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

import * as Crypto from 'expo-crypto';

export async function sha256(password) {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return digest;
}
