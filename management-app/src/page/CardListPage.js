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
  const [cardAuthList, setCardAuthList] = useState([])
  useEffect(() => {
    if (facilityList > 0) {
      setCardAuthList(facilityList)
    }
  }, [facilityList])
  useEffect(() => {
    if (cardAuthTarget) {
      ApiUtil.getCardAuth((authInfo) => {
        setCardAuthList(facilityList.map(facility => ({
          ...facility,
          checked: authInfo[facility.ip],
        })))
      }, cardAuthTarget.addr)
    }
  }, [cardAuthTarget])

  const onViewButtonClick = (cardData) => {
    setCardAuthTarget(cardData)
  }

  
  const SelectButtonWrapper = (onClick) => (data) => (
    <Checkbox
      checked={data.checked}
      onChange={() => onClick(data)}
      value="checkedA"
      inputProps={{
        'aria-label': 'primary checkbox',
      }}
    />
  )
  const onSelectButtonClick = (data) => {
    const index = cardAuthList.indexOf(data)
    setCardAuthList(prev => [...prev.slice(0, index),
      {...prev[index], checked: !prev[index].checked},
    ...prev.slice(index + 1)])
  }
  const onUpdate = () => {
    ApiUtil.updateAuth(
      cardAuthTarget.addr,
      cardAuthList.filter(facility => facility.checked)
        .map(facility => facility.ip)
    )
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
          setCardAuthList([])
        }}
        title="카드 권한 목록"
        buttonComps={
          <Button
            onClick={onUpdate}
            variant="outlined"
          >
            생성
          </Button>
        }
      >
        <GenericTable
          tableHeader={facilityListTableHeader}
          dataScheme={facilityListDataScheme}
          data={cardAuthList}
          additionalCells={[SelectButtonWrapper(onSelectButtonClick)]}
        />
      </GenericDialog>
    </div>
  )
}

export default CardListPage