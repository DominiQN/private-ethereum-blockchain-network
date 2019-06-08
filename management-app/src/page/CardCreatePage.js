import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, TextField, Button } from '@material-ui/core'
import GenericTable from '../component/GenericTable'
import ApiUtil from '../util/ApiUtil'
import { mockFacilityList } from '../util/MockDataUtil'

const useFacilityList = () => {
  const [facilityList, setFacilityList] = useState([])
  useEffect(() => {
    setFacilityList(mockFacilityList)
  }, [])
  return facilityList
}

function CardCreatePage() {
  const classes = useStyles()
  const facilityList = useFacilityList()

  function onSubmit() {
    ApiUtil.createAccount()
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
          />
          <TextField
            id="card-status"
            label="카드 상태"
            className={classes.textfield}
          />
          <div className={classes.dongHo}>
            <TextField
              id="card-dong"
              label="동"
              className={classes.textfield}
            />
            <TextField
              id="card-ho"
              label="호"
              className={classes.textfield}
            />
          </div>
        </div>
        <div className={classes.tableContainer}>
          <GenericTable
            tableHeader={facilityListTableHeader}
            dataScheme={facilityListDataScheme}
            data={facilityList}
            // additionalCells={}
          />
        </div>
        
      </form>
    </Paper>
  )
}

const facilityListTableHeader = [
  '시설 IP', '시설명', ''
]

const facilityListDataScheme = [
  'ip', 'name'
]

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
    flexDirection: 'row-reverse',
  },
  createButton: {

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