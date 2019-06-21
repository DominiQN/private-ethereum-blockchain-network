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
      filter: { id: ApiUtil.stringToBytes32(id) },
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
      filter: { id: ApiUtil.stringToBytes32(id) },
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
  listenAccess: (addr, ip, successCallback, failureCallback) => {
    const filter = { cardAddr: addr, facilityIp: ApiUtil.stringToBytes32(ip) }
    console.log('filter', filter)
    contract.once('successHistory', {
      filter,
      fromBlock: 0,
    }, (error, event) => {
      console.log('access success!')
      const history = {
        datetime: new Date(parseInt(event.returnValues.timestamp)).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
        cardAddr: event.returnValues.cardAddr,
        cardId: ApiUtil.bytes32ToString(event.returnValues.cardId),
        dong: ApiUtil.bytes32ToString(event.returnValues.dong),
        ho: ApiUtil.bytes32ToString(event.returnValues.ho),
        facilityIp: ApiUtil.bytes32ToString(event.returnValues.facilityIp),
        facilityName: ApiUtil.bytes32ToString(event.returnValues.facilityName),
      }
      successCallback(history)
    })

    contract.once('failureHistory', {
      fromBlock: 0,
    }, (error, event) => {
      console.error('error', error)
      console.warn('access failure!')
      const history = {
        datetime: new Date(parseInt(event.returnValues.timestamp)).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
        cardAddr: event.returnValues.cardAddr,
        cardId: ApiUtil.bytes32ToString(event.returnValues.cardId),
        dong: ApiUtil.bytes32ToString(event.returnValues.dong),
        ho: ApiUtil.bytes32ToString(event.returnValues.ho),
        facilityIp: ApiUtil.bytes32ToString(event.returnValues.facilityIp),
        facilityName: ApiUtil.bytes32ToString(event.returnValues.facilityName),
        failureCode: event.returnValues.failureCode,
      }
      switch (history.failureCode) {
        case 1: history.failureCode = `존재하지 않는 카드입니다.\naddress: ${addr}`
          break
        case 2: history.failureCode = `정지된 카드입니다.\naddress: ${addr}`
          break
        case 3: history.failureCode = `존재하지 않는 시설이거나, 권한이 없습니다.\naddress: ${addr}, ip: ${ip}`
          break
        default: history.failureCode = `알 수 없는 코드입니다.\n${history.failureCode}`
      }
      console.log(history)
      failureCallback(history)
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

  web3Test: () => {
    // ApiUtil.getFacilityList(console.log)
  },
}

export default ApiUtil

export {
  contract,
}