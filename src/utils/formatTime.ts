const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

export default function formatTime(time: number) {
    if (time < hour) {
        const m = Math.floor(time / minute);
        const s = Math.floor((time % minute) / second);
        return `${m}м ${s}с`;
    }

    const h = Math.floor(time / hour);
    const m = Math.floor((time % hour) / minute);
    return `${h}ч ${m}м`;
}
