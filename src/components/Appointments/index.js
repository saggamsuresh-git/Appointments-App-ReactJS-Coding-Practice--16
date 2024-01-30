// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarred: false,
  }

  inputChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filterStarredList = () => {
    const {appointmentsList} = this.state
    const filteredList = appointmentsList.filter(
      each => each.isStarred === true,
    )
    this.setState({appointmentsList: filteredList})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {title, date, appointmentsList, isStarred} = this.state
    console.log(isStarred)
    return (
      <div className="bg-container">
        <div className="card-container">
          <form onSubmit={this.onAddAppointment} className="appointment-inputs">
            <div>
              <h1>Add Appointment</h1>
              <div>
                <div className="input-container">
                  <label htmlFor="title">TITLE</label>
                  <input
                    placeholder="Title"
                    className="input-element"
                    id="title"
                    type="text"
                    onChange={this.inputChangeTitle}
                    value={title}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="date">DATE</label>
                  <input
                    onChange={this.onChangeDate}
                    placeholder="dd/mm/yyyy"
                    className="input-element"
                    type="date"
                    id="date"
                    value={date}
                  />
                </div>
              </div>
              <button className="submit-btn" type="submit">
                Add
              </button>
            </div>
            <div>
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </form>
          <hr />
          <div className="bottom-section">
            <div className="appointments-list-container">
              <h1 className="appointments-para">Appointments</h1>
              <button
                className="starred-btn"
                type="button"
                onClick={this.filterStarredList}
              >
                Starred
              </button>
            </div>
            <ul>
              {appointmentsList.map(each => (
                <AppointmentItem
                  details={each}
                  key={each.id}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
