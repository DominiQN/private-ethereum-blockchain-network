import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import GenericTable from '../component/GenericTable';
import { mockHistoryData } from '../util/MockDataUtil'
import ApiUtil from '../util/ApiUtil';

const tableHeader = [
  '사용시간', '시설 IP', '시설 이름', '이더리움 계정', '카드 ID', '동', '호',
]

const dataScheme = [
  'datetime', 'facilityIp', 'facilityName', 'cardAddr', 'cardId', 'dong', 'ho',
]

const useCardList = () => {
  const [cardList, setCardList] = useState([])
  useEffect(() => {
    ApiUtil.getCardList(setCardList)
  }, [])
  return cardList
}

const useCardHistory = (cardList) => {
  const [filter, setFilter] = useState()
  const [cardHistory, setCardHistory] = useState([])

  useEffect(() => {
    if (cardList.length === 0) {
      return
    }
    if (filter) {
      console.log(filter)
      ApiUtil.getHistory(setCardHistory, filter.year, filter.month, filter.addr, filter.ip)
    }
  }, [cardList, filter])
  return [cardHistory, setFilter]
}

function HistoryPage() {
  const cardList = useCardList()
  const [cardHistory, setFilter] = useCardHistory(cardList)
  const [card, setCard] = useState()
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState(0)
  const [ip, setIp] = useState('')
  const classes = useStyles()

  function onClickCard(e) {
    setCard(e.target.value)
  }

  function onViewClick() {
    setFilter({
      year: year > 0 ? year : null,
      month: (month > 0 && month <= 12) ? month : null,
      card: card && card.addr,
      ip,
    })
  }

  return (
    <div style={{ marginTop: 24 }}>
      <form autoComplete="off" className={classes.form}>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="card-select">카드</InputLabel>
          <Select
            className={classes.select}
            value={card}
            onChange={onClickCard}
            inputProps={{
              name: 'card',
              id: 'card-select',
            }}
          >
            <MenuItem value={null}>선택</MenuItem>
            {cardList.map(card => (
              <MenuItem key={card.addr} value={card}>{`${card.id} | ${card.dong}동 ${card.ho}호`}</MenuItem>
            ))}
          </Select>
          <TextField
            id="filter-year"
            label="연"
            type="number"
            className={classes.textfield}
            value={year}
            onChange={e => setYear(e.target.value)}
          />
          <TextField
            id="filter-month"
            label="월"
            type="number"
            className={classes.textfield}
            value={month}
            onChange={e => setMonth(e.target.value)}
          />
          <TextField
            id="filter-ip"
            label="IP"
            className={classes.textfield}
            value={ip}
            onChange={e => setIp(e.target.value)}
          />
          <Button variant="contained" onClick={onViewClick}>
            조회
          </Button>
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
    display: 'flex',
    flexDirection: 'row',
  },
  select: {
    minWidth: 300,
  },
  textfield: {
    marginLeft: 8,
    marginRight: 8,
    minWidth: 200,
    maxWidth: 500,
  },
})

export default HistoryPage