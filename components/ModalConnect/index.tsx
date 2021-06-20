import React from 'react';
import style from './ModalConnect.module.scss';
import Close from 'components/assets/Close'
import { NetworkType } from 'interfaces/index';
import Metamask from 'components/assets/Providers/Metamask';
import WalletConnect from 'components/assets/Providers/WalletConnect';
import { connectMetaMask, connectWalletConnect } from 'actions/connect';
import { useAppDispatch } from 'redux/hooks';
import { actions } from 'redux/walletUser/actions';
import { walletProvider } from 'helpers/wallet-connect.helper';

export interface ModalConnectProps {
    isOpen: boolean;
    setOpen: Function;
    network: NetworkType;
}

const ModalConnect: React.FC<ModalConnectProps> = ({ isOpen, setOpen, network }) => {
    const dispatch = useAppDispatch()
    const handleConnect = async (network: NetworkType) => {
        switch (network) {
            case 'metamask':
                const metaMaskUserWallet = await connectMetaMask();
                console.log('metaMaskUserWallet', metaMaskUserWallet);
                dispatch(actions.login(metaMaskUserWallet))
                window.ethereum.on('chainChanged', async function (chain) {
                    console.log('window.ethereum', window.ethereum)
                    // const name = await window.ethereum
                    console.log('chainChanged', chain)
                    const metaMaskUserWallet = await connectMetaMask();
                    console.log('metaMaskUserWallet', metaMaskUserWallet);
                    dispatch(actions.login(metaMaskUserWallet))
                })
                window.ethereum.on('accountsChanged', async function (accounts) {
                    // console.log('initEventsMetamask accountsChanged accounts', accounts)
                    if (accounts && accounts.length > 0) {
                        const metaMaskUserWallet = await connectMetaMask();
                        console.log('metaMaskUserWallet', metaMaskUserWallet);
                        dispatch(actions.login(metaMaskUserWallet))
                    } else {
                        dispatch(actions.logout())
                    }
                })
                break
            case 'walletconnect':
                const walletconnectUserWallet = await connectWalletConnect()
                dispatch(actions.login(walletconnectUserWallet))
                walletProvider.on("disconnect", (code, reason) => {
                    console.log('on disconnect', code, reason);
                    dispatch(actions.logout())
                });
                break
        }
        setOpen(false)
    }
    return (<>
        {isOpen && <div className={style.ModalContainer}>
            <div className={style.ProviderContainer}>
                <div className={"row d-flex align-items-center full-height"}>
                    <div className={"col-12 text-center"}>
                        <div className={style.iconContainer}>
                            {network == 'metamask' ? <Metamask width={200} /> : <WalletConnect width={200} />}
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.ConnectButton} onClick={handleConnect.bind(this, network)}>Connect</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ClosePanel} onClick={() => setOpen(false)}>
                <Close className={style.CloseButton} />
            </div>
        </div>
        }
    </>)
}

export default ModalConnect;

