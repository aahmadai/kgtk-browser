import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import Data from './Data'
import Header from './Header'
import ArrowUp from './ArrowUp'
import fetchData from '../utils/fetchData'


const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    top: 'calc(50% - 25px)',
    left: 'calc(50% - 25px)',
    color: '#777',
  },
}))


const Content = () => {

  const classes = useStyles()

  const [data, setData] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const locationQuery = new URLSearchParams(window.location.search)
    if ( locationQuery.has('id') ) {
      getData(locationQuery.get('id'))
    }
  }, [])

  const getData = id => {
    setLoading(true)
    fetchData(id).then(data => {
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


export default Content
