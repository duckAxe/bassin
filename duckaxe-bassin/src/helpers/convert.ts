export const hashrateSuffix = (value: string): string => {
    const match = value.match(/^([\d.]+)([TGMZ])$/);
    if (!match) return value;

    const [, num, unit] = match;
    return `${num}<span>${unit}h/s</span>`;
}

export const abbreviateNumber = (value: number): string => {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + '<span>T</span>';
    if (value >= 1e9) return (value / 1e9).toFixed(2) + '<span>G</span>';
    if (value >= 1e6) return (value / 1e6).toFixed(2) + '<span>M</span>';
    if (value >= 1e3) return (value / 1e3).toFixed(2) + '<span>K</span>';

    return value.toString();
}

export const secondsToDHM = (s: number): string => {
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);

    if (days) {
        return `${days}<span>d</span> ${hours}<span>h</span> ${minutes}<span>m</span>`;
    } else if (hours) {
        return `${hours}<span>h</span> ${minutes}<span>m</span>`;
    } else {
        return `${minutes}<span>m</span>`;
    }
}

export const diffToNowDHM = (timestamp: number): string => {
    const diffTime = Math.floor(Date.now() / 1000) - timestamp;
    
    return diffTime > 60 ? `${secondsToDHM(diffTime)} <span>ago</span>` : 'now';
}

export const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString()
        .replace(/\s?(AM|PM)/, (_, meridiem) => `<span>${meridiem}</span>`);
}

export function createMarkup(dirty: string) {
    return { __html: dirty };
  }