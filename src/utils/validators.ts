export const validateCpf = (cpf: string): boolean => {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(clean.charAt(10), 10);
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  const clean = phone.replace(/\D/g, '');
  return clean.length >= 10 && clean.length <= 11;
};

export const validateCep = (cep: string): boolean => {
  const clean = cep.replace(/\D/g, '');
  return clean.length === 8;
};

/**
 * Valida se uma URL é segura para uso em tags <img> ou links,
 * prevenindo esquemas maliciosos como javascript: ou data:text/html
 */
export const validateSafeUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  
  // Bloquear esquemas perigosos
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('data:')
  ) {
    return false;
  }

  // Permitir apenas https://, http:// ou caminhos relativos legítimos
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/')
  );
};

/**
 * Sanitiza texto simples removendo caracteres de controle invisíveis
 */
export const sanitizePlainText = (input: string, maxLength: number = 255): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim()
    .slice(0, maxLength);
};

