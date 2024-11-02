import React from 'react'

const CompanyLocations = () => {
  return (
    <div className='company-locations box-shadow'>
        <div className="company-locations-title">Locations</div>
        <div className="company-locations-grid">
            <div className="company-location box-shadow">
                <div className="company-location-map"></div>
                <div className="company-location-details">
                    <div className="company-location-title">Hyderabad, TS</div>
                    <div className="company-location-address">PO Box 16122 Collins Street West Victoria 8007 Australia</div>
                </div>
                <div className="company-location-link link">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> View map
                </div>
            </div>
            <div className="company-location box-shadow">
                <div className="company-location-map"></div>
                <div className="company-location-details">
                    <div className="company-location-title">Hyderabad, TS</div>
                    <div className="company-location-address">PO Box 16122 Collins Street West Victoria 8007 Australia</div>
                </div>
                <div className="company-location-link link">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> View map
                </div>
            </div>
            <div className="company-location box-shadow">
                <div className="company-location-map"></div>
                <div className="company-location-details">
                    <div className="company-location-title">Hyderabad, TS</div>
                    <div className="company-location-address">PO Box 16122 Collins Street West Victoria 8007 Australia</div>
                </div>
                <div className="company-location-link link">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> View map
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyLocations;