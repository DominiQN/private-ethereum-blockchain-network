import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, LinearProgress } from '@material-ui/core';
import ApiUtil from '../util/ApiUtil';
import GenericDialog from '../component/GenericDialog';

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

function CardReaderPage() {
  ApiUtil.web3Test()
  const cardList = useCardList()
  const [cardHistory, setFilter] = useCardHistory(cardList)
  const [card, setCard] = useState()
  const [ip, setIp] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (isLoading) {
      console.log(card.addr, ip)
      ApiUtil.listenAccess(card.addr, ip, (event) => {
        setResultMessage('통과! 이력 기록됨')
        setLoading(false)
      }, (event) => {
        console.log(event)
        setResultMessage(event.failureCode)
        setLoading(false)
      })
    }
  }, [isLoading, card, ip])

  function onTouchClick() {
    if (card && ip) {
      ApiUtil.access(card.addr, ip)
      setOpenDialog(true)
      setLoading(true)
    } else {
      console.warn('please set both card and ip', card, ip)
    }
  }

  function onClickCard(e) {
    setCard(e.target.value)
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
            id="facility-ip"
            label="시설 IP"
            className={classes.textfield}
            value={ip}
            onChange={e => setIp(e.target.value.trim())}
          />
          <Button className={classes.button} variant="contained" onClick={onTouchClick}>
            인식
          </Button>
        </FormControl>
      </form>
      <GenericDialog
        title={isLoading ? '카드 인식 중' : ''}
        open={openDialog}
        buttonComps={!isLoading && (<Button
          onClick={() => setOpenDialog(false)}
        >
          닫기
        </Button>)}
      >
        {isLoading
         ? (<LinearProgress />)
         : resultMessage
        }
      </GenericDialog>
    </div>
  )
}

const useStyles = makeStyles({
  form: {
    margin: 8,
    minWidth: 150,
    display: 'flex',
  },
  select: {
    minWidth: 300,
  },
  textfield: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    minWidth: 200,
    maxWidth: 500,
  },
  button: {
    marginTop: 8,
  }
})

export default CardReaderPage