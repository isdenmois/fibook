export default function map(array, func) {
    if (array) {
        return array.map(func);
    }
    return [];
}
