import {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} from "@solana/web3.js"

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async() =>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log("walet balence ", walletBalance)
    } catch(e){
        console.error(e)
    }
}

const airdropSol = async() => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirdropSigniture = await connection.requestAirdrop(publicKey, 2*LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirdropSigniture.toString(), 'confirmed')
        await connection.confirmTransaction()
    } catch(e){
        console.error("error: ", e)
    }
}

const main = async() => {
    await getWalletBalance()
    await airdropSol()
    await getWalletBalance()
}

main()