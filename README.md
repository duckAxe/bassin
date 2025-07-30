```
  ~~~
 ~ ~ ~  BASSIN
  ~~~
```

> A "bassin de nage" is a purpose-built swimming pool for lap swimming.

A zero-fee Bitcoin solo mining pool for umbrelOS based on [pinkyswear/ckpool-solo](https://hub.docker.com/r/pinkyswear/ckpool-solo)

### Install

1. Add `https://github.com/duckAxe/bassin` to your Umbrel Community App Store
  * Open the umbrelOS App Store
  * Click dots on the right
  * Click *Community App Stores*
  * Enter the url into the field, click *Add*
  * Open *duckAxe Community App Store*
2. Click the `Bassin` app to initialize the install
3. Open the `Bassin` app
4. Point your miner to:
  * Stratum: `umbrel:3456`, `umbrel.local:3456` or `umbrelIP:3456`
  * Username: `btcaddress.worker`, Password: `x`
5. Find the Bitcoin block 🎉


### Live Dashboard

The dashboard displays pool, user and worker data. It updates every 60 seconds.

#### UI

1. Click the already started `Bassin` App on umbrelOS dashboard
2. A new browser tab displays the `Bassin` dashboard

#### Terminal

1. Login to your umbrelOS
2. `cd ~/umbrel/app-data/duckaxe-bassin`
3. `node dash/board.js`


### CKPool

* CKPool provides a log file `web/ckpool.log` with live data, events and system health.
* CKPool [config](https://hub.docker.com/r/pinkyswear/ckpool-solo#confckpoolconf) can be customized at `config/ckpool.conf.template`. Restart `Bassin`.


### FAQ

#### Is it possible to hide the username?

Click the username to toggle its visibility. The setting won't be saved.

#### What settings are set for CKPool?

`Bassin` uses CKPool's default settings, which can be found in the [Configuration](https://hub.docker.com/r/pinkyswear/ckpool-solo#configuration) list. Only the `btcsig` and `logdir` values have been adjusted for `Bassin`. The suggested difficulty can be set in your miner.

#### Data seems to be incorrect

The CKpool instance running on umbrelOS performs all measurements and calculations received from the miners. `Bassin` consumes data from the CKpool (API) and displays all numbers without any manipulation.

#### Hashrate Chart disappears

The live data for the hashrate chart is not stored permanently. It is only collected and displayed when the browser tab is active. To save memory, the browser stops logging data when the tab becomes inactive.


### Todos

* Add `Bassin` to official umbrelOS App Store
* Support for Start9 (Hardware needed)


### Legal
* For academic and research purposes only
* Forked from [https://github.com/yanir99/ckpool-umbrel](https://github.com/yanir99/ckpool-umbrel/tree/acc63f73351e7ce6eb8cb0761db72633ac777791)