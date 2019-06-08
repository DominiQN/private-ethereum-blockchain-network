import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    padding: 16,
  },
})


function TitleBar({ title }) {
  const classes = useStyles()
  return (
    <div >
      <Typography className={classes.title} variant="h4" >
        {title}
      </Typography>
      <Divider />
    </div>
  )
}

export default TitleBar