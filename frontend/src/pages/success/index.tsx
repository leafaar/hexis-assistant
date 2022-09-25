import { SvgIcon, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Home: NextPage = () => {
    return (
        <div className='page aligned-center'>
            <Typography 
            style={{
                color: '#1d1d1d',
                fontWeight: '700',
                textAlign: 'center',
                fontFamily: 'Space Mono'
            }}
            variant="h4"
            >
                Verify Account
            </Typography>
            <div style={{
                    margin: '36px 0px 16px 0px',
            }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="none"
                viewBox="0 0 22 22"
                >
                <path
                    fill="#65C466"
                    d="M7.502 10.443a.75.75 0 10-1.004 1.114l1.004-1.114zm2.033 2.838l.501-.557-.501.557zm1.458-.13l.592.461-.592-.46zm4.599-4.69a.75.75 0 00-1.184-.921l1.184.92zM11 21.75c5.937 0 10.75-4.813 10.75-10.75h-1.5A9.25 9.25 0 0111 20.25v1.5zM.25 11c0 5.937 4.813 10.75 10.75 10.75v-1.5A9.25 9.25 0 011.75 11H.25zM11 .25C5.063.25.25 5.063.25 11h1.5A9.25 9.25 0 0111 1.75V.25zm0 1.5A9.25 9.25 0 0120.25 11h1.5C21.75 5.063 16.937.25 11 .25v1.5zm-4.502 9.807l2.535 2.282 1.003-1.115-2.534-2.281-1.004 1.114zm5.087 2.055l4.007-5.152-1.184-.92-4.007 5.151 1.184.921zm-2.552.227a1.75 1.75 0 002.552-.227l-1.184-.92a.25.25 0 01-.365.032l-1.003 1.115z"
                ></path>
            </svg>   
            </div>
            <Typography 
            style={{
                color: '#1d1d1d',
                textAlign: 'center',
                fontWeight: '350',
                fontFamily: 'DM Sans'
            }}
            variant="h5"
            >
                Congratulations, your wallet is now verified!
            </Typography>
            <Typography 
            style={{
                color: '#1d1d1d',
                textAlign: 'center',
                fontWeight: '350',
                fontFamily: 'DM Sans',
                margin: '10px 0px 30px 0px'
            }}
            >
                To get your role, press the <span style={{ fontWeight: '700', color: '#1d1d1d', fontFamily: 'DM Sans' }}>&#34;Check status&#34;</span> button on discord.
            </Typography>
            <Typography 
            style={{
                color: '#1d1d1d',
                textAlign: 'center',
                fontWeight: '350',
                fontFamily: 'DM Sans',
                margin: '10px 0px 30px 0px'
            }}
            >
                You can now safely close this window.
                <br />
                If you need support, join our&nbsp;
                <a 
                    href="https://discord.gg/sZq7YgG3Rp"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#1D1D1F', textDecoration: 'none', fontWeight: '700', }}>
                     Discord
                </a>
                !
            </Typography>

        </div>
    );
};

export default Home;
