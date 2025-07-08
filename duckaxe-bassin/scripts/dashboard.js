const fs = require('fs');
const path = require('path');

if (!process.argv[2]) {
    console.log('Path to pool.status file missing!');
    process.exit(1);
}

function readAndPrint() {
    try {
        const tables = [];
        const lines = fs.readFileSync(path.resolve(process.argv[2]), 'utf-8').trim().split('\n').filter(Boolean);
        const [pool, hashrate, shares] = lines.map(JSON.parse);

        console.clear();
        console.log('BASSIN\n');

        tables.push(
            printTable('pool', {
                'uptime': secondsToDDHHMM(pool.runtime),
                'update': diffToNowDHHMM(pool.lastupdate),
                'users': pool.Users,
                'workers': pool.Workers,
            })
        );
        
        tables.push(
            printTable('shares', {
                'best': formatWithSuffix(shares.bestshare),
                'accepted': formatWithSuffix(shares.accepted),
                'rejected': formatWithSuffix(shares.rejected),
                '/second': shares.SPS5m,
            })
        );

        tables.push(
            printTable('hashrate', {
                '5m': hashrate.hashrate5m,
                '15m': hashrate.hashrate15m,
                '1h': hashrate.hashrate1hr,
                '1d': hashrate.hashrate1d,
            })
        );

        for (let i = 0; i < 8; i++) {
            console.log(tables.map(t => t[i]).join(' '.padEnd(5)));
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

function printTable(title, obj) {
    const lines = [];
    const entries = Object.entries(obj);
    const keyWidth = Math.max(...entries.map(([k]) => k.length)) + 1;
    const valWidth = Math.max(...entries.map(([,v]) => String(v).length)) + 1;

    lines.push(`${title.padEnd(keyWidth + valWidth + 1)}`);
    lines.push(`${'----'.padEnd(keyWidth + valWidth + 1)}`);

    for (const [key, value] of entries) {
        lines.push(`${key.padEnd(keyWidth)} ${String(value).padEnd(valWidth)}`);
    }

    return lines;
}

function secondsToDDHHMM(s) {
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0 || days > 0) result += `${String(hours).padStart(2, '0')}h `;
    if (minutes > 0 ) result += `${String(minutes).padStart(2, '0')}m`;

    return result.trim();
}

function diffToNowDHHMM(unixTimestamp) {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - unixTimestamp;
    const diffFormated = secondsToDDHHMM(diff);

    return diffFormated ? `${diffFormated} ago` : 'now';
}

function formatWithSuffix(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'G';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    } else {
        return num.toString();
    }
}


readAndPrint();
setInterval(readAndPrint, 65432);
