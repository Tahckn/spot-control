'use client';
import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { deleteCookie } from 'cookies-next';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();
  const [cook, setCook] = useState(false);

  useEffect(() => {
    if (cook) {
      window.location.reload();
    }
  }, [cook]);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //update user online status
      const { uid } = user;
      await projectFirestore
        .collection('users')
        .doc(uid)
        .update({ online: false });

      // sign the user out
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      //delete cookie logged out
      deleteCookie('logged');
      setCook(true);

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
