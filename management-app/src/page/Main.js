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
  // React.useEffect(() => {
  //   ApiUtil.createCard('lost_card', '101', '101', 'SUSPENDED')
  //   ApiUtil.createCard('card0001', '101', '101')
  //   ApiUtil.createCard('card0002', '101', '102')
  //   ApiUtil.createFacility('10.0.0.1', 'SAUNA')
  //   ApiUtil.createFacility('10.0.0.2', 'GYM')
  //   ApiUtil.createFacility('10.0.0.3', 'PILATES_ROOM')
  //   ApiUtil.createFacility('10.0.0.4', 'COOKING_ROOM')
  // }, [])
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