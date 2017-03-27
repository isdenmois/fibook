export default function each(array, func) {
    if (array && Array.isArray(array)) {
        for (let i = 0; i < array.length; i++) {
            func(array[i], i);
        }
    } else if (array) {
        const keys = Object.keys(array);
        let key;
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            func(array[key], key);
        }
    }
}
