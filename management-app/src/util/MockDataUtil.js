import Status from '../constant/Status'

// personal.unlockAccount(eth.accounts[0], 'bridge')
// gxroom 
// "0x0000000000000000000000000000000000003139322e3136382e3130302e3230","0x0000000000000000000000000000000000000000000000000067785f726f6f6d","0x00000000000000000000000000000000000000000000000000004e4f524d414c"
// sauna 
// "0x0000000000000000000000000000000000003139322e3136382e3130302e3231","0x0000000000000000000000000000000000000000000000000000007361756e61","0x000000000000000000000000000000000000000000000053555350454e444544"

// da00001
// "0xb60d95e2bdb16b46d7156563f7e101be71699a6a","0x0000000000000000000000000000000000000000000000000064613030303031","0x00000000000000000000000000000000000000000000000000004e4f524d414c","0x0000000000000000000000000000000000000000000000000000000000313031","0x0000000000000000000000000000000000000000000000000000000000313031"
// da00002
// "0xcae74a2ad2b8c494020f11dbeaceaaec5225e00a","0x0000000000000000000000000000000000000000000000000064613030303032","0x000000000000000000000000000000000000000000000053555350454e444544","0x0000000000000000000000000000000000000000000000000000000000313031","0x0000000000000000000000000000000000000000000000000000000000313032"

const mockFacilityList = [
  {
    ip: '192.168.100.20',
    name: 'GX룸',
  },
  {
    ip: '192.168.100.21',
    name: '피트니스 센터',
  },
  {
    ip: '192.168.100.22',
    name: '사우나',
  },
  {
    ip: '192.168.100.23',
    name: '수영장',
  }
]

const mockCardList = [
  {
    id: 'da00001',
    account: '0x2af1a3e34b5bd227e27e132c1051fe832479ec59',
    status: Status.NORMAL,
    dong: '101',
    ho: '101',
    auth: [...mockFacilityList],
  },
  {
    id: 'da00002',
    account: '0x750c79253dc3bff94d6b46da5b833ff761a4a665',
    status: Status.NORMAL,
    dong: '101',
    ho: '102',
    auth: [],
  },
  {
    id: 'da00003',
    account: '0x9261f95c7c5ac4a0083007f9c592b1cb1b4ac8be',
    status: Status.NORMAL,
    dong: '101',
    ho: '103',
    auth: mockFacilityList.slice(0, 2),
  },
  {
    id: 'da00004',
    account: '0x71028fc6dc0713d3f7416ac5eba7dbea26f0383e',
    status: Status.SUSPENDED,
    dong: '101',
    ho: '104',
    auth: mockFacilityList.slice(0, 2),
  },
]

const mockHistoryData = [
  {
    account: 'e15ceea1dcfae4a61fd6',
    history: [
      {
        time: '2019-06-01T12:00:46',
        ...mockFacilityList[0]
      },
      {
        time: '2019-06-04T13:34:06',
        ...mockFacilityList[1]
      },
      {
        time: '2019-06-04T14:12:17',
        ...mockFacilityList[0]
      },
      {
        time: '2019-06-04T15:10:55',
        ...mockFacilityList[2]
      },
    ]
  },
  {
    account: '5a4b148d6e8a4a61fd6',
    history: [
      {
        time: '2019-05-01T15:01:23',
        ...mockFacilityList[2]
      },
      {
        time: '2019-05-02T07:34:26',
        ...mockFacilityList[1]
      },
    ]
  },
  {
    account: '5a4ceea1dcfa79036b54',
    history: [
      {
        time: '2019-06-06T17:52:16',
        ...mockFacilityList[0]
      },
    ]
  },
  {
    account: 'af418e461322c154564a',
    history: []
  },
]

export {
  mockCardList,
  mockHistoryData,
  mockFacilityList,
}