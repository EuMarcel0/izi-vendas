import { isNumber } from "lodash";

export const removeAllStringMasks = ({
  value,
  parseToInt = false,
}: {
  value: string | undefined;
  parseToInt?: boolean;
}) => {
  if (!value || value === "") return null;
  if (isNumber(value)) {
    const cleanedValue = String(value)?.replace(/\D/g, "");
    if (parseToInt) return Number(cleanedValue);
    return cleanedValue;
  }
  const cleanedValue = value?.replace(/\D/g, "");
  if (parseToInt) return Number(cleanedValue);
  return cleanedValue;
};
