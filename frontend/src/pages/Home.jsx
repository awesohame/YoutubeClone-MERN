import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../layout/Layout';

const Home = () => {
    return (
        <Layout className="lg:pl-8 max-lg:px-5">
            <h1>Home</h1>
        </Layout>
    );
};

export default Home;