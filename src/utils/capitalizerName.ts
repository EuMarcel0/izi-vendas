export function capitalizerName(name: string | undefined) {
	if (!name) return '';
	return name
		?.split(' ')
		?.map((item) => item?.charAt(0).toUpperCase() + item?.slice(1).toLowerCase())
		?.join(' ');
}
