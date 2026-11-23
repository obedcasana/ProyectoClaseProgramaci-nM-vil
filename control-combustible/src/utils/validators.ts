//Recibe como parámetro el texto ingresado y si no recibe nombre del campo, le coloca uno por defecto.
//value.trim() elimina espacios en blanco al inicio y al final del texto recibido, así si alguien escribe "  " 
//No es válido. 
export function validateRequired(value: string, fieldName = "Este campo"): string | undefined {
  if (!value.trim()) {
  {/*Usa !value.trim() porque el valor de un string vacío es falso, entonces si el valor es verdadero indica que el campo 
    es obligatorio*/}
    return `${fieldName} es obligatorio.`;
  }
  return undefined;
}

export function validateEmail(value: string): string | undefined {
{/*Si el valor de Email viene vacío, lo pide obligatoriamente*/}
  if (!value.trim()) return "El correo electrónico es obligatorio.";
  {/*Se define un patrón de evaluación del correo electrónico usando /^ para indicar que se valide desde el primer caracter
    y $/ para indicar que se valide hasta el último caracter*/}
  {/*1. [^\s@]+ Que tenga uno o más caracteres que no sean espacios ni @
    2. @ Que contenga un arroba
    3. [^\s@]+ Uno o más caracteres para el dominio del correo
    4. \. n punto antes de la extensión del correo
    5. [^\s@]+ Uno o más caracteres después del punto para la extensión del mismo*/}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  {/*Si el valor no cumple la validación antes indicada, devuelve error, sino devuelve undefined*/}
  if (!emailRegex.test(value.trim())) {
    return "Ingresa un correo electrónico válido.";
  }
  return undefined;
}

export function validatePassword(value: string): string | undefined {
    {/*Si el valor viene vacío indica que es obligatoria, con la misma lógica que antes, que el string vacío es falso*/}
  if (!value) return "La contraseña es obligatoria.";
    {/*Si el valor mide menos de 6 caracteres, pide que ingrese más caracteres, sino devuelve undefined.*/}
  if (value.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return undefined;
}

export function validatePhone(value: string): string | undefined {
    {/*Limpia el número de teléfono ingresado para que no tenga artefactos, de la siguiente manera:
        1. \D Elimina todos caracter que NO sea un dígito numérico
        2. /g Elimina de forma global, osea todos los que encuentre en el valor de value los reemplazará con vacío para que:
        Si se ingresara "+504 9988-7766" se reemplace para que quede cleanPhone como: "50499887766"*/}
  const cleanPhone = value.replace(/\D/g, "");
  {/*Si el valor viene vacío indica que es obligatoria, con la misma lógica que antes, que el string vacío es falso*/}
  if (!cleanPhone) return "El teléfono es obligatorio.";
  {/*Si la longitud del teléfono es menor a 8 devuelve error y sino devuelve undefined*/}
  if (cleanPhone.length < 8) {
    return "Ingresa un número de teléfono válido (mínimo 8 dígitos).";
  }
  return undefined;
}

export function validateText(value: string, minLength = 2, fieldName = "El texto"): string | undefined {
  const clean = value.trim();
  {/*Si el valor viene vacío indica que es obligatoria, con la misma lógica que antes, que el string vacío es falso*/}
  if (!clean) return `${fieldName} es obligatorio.`;
  {/*Si el valor viene con menos longitud que la longitud mínima devuelve error, sino devuelve undefined*/}
  if (clean.length < minLength) {
    return `${fieldName} debe tener al menos ${minLength} caracteres.`;
  }
  return undefined;
}