export const STAGES = ['Muda', 'Matang', 'Layu', 'Busuk'];


export const splitLabel = (label) => String(label ?? '').replace(/([a-z])([A-Z])/g, '$1 $2');

export function parseQuality(input) {
    const label =  String(input ?? '')
    const stage = STAGES.find((s) => label.endsWith(s)) || null
    return {
        stage,
        index: stage ? STAGES.indexOf(stage) : null,
        crop: stage ? label.slice(0, -stage.length) : label
    }
}

export const stageClass = (stage) => (stage ? stage.toLowerCase() : '')

export const toPercent = (value) => Math.round(value * 1000) / 10

export const formatDate = (iso) =>
    new Date(iso).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    })

export function makeThumbnail(file, maxSize = 360) {
    return new Promise((resolve) => {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', 0.75));
        }
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(null);
        };
        img.src = url;
    })
}