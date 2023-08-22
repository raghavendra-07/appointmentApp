// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentList, toggleIsStarred} = props
  const {title, date, id, isStarred} = appointmentList

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="li-con">
      <div className="li-inner-con">
        <p className="title">{title}</p>
        <button
          type="button"
          // eslint-disable-next-line react/no-unknown-property
          data-testid="star"
          className="star-img-btn"
          onClick={onClickStar}
        >
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
} // Correct: Block statement with explicit return

export default AppointmentItem
