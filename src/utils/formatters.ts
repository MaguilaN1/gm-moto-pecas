export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatInstallments = (price: number, maxInstallments: number = 3): string => {
  const valuePerInstallment = price / maxInstallments;
  return `${maxInstallments}x de ${formatCurrency(valuePerInstallment)} sem juros`;
};

export const formatPixPrice = (price: number, discountPercent: number = 5): { pixPrice: number; formatted: string } => {
  const pixPrice = price * (1 - discountPercent / 100);
  return {
    pixPrice,
    formatted: formatCurrency(pixPrice),
  };
};

export const maskCpf = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14);
};

export const maskPhone = (value: string): string => {
  const clean = value.replace(/\D/g, '');
  if (clean.length <= 10) {
    return clean
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 14);
  }
  return clean
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 15);
};

export const maskCep = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 9);
};

export const maskCardNumber = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .substring(0, 19);
};

export const maskCardExpiry = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .substring(0, 5);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const generateOrderCode = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `GM-${randomNum}`;
};
