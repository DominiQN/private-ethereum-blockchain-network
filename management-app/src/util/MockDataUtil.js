import CardStatus from '../constant/CardStatus'

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
    name: '사우나실',
  },
]

const mockCardList = [
  {
    id: 'da00001',
    account: 'e15ceea1dcfae4a61fd6',
    status: CardStatus.NORMAL,
    dong: '101',
    ho: '101',
    auth: [...mockFacilityList],
  },
  {
    id: 'da00002',
    account: '5a4b148d6e8a4a61fd6',
    status: CardStatus.NORMAL,
    dong: '101',
    ho: '102',
    auth: [],
  },
  {
    id: 'da00003',
    account: '5a4ceea1dcfa79036b54',
    status: CardStatus.NORMAL,
    dong: '101',
    ho: '103',
    auth: mockFacilityList.slice(0, 2),
  },
  {
    id: 'da00004',
    account: 'af418e461322c154564a',
    status: CardStatus.SUSPENDED,
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