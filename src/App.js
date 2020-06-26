import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      newHealthConcerns: '',
      dob: new Date(),
      phone: '',
      pcp: '',
      hasPcp: false,
      healthConcerns: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleDateChange(date) {
    this.setState({ dob: date });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newHealthConcerns) {
      this.setState({
        healthConcerns: [...this.state.healthConcerns, this.state.newHealthConcerns]
      });
    }
    if (isNaN(this.state.phone)) {
      alert("the entered phone number contains non-numerical characters. Please revise.");
      return;
    }
    for (const state in this.state) {
      console.log(state, ': ', this.state[state]);
    }
  }

  render() {
    let pcp;
    let healthConcerns;
    if (this.state.hasPcp === 'true') {
      pcp = <div>PCP name: <textarea name='pcp' onChange={this.handleChange} /></div>
    }
    if (this.state.healthConcerns.length > 0) {
      healthConcerns = <div>
        <h3>History</h3>
        <ul>
          {this.state.healthConcerns.map(val =>
            <li key={val}>{val}</li>
          )}
        </ul>
      </div>
    }

    return (
      <div className="App">
        <form>
          <h2>
            Patient Information
        </h2>
          <div className="name">
            <label>
              First Name
              <input type="text" name="firstName" onChange={this.handleChange} />
            </label>
            <label>
              Last Name
              <input type="text" name="lastName" onChange={this.handleChange} />
            </label>
          </div>
          <div className="dob">
            DOB (drop down selection)
            <DatePicker name='dob' selected={this.state.dob} onChange={this.handleDateChange} />
          </div>

          <label>
            Phone number <input type="text" maxLength='10' name="phone" onChange={this.handleChange}></input>
          </label>

          <h2>Care Information</h2>

          <div>
            Are you currently under a PCP?
            <div onChange={this.handleChange}>
              <input type="radio" value="true" name="hasPcp" /> Yes
              <input type="radio" value="false" name="hasPcp" /> No
            </div>
          </div>
          {pcp}
          <h2>Health Concerns and Symptoms</h2>
          <div>
            What are your current health concerns?
            <div>
              <textarea name='newHealthConcerns' onChange={this.handleChange} />
            </div>
          </div>
          {healthConcerns}
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default App;
