import { GetServerSidePropsContext, NextPage } from 'next';
import { SignMessageType, SignTransactionType, User } from '../utils/types';
import Head from 'next/head';
import { Text } from '../components/Text';
import React from 'react';
import Router from 'next/router';
import { fetchUser, SignMessageRequest, SignTransactionRequest } from '../utils/api';
import { SwitchPerso } from '../components/SwitchPerso';
import { Tip } from '../components/Tip';
import { MyloadingButton } from '../components/MyLoadingButton';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import { WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { useSnackbar } from 'notistack';


type Props = {
    user: User;
}

const Home: NextPage<Props> = ({ user }) => {
  const [usingLedger, setUsingLedger] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signMessage, signTransaction } = useWallet();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createTransferTransaction = async () => {
    if (!publicKey) return;
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 100,
      })
    );
    transaction.feePayer = publicKey;
    const anyTransaction: any = transaction;
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    return transaction;
  };
  
  const onClick = async () => {
    if(!publicKey) throw new Error("");
    if(!signTransaction) throw new Error("");
    if(usingLedger){
      console.log('Signing transaction (LEDGER)');
      try {
        setLoading(true);
        const transaction = await createTransferTransaction();
        if (!transaction) return;
        let signed = await signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);
        console.log(signature);
        const body: SignTransactionType = {
          txhash: signature,
          publicKey: publicKey,
          user
        };
        await SignTransactionRequest(body).then((res) => {
          if(res.data.msg){
            console.log(res.data.msg);
            Router.push('/success');
          }else{
            console.log('unknown error')
          }
          setLoading(false);
      }).catch((err) => {
        if(err.response.data.msg){
          enqueueSnackbar(err.response.data.msg, {
            variant: "error"
          });
          setLoading(false);
        }else{
          console.log(err);
          setLoading(false);
        }
      })
      } catch (err) {
        if(err instanceof WalletSignTransactionError){
          enqueueSnackbar(`Create tx failed: ${err.message}`, {
            variant: "error"
          });
        }
      }
    } else {
      console.log('Signing message');
      try {
        if(!publicKey) throw new Error("");
        if(!signMessage) throw new Error("");
        setLoading(true);
        const data = new TextEncoder().encode("Sign this message to prove ownership.");
        const res = await signMessage(data);
        const body: SignMessageType = {
          msg: Buffer.from(data).toString('base64'),
          signature: Buffer.from(res).toString('base64'),
          publicKey: publicKey,
          user
        };
        await SignMessageRequest(body).then((res) => {
          if(res.data.msg){
            console.log(res.data.msg);
            Router.push('/success');
          }else{
            console.log('unknown error')
          }
      }).catch((err) => {
        if(err.response.data.msg){
          enqueueSnackbar(err.response.data.msg, {
            variant: "error"
          });
          setLoading(false);
        }else{
          console.log(err);
        }
        setLoading(false);

      })
      } catch (error) {
        if(error instanceof WalletSignTransactionError){
          enqueueSnackbar(`Create tx failed: ${error.message}`, {
            variant: "error"
          });
        }
        setLoading(false);
      
      }
    }
  }
  
    return (
          <div className='page aligned-center'>
            <Head>
              <title>hexis</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="hexis verification assistant" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Text />
            <MyloadingButton user={user} onClick={onClick} usingLedger={usingLedger} loading={loading}/>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              width: '230px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <SwitchPerso checked={usingLedger} onChange={() => setUsingLedger(!usingLedger)}/>
              using ledger?
              <Tip />
            </div>
        </div>

    );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return fetchUser(context);
}
export default Home;