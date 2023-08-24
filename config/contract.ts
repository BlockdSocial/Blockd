import { nft_abi } from "../abi/nft.abi";
import { chateRoom_abi } from "../abi/chateRoom.abi";


//OLD
const nft_address = "0xdE1dEBADfc466cc50BBaad33917a954d9D77b874" as `0x${string}`


//const nft_address = "0xa0f4527Ae018E0d476197809b7A6D43198690C68" as `0x${string}`

const contract_chateRoom_address = "0xd99Da303e72EEAA187a0f439463843f91055AA63" as `0x${string}`

export const nft_contract = {
  address: nft_address,
  abi: nft_abi,
};

export const chateRoom_contract = {
  address: contract_chateRoom_address,
  abi: chateRoom_abi,
};