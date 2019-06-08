import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import GenericTable from '../component/GenericTable'
import GenericDialog from '../component/GenericDialog'
import { mockCardList, mockFacilityList } from '../util/MockDataUtil'

const cardListTableHeader = [
  '카드 ID', '이더리움 계정', '카드 상태', '동', '호', ''
]
const cardListDataScheme = [
  'id', 'account', 'status', 'dong', 'ho',
]

const cardAuthListTableHeader = [
  '시설 IP', '이름', '권한 여부',
]

const cardAuthListDataScheme = [
  'ip', 'name'
]

const ViewButtonWrapper = (onClick) => (data) => (
  <Button variant="contained" onClick={() => onClick(data)}>
    조회
  </Button>
)

const useFacilityList = () => {
  const [facilityList, setFacilityList] = useState([])
  // TODO: set real facility data
  useEffect(() => {
    setFacilityList(mockFacilityList)
  }, [facilityList])
  return facilityList
}

const useCheckBox = () => {
  const [checkbox, setCheckbox] = useState([])
  const [size, setSize] = useState(0)
  useEffect(() => {
    
  }, [size])
  return [checkbox, setSize]
}

function CardListPage() {
  const [openAuthDialog, setOpenAuthDialog] = useState(false)
  const [cardAuthList, setCardAuthList] = useState([])
  // const facilityList = useFacilityList()
  // const [checkBox] = useCheckBox()

  // useEffect(() => {
  //   setSize(facilityList.length)
  // }, [cardAuthList, facilityList])

  const onViewButtonClick = (cardData) => {
    setCardAuthList(cardData.auth)
    setOpenAuthDialog(true)
  }
  return (
    <div style={{ marginTop: 24 }}>
      <GenericTable
        tableHeader={cardListTableHeader}
        dataScheme={cardListDataScheme}
        data={mockCardList}
        additionalCells={[ViewButtonWrapper(onViewButtonClick)]}
      />
      <GenericDialog
        open={openAuthDialog}
        onClose={() => setOpenAuthDialog(false)}
        title="카드 권한 목록"
      >
        <GenericTable
          tableHeader={cardAuthListTableHeader}
          dataScheme={cardAuthListDataScheme}
          data={cardAuthList}
          // additionalCells={}
        />
      </GenericDialog>
    </div>
  )
}

export default CardListPage