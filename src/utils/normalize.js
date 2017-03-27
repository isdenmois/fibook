import each from './each';

export default function normalize(data, type, id) {
    const entities = {};
    each(data, (entity) => {
        const key = entity[id];
        entities[key] = entity;
    });

    const result = {};
    result[type] = entities;

    return result;
}
