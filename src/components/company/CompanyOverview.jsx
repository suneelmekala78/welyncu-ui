import React from 'react'

const CompanyOverview = () => {
  return (
    <div className='company-overview box-shadow'>
        <div className="company-overview-title">Overview</div>
        <div className="company-overview-details">
            <div className="overview-details-item">
                <div className="overview-item-title">Webiste</div>
                <div className="overview-item-value link">www.gogle.com</div>
            </div>
            <div className="overview-details-item">
                <div className="overview-item-title">Industry</div>
                <div className="overview-item-value">Information Technology</div>
            </div>
            <div className="overview-details-item">
                <div className="overview-item-title">Company size</div>
                <div className="overview-item-value">10,001+ employees </div>
            </div>
            <div className="overview-details-item">
                <div className="overview-item-title">Headquarters</div>
                <div className="overview-item-value">Mountain View, CA</div>
            </div>
            <div className="overview-details-item">
                <div className="overview-item-title">Type</div>
                <div className="overview-item-value">Public Company</div>
            </div>
            <div className="overview-details-item">
                <div className="overview-item-title">Founded</div>
                <div className="overview-item-value">1998</div>
            </div>
        </div>
    </div>
  )
}

export default CompanyOverview;