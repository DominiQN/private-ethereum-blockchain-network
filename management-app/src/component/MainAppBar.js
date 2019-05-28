import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import AppBarSpacer from './AppBarSpacer'

const drawerWidth = 240
const drawerZIndex = 10

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: drawerZIndex + 1,
  },
  drawer: {
    width: drawerWidth,
    zIndex: drawerZIndex,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: grey[300],
    padding: 3,
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
    <div className={classes.header}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {/* 브리지 로고 */}
          <img className={classes.menuIcon} src={''} />
          <Typography variant="h6" className={classes.title}>
            {headerText}
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBarSpacer />
    </div>
  )
}

export default MainAppBar