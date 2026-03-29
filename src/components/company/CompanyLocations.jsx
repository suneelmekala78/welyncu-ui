import React from 'react'

const CompanyLocations = ({ page }) => {
  if (!page?.locations?.length) return null;

  return (
    <div className='company-locations box-shadow'>
        <div className="company-locations-title">Locations</div>
        <div className="company-locations-grid">
            {page.locations.map((loc, i) => (
              <div className="company-location box-shadow" key={i}>
                <div className="company-location-map"></div>
                <div className="company-location-details">
                    <div className="company-location-title">{loc.city || loc.title || "Location"}</div>
                    <div className="company-location-address">{loc.address || ""}</div>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default CompanyLocations;