import React, { useEffect } from 'react'
import Header from '../Header/Header'
import { getEmployeeSummary } from '../../api/apicall'
import Summary from './Summary'

export default function Home() {

  

  return (
    <>
    <Header/>
    <Summary/>
    </>
  )
}
