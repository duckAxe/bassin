export const hashrateSuffix = (value: string): string => {
    const match = value.match(/^([\d.]+)([KMGTPEZY])$/);
    if (!match) return value;

    const [, num, unit] = match;
    return `${num}<span>${unit}h/s</span>`;
}

export const parseHashrate = (value: string): number => {
    if (!value) return 0;

    const units: { [key: string]: number } = {
        H: 1,
        K: 1e3,
        M: 1e6,
        G: 1e9,
        T: 1e12,
        P: 1e15,
        E: 1e18,
        Z: 1e21,
        Y: 1e24,
    };

    const match = value.trim().match(/^([\d.,]+)\s*([KMGTPEZY]?)[H]?\b/i);

    if (!match) return NaN;
  
    const numericPart = parseFloat(match[1].replace(',', '.')); // Komma-Support
    const unit = match[2].toUpperCase();
    const multiplier = units[unit] || 1;

    return numericPart * multiplier;
}

export const abbreviateNumber = (value: number, withMarkup = true): string => {
    const units = [
        { limit: 1e12, symbol: 'T' },
        { limit: 1e9, symbol: 'G' },
        { limit: 1e6, symbol: 'M' },
        { limit: 1e3, symbol: 'K' },
    ];

    for (const { limit, symbol } of units) {
        if (value >= limit) {
            const formatted = (value / limit).toFixed(2);
            return formatted + (withMarkup ? `<span>${symbol}</span>` : ` ${symbol}`);
        }
    }

    return value.toFixed(2);
};

export const secondsToDHM = (s: number): string => {
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);

    if (days) {
        return `${days}<span>d</span> ${hours}<span>h</span>`;
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