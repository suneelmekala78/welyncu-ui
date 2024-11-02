import React from 'react'
import CompanyLeft from './CompanyLeft';
import CompanyMid from './CompanyMid';
import CompanyRight from './CompanyRight';

const CompanyMain = () => {
  return (
    <div className='company-main-section'>
      <div className="company-main-left">
        <CompanyLeft/>
      </div>
      <div className="company-main-mid">
        <CompanyMid/>
      </div>
      <div className="company-main-right">
        <CompanyRight/>
      </div>
    </div>
  )
}

export default CompanyMain;