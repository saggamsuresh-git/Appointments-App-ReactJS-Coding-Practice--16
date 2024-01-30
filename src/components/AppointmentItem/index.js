// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {details, toggleStar} = props
  const {id, title, date, isStarred} = details

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starTheAppointment = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item-container">
      <div className="each-appointment">
        <p className="appointment-title">{title}</p>
        <button type="button" onClick={starTheAppointment} data-testid="star">
          <img className="star-image" src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
