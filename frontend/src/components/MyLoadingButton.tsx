import { Button, ButtonProps, SvgIcon, Typography } from '@mui/material';
import { FC } from 'react';
import { User } from '../utils/types';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


type Props = {
    user: User;
    onClick: any;
    usingLedger: boolean;
    loading: boolean;
  };

export const MyloadingButton: FC<Props> = ({ user, onClick, usingLedger, loading }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connect, connected } = useWallet();
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
          {connected === false && (
            <>
            {(() => {
              return (
                <WalletMultiButton />
              )
            })()}
            </>
          )}
          {connected === true && (
            <ColorButton
            loading={loading}
            style={{
              backgroundColor: '#65C466',
            }}
            onClick={onClick} variant='contained' >
                  <>
                  {(() => {
                    if(usingLedger){
                      return(
                        <>
                        sign a transaction
                        </>);
                    } else {
                      return(
                        <>
                        sign a message
                        </>);
                    }
                  })()}
                  </>
                </ColorButton>  
          )}
        </div>
        
    );
}

export const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: '#FBFBFD',
    fontFamily: 'Space mono',
    width: '285px',
    textTransform: 'none',
    fontSize: '18px',
    fontWeight: '400',
    borderRadius: '4px',
    margin: '48px 0px 24px 0px',
    padding: '10px 30px',
    boxShadow: 'none',
    backgroundColor: '#1d1d1d',
    '&:hover': {
        backgroundColor: "#000000",
        boxShadow: 'none',
    },
  }));
