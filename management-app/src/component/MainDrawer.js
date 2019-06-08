import React, { useState } from 'react'
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

function MainDrawer({ selected, onItemClick }) {
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
        <ListItem
          button
          selected={selected === 0}
          onClick={() => onItemClick(0, "카드 리스트")}
          className={classes.nestedMenuItem}
          >
          <ListItemText primary="카드 리스트" />
        </ListItem>
        <ListItem
          button
          selected={selected === 1}
          onClick={() => onItemClick(1, "카드 생성")}
          className={classes.nestedMenuItem}
          >
          <ListItemText primary="카드 생성" />
        </ListItem>

        <Divider />

        <ListItem className={classes.menuItem}>
          <ListItemText primary="이력 관리" />
        </ListItem>
        <ListItem
          button
          selected={selected === 2}
          onClick={() => onItemClick(2, "이력 조회")}
          className={classes.nestedMenuItem}
        >
          <ListItemText primary="이력 조회" />
        </ListItem>
        
      </List>
    </Drawer>
  )
}

export default MainDrawer