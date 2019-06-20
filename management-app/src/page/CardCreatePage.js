import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, TextField, Button } from '@material-ui/core'
import ApiUtil from '../util/ApiUtil'

function CardCreatePage() {
  const classes = useStyles()
  const [cardId, setCardId] = useState('')
  const [dong, setDong] = useState('')
  const [ho, setHo] = useState('')

  function onSubmit() {
    if (cardId && dong && ho) {
      ApiUtil.createCard(cardId, dong, ho)
    } else {
      console.warn('cannot create card', cardId, dong, ho)
    }
  }

  function onSelectButtonClick() {

  }
  return (
    <Paper className={classes.paper}>
      <form className={classes.form}>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.createButton}
            onClick={onSubmit}
            variant="outlined"
          >
            생성
          </Button>
        </div>
        <div className={classes.textContainer}>
          <TextField
            id="card-id"
            label="카드 ID"
            className={classes.textfield}
            value={cardId}
            onChange={e => setCardId(e.target.value)}
          />
          <div className={classes.dongHo}>
            <TextField
              id="card-dong"
              label="동"
              className={classes.textfield}
              value={dong}
              onChange={e => setDong(e.target.value)}
            />
            <TextField
              id="card-ho"
              label="호"
              className={classes.textfield}
              value={ho}
              onChange={e => setHo(e.target.value)}
            />
          </div>
        </div>
      </form>
    </Paper>
  )
}

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    padding: 16,
  },
  form: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textfield: {
    marginLeft: 8,
    marginRight: 8,
    minWidth: 200,
    maxWidth: 500,
  },
  dongHo: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableContainer: {
    marginTop: 16,
  },
})

export default CardCreatePage