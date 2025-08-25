import * as bcrypt from 'bcrypt';

async function hashPassword() {
  const password = 'password'; // Puedes cambiar esta contraseña si quieres
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  console.log('--- Contraseña Encriptada ---');
  console.log(`Para la contraseña: ${password}`);
  console.log(`El hash bcrypt es: ${hashedPassword}`);
  console.log('Copia esta cadena de hash y pégala en la columna "clave" de tu tabla "usuarios".');
  console.log('-----------------------------');
}

hashPassword();
