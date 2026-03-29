import React from 'react'
import CompanyMidTop from './CompanyMidTop'
import CompanyAbout from './CompanyAbout'
import CompanyOverview from './CompanyOverview'
import CompanyLocations from './CompanyLocations'

const CompanyMid = ({ page }) => {
  return (
    <div className='company-middle-section'>
      <CompanyMidTop/>
      <CompanyAbout page={page} />
      <CompanyOverview page={page} />
      <CompanyLocations page={page} />
    </div>
  )
}

export default CompanyMid