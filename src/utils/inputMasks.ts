import { isNumber } from "lodash";
/**
 * @description Mask for normalize CPF -  locale pt_br;
 */
export const normalizeCPF = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(.\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})(\d+?)/, "$1");
};

/**
 * @description Mask for normalize CNPJ -  locale pt_br;
 */
export const normalizeCNPJ = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})(\d+?)/, "$1");
};

/**
 * @description Mask for normalize cellphone - locale pt_br;
 */
export const normalizeCellphone = (value: string | undefined) => {
  if (!value) return "";
  if (isNumber(value)) {
    return String(value)
      .replace(/[\D]/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)/, "$1");
  }
  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

/**
 * @description Mask for normalize phone -  locale pt_br;
 */
export const normalizePhone = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

/**
 * @description Mask for normalize CEP -  locale pt_br;
 */
export const normalizeCEP = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};
