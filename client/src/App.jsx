import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from "./store/slices/appLoadingSlice";
import { Routes, Route } from 'react-router-dom'
import { getCurrentUser, refreshAccessToken } from "./store/slices/authSlice";

//pages
import Home from './pages/Home'
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Account from "./pages/Account";
import ChannelLayout from "./layout/ChannelLayout";
import Channel from "./pages/channel/Channel";
import Videos from "./pages/channel/Videos";
import Tweets from "./pages/channel/Tweets";
import Playlists from "./pages/channel/Playlists";
import Create from "./pages/Create";
// import TweetEdit from "./pages/edit/TweetEdit";
// import Settings from "./pages/Settings";
// import PlaylistVideos from "./pages/PlaylistVideos"; 
import VideoPlayer from "./pages/VideoPlayer";
import Subscriptions from './pages/Subscriptions';

//test imports


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      dispatch(setUserLoading(true));

      const res = await dispatch(getCurrentUser());

      if (!res?.payload?.success) {
        // If there's an error, try refreshing the access token
        await dispatch(refreshAccessToken());

        // Retry fetching the current user after refreshing the token
        await dispatch(getCurrentUser());
      }

      dispatch(setUserLoading(false));
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
      {/* home page */}
      <Route path="/" element={<Home />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />

      <Route path="/create" element={<Create />} />
      <Route path="/account" element={<Account />} />

      <Route path="/subscriptions" element={<Subscriptions />} />

      <Route path="/channel/:username" element={<ChannelLayout />}>
        <Route path="" element={<Channel />} />
        <Route path="videos" element={<Videos />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="playlists" element={<Playlists />} />
        {/* <Route path="playlists" element={<Playlists />} /> */}
      </Route>

      {/* TEST */}
      <Route path="/watch/:videoId" element={<VideoPlayer />} />


    </Routes>
  )
}

export default App
