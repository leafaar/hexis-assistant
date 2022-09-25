import { Connection } from '@metaplex/js'; 
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export const haveNFT = async (contract: string, owner: string) => {
    // Contract = updateAuthority
    let nfts = [];
    const connection = new Connection('mainnet-beta');
    const nftsMetadata = await Metadata.findDataByOwner(connection, owner);
    nftsMetadata.forEach((nft) =>  {
        if(nft.updateAuthority === contract){
            nfts.push(nft);
        }
    });
    if(nfts.length > 0 ){
        return nfts.length;
    } else {
        return false;
    }
}
