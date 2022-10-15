
const optimize = true;
import { Program } from '@hyperionbt/helios'

export const contractScript = (SELLER_BYTES: string, tokenName: string) => ` 
minting  seed_token

const seller_pubkey: PubKeyHash = PubKeyHash::new(${SELLER_BYTES})

func main(ctx: ScriptContext) -> Bool {
    tx: Tx = ctx.tx;
    // nft_assetclass: AssetClass = AssetClass::new(
    //    ctx.get_current_minting_policy_hash(), 
    //     ${tokenName}.encode_utf8()
    // );
    // value_minted: Value = tx.minted;
    // value_minted == Value::new(nft_assetclass, 1) &&
    tx.is_signed_by(seller_pubkey)
}`;


export const generateContract = (sellerPkh: string, collectionName: string): any => {
    let SELLER_BYTES = "#" // must be
    if (sellerPkh === null) {
        throw new Error("unexpected null sellerPkh");
    } else {
        SELLER_BYTES = "#"+sellerPkh
    }
    const contract = contractScript(SELLER_BYTES, `"${collectionName}"`)
    const program = Program.new(contract);

    return program.compile(optimize);
}
