import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Drawer, List, ListItemText, ListItem, Divider } from '@material-ui/core';
import Styles from '../constant/Styles'
import AppBarSpacer from './AppBarSpacer'

const useStyles = makeStyles({
  drawer: {
    width: Styles.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: Styles.drawerWidth,
  },
  menuItem: {

  },
  nestedMenuItem: {
    paddingLeft: 24,
  },
})

function MainDrawer() {
  const classes = useStyles()
  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
    >
      <AppBarSpacer />
      <List>
        <ListItem className={classes.menuItem}>
          <ListItemText primary="카드 관리" />
        </ListItem>
        <ListItem className={classes.nestedMenuItem}>
          <ListItemText primary="카드 리스트" />
        </ListItem>
        <ListItem className={classes.nestedMenuItem}>
          <ListItemText primary="카드 생성" />
        </ListItem>

        <Divider />

        <ListItem className={classes.menuItem}>
          <ListItemText primary="이력 관리" />
        </ListItem>
        <ListItem className={classes.nestedMenuItem}>
          <ListItemText primary="이력 조회" />
        </ListItem>
        
      </List>
    </Drawer>
  )
}

export default MainDrawer