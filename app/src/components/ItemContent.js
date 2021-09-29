import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'

import Data from './Data'
import Header from './Header'
import ArrowUp from './ArrowUp'
import fetchInfo from '../utils/fetchInfo'
import fetchData from '../utils/fetchData'


const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    top: 'calc(50% - 25px)',
    left: 'calc(50% - 25px)',
    color: '#777',
  },
}))


const ItemContent = () => {

  const { id } = useParams()

  const classes = useStyles()

  const [info, setInfo] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    // get the project configuration information
    fetchInfo().then(info => setInfo(info))

    getData(id)
  }, [])

  const getData = itemid => {
    setLoading(true)
    fetchData(itemid).then(data => {
      setLoading(false)
      setData(data)
    })
  }

  const renderLoading = () => {
    if ( !loading ) { return }
    return (
      <CircularProgress
        size={50}
        color="inherit"
        className={classes.loading} />
    )
  }

  return (
    <React.Fragment>
      <div id="top" />
      <Header getData={getData} />
      <Container maxWidth="xl" loading={loading}>
        {!!data && <Data data={data} />}
        {renderLoading()}
        <ArrowUp/>
      </Container>
    </React.Fragment>
  )
}


export default ItemContent
