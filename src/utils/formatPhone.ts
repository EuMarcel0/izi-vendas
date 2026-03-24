export const formatPhone = (phone: string) => {
	if (!phone) return '-';
	if (phone?.length === 11) {
		return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
	}
	if (phone?.length === 10) {
		return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`;
	}
};
