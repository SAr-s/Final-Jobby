import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'

import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import SimilarJobItemDetails from '../SimilarJobItemDetails'
import './index.css'

class JobItemDetails extends Component {
  state = {isLoading: true, isError: false, jobData: {}, similarJobData: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true, isError: false})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const specificJobDetails = fetchedData.job_details
        const similarJobs = fetchedData.similar_jobs
        const details = {
          companyLogoUrl: specificJobDetails.company_logo_url,
          companyWebsiteUrl: specificJobDetails.company_website_url,
          employmentType: specificJobDetails.employment_type,
          id: specificJobDetails.id,
          jobDescription: specificJobDetails.job_description,
          skills: specificJobDetails.skills,
          lifeAtCompany: specificJobDetails.life_at_company,
          location: specificJobDetails.location,
          packagePerAnnum: specificJobDetails.package_per_annum,
          rating: specificJobDetails.rating,
          title: specificJobDetails.title,
        }
        const SimilarJobDetails = similarJobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }))
        this.setState({
          jobData: details,
          similarJobData: SimilarJobDetails,
          isLoading: false,
        })
      } else {
        throw new Error('failed to fetch specific job details')
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }

  renderJobDetails = () => {
    const {jobData, similarJobData} = this.state
    return (
      <div className="details-page">
        <div className="card">
          <div className="first-part">
            <img src={jobData.companyLogoUrl} alt="" className="image" />
            <div>
              <h1 className="title">{jobData.title}</h1>
              <p className="rating">
                <FaStar className="star" /> {jobData.rating}
              </p>
            </div>
          </div>
          <div className="address">
            <div className="map-emp">
              <p className="coloring marginal">
                <FaMapMarkerAlt className="map" />
                {jobData.location}
              </p>
              <p className="coloring">{jobData.employmentType}</p>
            </div>
            <p className="coloring">{jobData.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div>
            <div className="web-link">
              <h1 className="coloring">Description</h1>
              <a
                href={jobData.companyWebsiteUrl}
                target="blank_"
                className="link"
              >
                Visit
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>

            <p className="coloring">{jobData.jobDescription}</p>
          </div>
          <div className="skills">
            <h1 className="coloring">Skills</h1>
            <div className="skill-name">
              {jobData.skills.map(eachItem => (
                <li className="each-skill">
                  <img src={eachItem.image_url} alt="" className="skill-logo" />
                  <p className="coloring">{eachItem.name}</p>
                </li>
              ))}
            </div>
          </div>
          <div className="life">
            <div>
              <h1 className="coloring">Life at Company</h1>
              <p className="coloring">{jobData.lifeAtCompany.description}</p>
            </div>
            <img src={jobData.lifeAtCompany.image_url} alt="" />
          </div>
        </div>
        <h1 className="coloring">Similar Jobs</h1>
        <div className="similar-job">
          {similarJobData.map(eachItem => (
            <SimilarJobItemDetails
              similarDetails={eachItem}
              key={eachItem.id}
            />
          ))}
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="coloring">Oops! Something Went Wrong</h1>
      <p className="coloring">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {isLoading, isError} = this.state
    let renderFinder
    if (isLoading) {
      renderFinder = this.renderLoader()
    } else if (isError) {
      renderFinder = this.renderFailure()
    } else {
      renderFinder = this.renderJobDetails()
    }
    return (
      <div>
        <Navbar />
        {renderFinder}
      </div>
    )
  }
}

export default JobItemDetails
