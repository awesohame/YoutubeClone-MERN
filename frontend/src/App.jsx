import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from "./store/slices/appLoadingSlice";
import { Routes, Route } from 'react-router-dom'
import { getCurrentUser, refreshAccessToken } from "./store/slices/authSlice";

//pages
import Home from './pages/Home'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      dispatch(setUserLoading(true));

      try {
        await dispatch(getCurrentUser());
      } catch (error) {
        console.error(error);

        // If there's an error, try refreshing the access token
        await dispatch(refreshAccessToken());

        // Retry fetching the current user after refreshing the token
        await dispatch(getCurrentUser());
      } finally {
        dispatch(setUserLoading(false));
      }
    })();
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.classList.add(theme);
    }
  }, []);

  return (
    <Routes>
      {/* home */}
      <Route path="/" element={<Home />} />

      {/* settings */}
      <Route path="/settings" element={<div>Settings</div>} />


    </Routes>
  )
}

export default App
