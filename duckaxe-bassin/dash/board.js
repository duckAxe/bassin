const fs = require('fs/promises');
const path = require('path');

async function readAndPrint() {
  console.clear();
  console.log('\n ~~~');
  console.log('~ ~ ~  BASSIN');
  console.log(' ~~~\n');

  await readAndPrintPool('../web/pool/pool.status');
  await readAndPrintUsers('../web/users');
}

async function readAndPrintPool(file) {
  try {
    const filePath = path.resolve(file);
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.trim().split('\n').filter(Boolean);
    if (lines.length < 3) throw new Error('pool.status file is incomplete');

    const [pool, hashrate, shares] = lines.map(JSON.parse);

    const columns = [
      addLinesToTableColumns('hashrate', {
        '5m': hashrate.hashrate5m,
        '1h': hashrate.hashrate1hr,
        '1d': hashrate.hashrate1d,
        '7d': hashrate.hashrate7d,
      }),
      addLinesToTableColumns('shares', {
        'best': formatWithSuffix(shares.bestshare),
        'accept': formatWithSuffix(shares.accepted),
        'reject': formatWithSuffix(shares.rejected),
        '/sec': shares.SPS5m,
      }, 6, 10),
      addLinesToTableColumns('stats', {
        'uptime': secondsToDDHHMM(pool.runtime),
        'update': diffToNowDHHMM(pool.lastupdate),
        'time': new Date().toLocaleString(),
        'users': `${pool.Users}/${pool.Workers}`,
      })
    ];

    printTableColumns(columns);
    console.log('');
  } catch (error) {
    console.error('Error reading pool file:', error.message);
    process.exit(1);
  }
}

async function readAndPrintUsers(folder) {
  try {
    const folderPath = path.resolve(folder);
    const entries = await fs.readdir(folderPath);

    for (const user of entries) {
      const entryPath = path.join(folderPath, user);
      const stats = await fs.lstat(entryPath);

      if (!stats.isFile() || path.extname(user)) continue;

      try {
        const json = JSON.parse(await fs.readFile(entryPath, 'utf-8'));

        const columns = [
          addLinesToTableColumns('hashrate', {
            '5m': json.hashrate5m,
            '1h': json.hashrate1hr,
            '1d': json.hashrate1d,
            '7d': json.hashrate7d,
          }),
          addLinesToTableColumns('shares', {
            'best': formatWithSuffix(json.bestshare),
            'ever': formatWithSuffix(json.bestever),
            'total': formatWithSuffix(json.shares),
            'last': diffToNowDHHMM(json.lastshare),
          }, 6, 10),
          addLinesToTableColumns('user', user),
        ];
  
        printTableColumns(columns);

        console.log('');
  
        for (const worker of json.worker || []) {
          const columns = [
            addLinesToTableColumns('hashrate', {
              '5m': worker.hashrate5m,
              '1h': worker.hashrate1hr,
              '1d': worker.hashrate1d,
              '7d': worker.hashrate7d,
            }),
            addLinesToTableColumns('shares', {
              'best': formatWithSuffix(worker.bestshare),
              'ever': formatWithSuffix(worker.bestever),
              'total': formatWithSuffix(worker.shares),
              'last': diffToNowDHHMM(worker.lastshare),
            }, 6, 10),
            addLinesToTableColumns('worker', 
              worker.workername.replace(user, '').replace('.', '')
            ),
          ];
  
          printTableColumns(columns);

          console.log('');
        }

      } catch (error) {
        console.error('Error reading user file:', error.message);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('Error reading users directory:', error.message);
    process.exit(1);
  }
}

function printTableColumns(columns) {
  const maxRowsWorker = Math.max(...columns.map(t => t.length));
  
  for (let i = 0; i < maxRowsWorker; i++) {
    console.log(columns.map(t => t[i] || '').join(' '.padEnd(5)));
  }
}

function addLinesToTableColumns(title, obj, minKeyWidth = 0, minValWidth = 0) {
  const lines = [];
  const entries = Object.entries(obj);
  const keyWidth = Math.max(minKeyWidth, ...entries.map(([k]) => k.length)) + 1;
  const valWidth = Math.max(minValWidth, ...entries.map(([, v]) => String(v).length));

  lines.push(`${title.padEnd(keyWidth + valWidth + 1)}`);
  lines.push(`${'--'.padEnd(keyWidth + valWidth + 1)}`);

  if (typeof obj === 'string') {
    lines.push(obj);
  } else {
    for (const [key, value] of entries) {
      lines.push(`${key.padEnd(keyWidth)} ${String(value).padEnd(valWidth)}`);
    }
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
  if (minutes > 0) result += `${String(minutes).padStart(2, '0')}m`;

  return result.trim();
}

function diffToNowDHHMM(unixTimestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixTimestamp;
  const diffFormatted = secondsToDDHHMM(diff);
  
  return diffFormatted ? `${diffFormatted} ago` : 'now';
}

function formatWithSuffix(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'G';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';

  return num.toString();
}

readAndPrint();
setInterval(readAndPrint, 60 * 1000);
