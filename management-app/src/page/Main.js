import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import MainAppBar from '../component/MainAppBar'
import MainDrawer from '../component/MainDrawer'
import CardListPage from './CardListPage'
import CardCreatePage from './CardCreatePage'
import HistoryPage from './HistoryPage'
import Styles from '../constant/Styles';

const useStyles = makeStyles({
  main: {
    flex: 1,
    marginLeft: Styles.drawerWidth,
    padding: 16,
  },
})

function Main() {
  const [mainOptions, setMainOptions] = useState({
    menuIndex: 0,
    pageTitle: "",
  })
  const classes = useStyles()
  const getPage = (index, title) => {
    const pageList = [
      <CardListPage title={title} />,
      <CardCreatePage title={title} />,
      <HistoryPage title={title} />,
    ]
    return pageList[index]
  }

  return (
    <div className="App">
      <MainAppBar headerText={"Bridge"} />
      <MainDrawer onItemClick={(index, value) => {
        setMainOptions({
          menuIndex: index,
          pageTitle: value,
        })
      }} />
      <main className={classes.main}>
        {getPage(mainOptions.menuIndex, mainOptions.pageTitle)}
      </main>
    </div>
  )
}

export default Main