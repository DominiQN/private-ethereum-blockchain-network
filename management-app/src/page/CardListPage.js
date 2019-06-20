import React, { useState, useEffect } from 'react'
import { Button, Checkbox } from '@material-ui/core';
import GenericTable from '../component/GenericTable'
import GenericDialog from '../component/GenericDialog'
import ApiUtil from '../util/ApiUtil';

const cardListTableHeader = [
  '카드 ID', '이더리움 계정', '카드 상태', '동', '호', ''
]
const cardListDataScheme = [
  'id', 'addr', 'status', 'dong', 'ho',
]

const facilityListTableHeader = [
  '시설 IP', '시설명', ''
]

const facilityListDataScheme = [
  'ip', 'name'
]

const ViewButtonWrapper = (onClick) => (data) => (
  <Button variant="contained" onClick={() => onClick(data)}>
    조회
  </Button>
)

const useFacilityList = () => {
  const [facilityList, setFacilityList] = useState([])
  useEffect(() => {
    ApiUtil.getFacilityList(setFacilityList)
  }, [])
  return facilityList
}

const useCardList = () => {
  const [cardList, setCardList] = useState([])
  useEffect(() => {
    ApiUtil.getCardList(setCardList)
  }, [])
  return cardList
}

function CardListPage() {
  const cardList = useCardList()
  const facilityList = useFacilityList()
  const [cardAuthTarget, setCardAuthTarget] = useState()
  const [cardAuth, setCardAuth] = useState({})

  useEffect(() => {
    if (cardAuthTarget) {
      ApiUtil.getCardAuth(console.log, cardAuthTarget.addr)
    }
  }, [cardAuthTarget])

  const onViewButtonClick = (cardData) => {
    setCardAuthTarget(cardData)
  }

  
  const SelectButtonWrapper = (onClick) => (data) => (
    <Checkbox
      checked={cardAuth[data.ip]}
      // onChange={handleChange('checkedA')}
      value="checkedA"
      inputProps={{
        'aria-label': 'primary checkbox',
      }}
    />
  )
  const onSelectButtonClick = () => {

  }
  const onUpdate = () => {

  }
  return (
    <div style={{ marginTop: 24 }}>
      <GenericTable
        tableHeader={cardListTableHeader}
        dataScheme={cardListDataScheme}
        data={cardList}
        additionalCells={[ViewButtonWrapper(onViewButtonClick)]}
      />
      <GenericDialog
        open={!!cardAuthTarget}
        onClose={() => {
          setCardAuthTarget(null)
          setCardAuth([])
        }}
        title="카드 권한 목록"
      >
        <GenericTable
          tableHeader={facilityListTableHeader}
          dataScheme={facilityListDataScheme}
          data={facilityList}
          additionalCells={[SelectButtonWrapper(onSelectButtonClick)]}
        />
          <Button
            onClick={onUpdate}
            variant="outlined"
          >
            생성
          </Button>
      </GenericDialog>
    </div>
  )
}

export default CardListPage