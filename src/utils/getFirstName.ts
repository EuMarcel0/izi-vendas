export const getFirstName = (fullName: string): string => {
  const firstName = fullName.split(" ").slice(0, 2).join(" ");
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};
