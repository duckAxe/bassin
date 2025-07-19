interface HashrateShares {
    hashrate1m: string;
    hashrate5m: string;
    hashrate1hr: string;
    hashrate1d: string;
    hashrate7d: string;
    lastshare: number;
    shares: number;
    bestshare: number;
    bestever: number;
}

export interface Worker extends HashrateShares {
    workername: string;
}

export interface User extends HashrateShares {
    username: string;
    workers: number;
    authorised: number;
    worker: Worker[];
}