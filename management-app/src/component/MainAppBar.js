import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import AppBarSpacer from './AppBarSpacer'
import Styles from '../constant/Styles'

const useStyles = makeStyles({
  appBar: {
    zIndex: Styles.drawerZIndex + 1,
    backgroundColor: grey[900],
  },
  menuIcon: {
    marginRight: 4,
  },
  title: {
  },
})

function MainAppBar({ headerText }) {
  const classes = useStyles()
  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {/* 브리지 로고 */}
          <img className={classes.menuIcon} src={''} />
          <Typography variant="h4" className={classes.title}>
            {headerText}
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBarSpacer />
    </>
  )
}

export default MainAppBar