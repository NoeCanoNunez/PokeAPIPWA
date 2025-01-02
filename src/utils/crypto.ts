// Clave de encriptación constante (en producción debería estar en variables de entorno)
const ENCRYPTION_KEY = 'almacen-offline-key-2024';

// Convierte string a ArrayBuffer
function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// Convierte ArrayBuffer a string
function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
}

// Deriva una clave a partir de una contraseña
async function getKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(text: string): Promise<string> {
  try {
    const key = await getKey(ENCRYPTION_KEY);
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encoder.encode(text)
    );

    // Combina IV y datos encriptados
    const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    
    // Convierte a base64 para almacenamiento
    return btoa(ab2str(combined.buffer));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt');
  }
}

export async function decrypt(encryptedText: string): Promise<string> {
  try {
    const key = await getKey(ENCRYPTION_KEY);
    const decoder = new TextDecoder();
    
    // Convierte de base64 y separa IV y datos
    const combined = new Uint8Array(str2ab(atob(encryptedText)));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );

    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt');
  }
}
