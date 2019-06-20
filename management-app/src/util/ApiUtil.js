import Web3 from 'web3'
import { abi, contractAddr, defaultAccount, uri } from '../constant/ApiConst'
import { ipToInt } from './CommonUtil'
import { get } from 'https';

const web3 = new Web3(Web3.givenProvider || uri, null, {})
const contract = new web3.eth.Contract(abi, contractAddr, {
  defaultAccount,
})

const ApiUtil = {
  stringToBytes32: (string) => {
    let bytes32 = web3.utils.stringToHex(string)
    if (bytes32.length < 66) {
      bytes32 = `0x${bytes32.slice(2).padStart(64, '0')}`
    }
    return bytes32
  },
  bytes32ToString: (bytes32) => {
    return web3.utils.hexToString(bytes32)
  },
  getYearMonth: (date) => `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}`,
  getAccounts: async () => {
    return await web3.eth.getAccounts()
  },
  unlockAccount: (address, password = 'bridge') => {
    return web3.eth.personal.unlockAccount(address, password, 600)
  },
  createAccount: (password = 'bridge') => {
    return web3.eth.personal.newAccount(password)
  },
  createFacility: (ip, name, status = 'NORMAL') => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock')
      console.log('createFacility')
      contract.methods.createFacility(
        ApiUtil.stringToBytes32(ip),
        ApiUtil.stringToBytes32(name),
        ApiUtil.stringToBytes32(status)
      ).send({ from: defaultAccount, gas: 200000 })
        .then(res => console.log(res))
    })
  },
  getFacilityInfo: (ip, getCallback = (res) => {}) => {
    return contract.methods.getFacilityInfo(ip).call()
      .then(res => getCallback(res))
  },
  getFacilityList: (getCallback = (res) => {}) => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock getFacilityList')
      contract.methods.getFacilityList().call().then(res => {
        const facilityList = []
        for (let i in res.ips) {
          facilityList.push({
            ip: ApiUtil.bytes32ToString(res.ips[i]),
            name: ApiUtil.bytes32ToString(res.names[i]),
          })
        }
        facilityList.sort((a, b) => (a.ip - b.ip))
        getCallback(facilityList)
      })
    })
  },
  createCard: (id, dong, ho, status = 'NORMAL') => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock')
      ApiUtil.createAccount().then(addr => {
        console.log('createCard')
        contract.methods.createCard(
          addr,
          ApiUtil.stringToBytes32(id),
          ApiUtil.stringToBytes32(status),
          ApiUtil.stringToBytes32(dong),
          ApiUtil.stringToBytes32(ho),
        ).send({ from: defaultAccount, gas: 300000 })
          .then(res => console.log(res))
      })
    })
  },
  listenCreateCardEvent: (id, successCallback, failureCallback) => {
    contract.once('setCardSuccess', {
      filter: { id },
      fromBlock: 0,
    }, (error, event) => {
      const card = {
        addr: event.returnValues.addr,
        id: ApiUtil.bytes32ToString(event.returnValues.id),
        dong: ApiUtil.bytes32ToString(event.returnValues.dong),
        ho: ApiUtil.bytes32ToString(event.returnValues.ho),
        status: ApiUtil.bytes32ToString(event.returnValues.status),
      }
      successCallback(card)
    })
    contract.once('setCardFailure', {
      filter: { id },
      fromBlock: 0,
    }, (error, event) => failureCallback())
  },
  getCardList: (getCallback = (res) => {}) => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock getCardList')
      contract.methods.getCardList().call().then(res => {
        const cardList = []
        for (let i in res.addrs) {
          cardList.push({
            addr: res.addrs[i],
            id: ApiUtil.bytes32ToString(res.ids[i]),
            status: ApiUtil.bytes32ToString(res.statuses[i]),
            dong: ApiUtil.bytes32ToString(res.dongs[i]),
            ho: ApiUtil.bytes32ToString(res.hos[i]),
          })
        }
        cardList.sort((a, b) => (a.id - b.id))
        getCallback(cardList)
      })
    })
  },

  updateAuth: (addr, ips = []) => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock')
      console.log('updateAuth')
      contract.methods.updateAuth(
        addr,
        ips.map(ip => ApiUtil.stringToBytes32(ip))
      ).send({ from: defaultAccount, gas: 300000 })
        .then(res => console.log(res))
    })
  },
  clearAuth: (addr) => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock')
      console.log('clearAuth')
      contract.methods.clearAuth(
        addr
      ).send({ from: defaultAccount, gas: 200000 })
        .then(res => console.log(res))
    })
  },
  getCardAuth: (getCallback = (res) => {}, addr) => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock getCardAuth')
      contract.methods.getCardAuth(addr).call().then(res => {
        let authList = []
        for (let i in res.ips) {
          authList.push({
            ip: ApiUtil.bytes32ToString(res.ips[i]),
            name: ApiUtil.bytes32ToString(res.names[i]),
          })
        }
        const authInfo = authList.filter(facility => facility.ip.length > 0)
          .reduce((acc, cur) => ({
            ...acc,
            [cur.ip]: true,
          }), {})
        console.log('getCardAuth')
        console.log(authInfo)
        getCallback(authInfo)
      })
    })
  },
  access: (addr, ip, date = new Date()) => {
    ApiUtil.unlockAccount(defaultAccount, 'bridge').then(() => {
      console.log('unlock')
      console.log('access')
      contract.methods.access(
        addr,
        ApiUtil.stringToBytes32(ip),
        date.getTime(),
        ApiUtil.stringToBytes32(ApiUtil.getYearMonth(date))
      ).send({ from: defaultAccount, gas: 100000 })
        .then(res => console.log(res))
    })
  },
  getHistory: (getCallback = () => {}, year, month, addr, ip) => {
    const filter = {}
    if (year && month) {
      filter.yearMonth = ApiUtil.stringToBytes32(`${year}-${`${month}`.padStart(2, '0')}`)
    }
    if (addr) {
      filter.cardAddr = addr
    }
    if (ip) {
      filter.facilityIp = ApiUtil.stringToBytes32(ip)
    }
    console.log('filter', filter)
    contract.getPastEvents('successHistory', {
      filter,
      fromBlock: 0,
      toBlock: 'latest',
    }).then((events) => {
      console.log('events')
      if (events.length > 0) {
        const history = events.map(e => e.returnValues)
          .map(value => ({
            datetime: new Date(parseInt(value.timestamp)).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }),
            cardAddr: value.cardAddr,
            cardId: ApiUtil.bytes32ToString(value.cardId),
            dong: ApiUtil.bytes32ToString(value.dong),
            ho: ApiUtil.bytes32ToString(value.ho),
            facilityIp: ApiUtil.bytes32ToString(value.facilityIp),
            facilityName: ApiUtil.bytes32ToString(value.facilityName),
          }))
          getCallback(history)
      } else {
        getCallback(events)
      }
    })
  },

  web3Test: async () => {
    // const ip = ApiUtil.stringToBytes32('192.168.100.21')
    // const name = ApiUtil.stringToBytes32('sauna')
    // const status = ApiUtil.stringToBytes32('NORMAL')
    // ApiUtil.updateAuth('0xb60d95e2bdb16b46d7156563f7e101be71699a6a', ['192.168.100.20'])

    // ApiUtil.access(
    //   '0xF175Ba9Bd3FCd078C97D2834c592C9e6Cde3f80f', '192.168.0.20'
    // )
    // ApiUtil.updateAuth('0xF175Ba9Bd3FCd078C97D2834c592C9e6Cde3f80f', ['192.168.0.20'])
    // ApiUtil.createCard('da00002', '101', '101')
    // ApiUtil.createFacility('192.168.0.20', 'gx_room')
    // ApiUtil.createFacility('192.168.0.21', 'sauna')
    // ApiUtil.getCardList(console.log)
    // ApiUtil.getFacilityList(console.log)

    ApiUtil.getHistory(console.log, 2019, 7)
  },
}

export default ApiUtil

export {
  contract,
}