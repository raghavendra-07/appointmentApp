// Write your code here
import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    appointmentList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const formattedDate = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: inputTitle,
      date: formattedDate,
      isStarred: false,
      // isFilterActive: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {inputTitle, inputDate} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="main-con">
        <div className="inner-con">
          <h1 className="head">Add Appointment</h1>
          <form className="form-con" onSubmit={this.onAddAppointment}>
            <div className="input-con">
              <label className="title-name" htmlFor="title">
                Title
              </label>
              <input
                onChange={this.onChangeTitle}
                id="title"
                type="text"
                placeholder="Title"
                value={inputTitle}
                className="title-input"
              />
              <label className="date-name" htmlFor="date">
                Date
              </label>
              <input
                className="date-input"
                onChange={this.onChangeDate}
                id="date"
                type="date"
                value={inputDate}
                placeholder="Date"
              />
              <button className="btn" type="submit">
                Add
              </button>
            </div>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
              />
            </div>
          </form>

          <hr className="hr-line" />
          <div className="appointment-items">
            <h2 className="head">Appointments</h2>
            <button onClick={this.onFilter} className="star-btn" type="button">
              Starred
            </button>
          </div>
          <ul className="ul-con">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentList={eachAppointment}
                key={eachAppointment.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
