import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import GenericTable from '../component/GenericTable';
import { mockHistoryData, mockCardList } from '../util/MockDataUtil'

const tableHeader = [
  '사용시간', '시설 IP', '시설 이름',
]

const dataScheme = [
  'time', 'ip', 'name',
]

const useCardHistory = () => {
  const [card, setCard] = useState()
  const [cardHistory, setCardHistory] = useState([])
  function getCardHistory(card) {
    const historyData = mockHistoryData.find(data => data.account === card.account)
    return historyData ? historyData.history : []
  }
  useEffect(() => {
    if (card && card.account) {
      setCardHistory(getCardHistory(card))
    } else {
      console.warn('no card', card)
    }
  }, [card])
  return [cardHistory, card, setCard]
}

function HistoryPage() {
  const [cardList, setCardList] = useState([])
  const [cardHistory, card, setCard] = useCardHistory()
  const classes = useStyles()

  console.log('selected', card)

  useEffect(() => {
    setCardList(mockCardList)
  }, [])

  function onClickCard(e) {
    setCard(e.target.value)
  }

  console.log('cardHistory', cardHistory)
  return (
    <div style={{ marginTop: 24 }}>
      <form autoComplete="off">
        <FormControl className={classes.form}>
          <InputLabel htmlFor="card-select">카드</InputLabel>
          <Select
            value={card}
            onChange={onClickCard}
            inputProps={{
              name: 'card',
              id: 'card-select',
            }}
          >
            <MenuItem value={null}>선택</MenuItem>
            {cardList.map(card => (
              <MenuItem key={card.account} value={card}>{`${card.id} | ${card.dong}동 ${card.ho}호`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      <GenericTable
        tableHeader={tableHeader}
        dataScheme={dataScheme}
        data={cardHistory}
      />
    </div>
  )
}

const useStyles = makeStyles({
  form: {
    margin: 8,
    minWidth: 150,
  }
})

export default HistoryPage