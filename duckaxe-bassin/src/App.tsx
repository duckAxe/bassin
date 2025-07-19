import './App.scss';
import { useState, useEffect, useCallback } from 'react';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { fetchPool, fetchUsers } from './helpers/fetch';
import { POLL_INTERVAL_SECONDS } from './helpers/constants';
import { Pool } from './interfaces/pool';
import { User } from './interfaces/users';

const App = () => {
  const [pool, setPool] = useState<Pool | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [timer, setTimer] = useState<number>(0);

  const loadData = useCallback(async () => {
    try {
      const poolData = await fetchPool();
      const usersData = await fetchUsers();

      setPool(poolData);
      setUsers(usersData);
    } catch (error) {
      console.error('Data fetch error', error);
    }
  }, [])

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      setTimer((prev) => {
        prev ++;
        if (prev >= POLL_INTERVAL_SECONDS) {
          loadData();
          return 0;
        }
        return prev;
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <>
      <Footer timer={timer} />
      {!pool || !users ? <Loader /> : <Dashboard pool={pool} users={users} />}
    </>
  );
}

export default App;
