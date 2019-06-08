import Web3 from 'web3'

const contractAddr = '0x625e417b93d2d40e86497b0cd9aa25b1e21b4235'

const uri = 'ws://175.207.46.3:8546'

const web3 = new Web3(Web3.givenProvider || uri, null, {})

const ApiUtil = {
  web3Test: () => {
    web3.eth.sendTransaction({
      to: '0x2af1a3e34b5bd227e27e132c1051fe832479ec59',
    })
  },
  createAccount: (password = 'test') => {
    const acc = web3.eth.accounts.create()
    console.log('account', acc)
  }
}

export default ApiUtil