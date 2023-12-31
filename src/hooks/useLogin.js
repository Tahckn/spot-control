'use client';
import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { setCookie } from 'cookies-next';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [cook, setCook] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    if (cook) {
      window.location.reload()
    }
  }, [cook]);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //update user online status
      await projectFirestore
        .collection('users')
        .doc(res.user.uid)
        .update({ online: true });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      //set cookie logged in
      setCookie('logged', 'true');
      setCook(true);

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

  return { login, isPending, error };
};
