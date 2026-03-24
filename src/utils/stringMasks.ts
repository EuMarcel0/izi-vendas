import { isNumber } from "lodash";

/**
 * @description Mask for CPF
 */
export const maskCPF = (cpf: string) => {
  if (!cpf || cpf.length < 11) return cpf;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

/**
 * @description Mask for CNPJ
 */
export const maskCNPJ = (cnpj: string) => {
  if (!cnpj || cnpj.length < 14) return cnpj;
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

/**
 * @description Mask for CEP
 */
export const maskCEP = (cep: string) => {
  if (!cep || cep.length < 8) return cep;
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

/**
 * @description Mask for Phone
 */
export const maskPhone = (phone: string) => {
  if (!phone || phone.length < 10) return phone;
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};

/**
 * @description Mask for cellPhone
 */
export const maskCellphone = (cellphone: string) => {
  if (!cellphone || cellphone.length < 11) return cellphone;
  if (isNumber(cellphone)) {
    return String(cellphone)?.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return cellphone?.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
