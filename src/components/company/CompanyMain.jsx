import React from 'react'
import CompanyLeft from './CompanyLeft';
import CompanyMid from './CompanyMid';
import CompanyRight from './CompanyRight';

const CompanyMain = ({ page }) => {
  return (
    <div className='company-main-section'>
      <div className="company-main-left">
        <CompanyLeft page={page} />
      </div>
      <div className="company-main-mid">
        <CompanyMid page={page} />
      </div>
      <div className="company-main-right">
        <CompanyRight/>
      </div>
    </div>
  )
}

export default CompanyMain;