import { Typography } from "@mui/material";

export const Text = () => {
    return(
        <div className='aligned-center'>
        <Typography 
          style={{
            color: '#616161',
            fontWeight: '700',
            textAlign: 'center',
            width: '50%',
            fontFamily: 'Space Mono'
          }}
          variant="h3"
        >
          verify your wallet with{' '}
          <a
            href="https://twitter.com/hexishq"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#1D1D1F', textDecoration: 'none', fontFamily: 'Space Mono' }}
          >
            hexis
          </a>
        </Typography>
    </div>
    );
}