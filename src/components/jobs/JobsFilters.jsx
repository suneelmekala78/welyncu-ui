import React from 'react'

const JobsFilters = () => {
  return (
    <div className='jobs-filter-card box-shadow'>
        <p className="filter-title">Filter Jobs</p>
        <div className="jobs-category-filter-section">
          <div className="category-title">Experience</div>
          <div className="categories-list">
            <div className="category-item"><input type="checkbox" name="" id="" /> Fresher</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> 1 - 3 years</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> 3 - 6 years</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> 6 - 12 years</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> 12+ years</div>
          </div>
        </div>

        <div className="jobs-category-filter-section">
          <div className="category-title">Position Type</div>
          <div className="categories-list">
            <div className="category-item"><input type="checkbox" name="" id="" /> Full time</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> Part time</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> Contract</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> Freelance</div>
          </div>
        </div>

        <div className="jobs-category-filter-section">
          <div className="category-title">Workplace Type</div>
          <div className="categories-list">
            <div className="category-item"><input type="checkbox" name="" id="" /> On Site</div>
            <div className="category-item"><input type="checkbox" name="" id="" /> Remote</div>
          </div>
        </div>
    </div>
  )
}

export default JobsFilters;