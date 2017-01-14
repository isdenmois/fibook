export default function queryParams(data = {}) {
    return Object.keys(data).map((key) => {
        const value = data[key];

        if (Array.isArray(value)) {
            const k = `${key}[]`;
            const v = value.map(encodeURIComponent).join(`&${k}=`);
            return `${k}=${v}`;
        }

        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');
}