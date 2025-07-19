```
  ~~~
 ~ ~ ~  BASSIN
  ~~~
```

> A "bassin de nage" is a purpose-built swimming pool for lap swimming.

A zero-fee Bitcoin solo mining pool for umbrelOS based on [pinkyswear/ckpool-solo](https://hub.docker.com/r/pinkyswear/ckpool-solo)

### Install

1. Add `https://github.com/duckAxe/bassin` to your Umbrel Community App Store
  * Open your umbrelOS dashboard
  * Open App Store
  * Click dots on the right
  * Click Community App Stores
  * Enter url into field
  * Open duckAxe Community App Store
2. Click the `Bassin` app to initialize the install
3. Start the `Bassin` app from the umbrelOS dashboard

* Use `umbrel:3456`, `umbrel.local:3456` or `umbrel-ip:3456"` as Stratum pool
* Use `btcaddress.worker` as username, `x` as password
* Find the Bitcoin block 🎉


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


### Todos

* Start9 support 


### Legal
* For academic and research purposes only
* Forked from [https://github.com/yanir99/ckpool-umbrel](https://github.com/yanir99/ckpool-umbrel/tree/acc63f73351e7ce6eb8cb0761db72633ac777791)