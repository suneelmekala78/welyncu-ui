import React from 'react'

const CompanyOverview = ({ page }) => {
  return (
    <div className='company-overview box-shadow'>
        <div className="company-overview-title">Overview</div>
        <div className="company-overview-details">
            {page?.websiteLink && (
              <div className="overview-details-item">
                <div className="overview-item-title">Website</div>
                <div className="overview-item-value link">{page.websiteLink}</div>
              </div>
            )}
            {page?.industry && (
              <div className="overview-details-item">
                <div className="overview-item-title">Industry</div>
                <div className="overview-item-value">{page.industry}</div>
              </div>
            )}
            {page?.size && (
              <div className="overview-details-item">
                <div className="overview-item-title">Company size</div>
                <div className="overview-item-value">{page.size}</div>
              </div>
            )}
            {page?.headquarters && (
              <div className="overview-details-item">
                <div className="overview-item-title">Headquarters</div>
                <div className="overview-item-value">{page.headquarters}</div>
              </div>
            )}
            {page?.type && (
              <div className="overview-details-item">
                <div className="overview-item-title">Type</div>
                <div className="overview-item-value">{page.type}</div>
              </div>
            )}
            {page?.founded && (
              <div className="overview-details-item">
                <div className="overview-item-title">Founded</div>
                <div className="overview-item-value">{page.founded}</div>
              </div>
            )}
        </div>
    </div>
  )
}

export default CompanyOverview;