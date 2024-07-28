import {Link} from 'react-router-dom'
import './index.css'

const JobsCard = props => {
  const {jobData} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData

  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <div className="card">
          <div className="first-part">
            <img src={companyLogoUrl} alt="company logo" className="image" />
            <div>
              <h1 className="title">{title}</h1>
              <p className="rating">{rating}</p>
            </div>
          </div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
