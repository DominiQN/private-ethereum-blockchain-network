import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/styles'
import { Paper, Table, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles({
  paper: {
    width: '100%',
  },
  wrapper: {
    overflowX: 'auto',
  },
  table: {

  }
})

const HeadTableCell = withStyles(theme => ({
  head: {
    backgroundColor: grey[600],
    color: grey[50],
  },
}))(TableCell)

function GenericTable({ tableHeader, dataScheme, data, pageSize, additionalCells, children }) {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <div className={classes.wrapper}>
        <Table>
          <TableHead>
            <HeadTableCell padding="checkbox">
              {/* <Checkbox

              /> */}
            </HeadTableCell>
            {tableHeader.map(column => (
              <HeadTableCell>{column}</HeadTableCell>
            ))}
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow>
                <TableCell>

                </TableCell>
                {dataScheme.map(column => (
                  <TableCell>{row[column]}</TableCell>
                ))}
                {additionalCells && additionalCells.map(compWrapper => (
                  <TableCell>{compWrapper(row)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  )
}

GenericTable.propTypes = {
  tableHeader: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dataScheme: PropTypes.array.isRequired,
  additionalCells: PropTypes.arrayOf(
    PropTypes.func.isRequired,
  )
}

export default GenericTable