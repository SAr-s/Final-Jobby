import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar'

import './index.css'

const Home = props => {
  const onSearch = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <h1 className="heading">Find The Job That Fits your Life</h1>
        <p className="paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="jobs" onClick={onSearch}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default withRouter(Home)
