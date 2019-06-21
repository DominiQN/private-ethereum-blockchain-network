import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import MainAppBar from '../component/MainAppBar'
import MainDrawer from '../component/MainDrawer'
import CardListPage from './CardListPage'
import CardCreatePage from './CardCreatePage'
import HistoryPage from './HistoryPage'
import Styles from '../constant/Styles';
import TitleBar from '../component/TitleBar';
import { mockCardList } from '../util/MockDataUtil'
import CardReaderPage from './CardReaderPage';
import ApiUtil from '../util/ApiUtil';

const MockContext = React.createContext({
  cardList: mockCardList,
})

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
    pageTitle: "카드 리스트",
  })
  const classes = useStyles()
  const getPage = (index, title) => {
    const pageList = [
      <CardListPage title={title} />,
      <CardCreatePage title={title} />,
      <HistoryPage title={title} />,
      <CardReaderPage title={title} />,
    ]
    return pageList[index]
  }

  return (
    <div className="App">
      <MainAppBar headerText={"Bridge"} />
      <MainDrawer
        selected={mainOptions.menuIndex}
        onItemClick={(index, title) => {
          setMainOptions({
            menuIndex: index,
            pageTitle: title,
          })
        }} 
      />
      <main className={classes.main}>
        <TitleBar title={mainOptions.pageTitle}/>
        {getPage(mainOptions.menuIndex, mainOptions.pageTitle)}
      </main>
    </div>
  )
}

export default Main