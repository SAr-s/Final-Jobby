import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import './index.css'

const SimilarJobItemDetails = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails
  return (
    <li className="similar-card">
      <div className="first-part">
        <img src={companyLogoUrl} alt="" className="image" />
        <div>
          <h1 className="title coloring">{title}</h1>
          <p className="rating coloring">
            <FaStar className="star" /> {rating}
          </p>
        </div>
      </div>
      <div className="description-container">
        <h1 className="coloring">Description</h1>
        <p className="coloring">{jobDescription}</p>
      </div>
      <div>
        <p className="coloring">
          <FaMapMarkerAlt className="map" />
          {location}
        </p>
        <p className="coloring">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItemDetails
