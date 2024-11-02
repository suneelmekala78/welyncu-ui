import React from 'react'
import CompanyMidTop from './CompanyMidTop'
import CompanyAbout from './CompanyAbout'
import CompanyOverview from './CompanyOverview'
import CompanyLocations from './CompanyLocations'

const CompanyMid = () => {
  return (
    <div className='company-middle-section'>
      <CompanyMidTop/>
      <CompanyAbout />
      <CompanyOverview/>
      <CompanyLocations/>
    </div>
  )
}

export default CompanyMid