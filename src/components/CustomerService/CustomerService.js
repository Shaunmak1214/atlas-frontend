import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    let machineId = this.props.match.id;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const CustomerService = props => {
    const [machine, setMachine] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let id = props.match.params.id;
        axios.post(`http://localhost:5000/v1/vendingmachines/${id}`, {
            dummyAuth: 'corneliuspang'
        })
        .then(response => {
            if(response.status == 200) {
                setMachine(response.data);
                setLoading(false);
            }
        })
    }, [props.match.params.id])

    return (
    <div style={{display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
        {loading ? 
        'Loading...'    
        :
      <ChatBot
            steps={[
            {
                id: '1',
                message: `Hi, welcome to Atlas Customer Service.\n How may I help you today?\n\n You are at \n${machine.location.address ? machine.location.address : ''}.`,
                trigger: 'serviceOptions',
            },
            {
                id: 'serviceOptions',
                options: [
                    { value: 'Refueling', label: 'Refueling', trigger: 'refuelItem' },
                    { value: 'Repair', label: 'Repair', trigger: 'repairRemarks' },
                    { value: 'The Vending Machine Ate My Money 😞', label: 'moneyGone', trigger: 'moneyGoneRemarks' }
                ]
            },
            {
                id: 'refuelItem',
                message: 'So what item needs to be refilled?',
                trigger: 'refuelItemInput'
            },
            {
                id: 'refuelItemInput',
                user: true,
                trigger: 'summary'
            },
            {
                id: 'repairRemarks',
                message: 'What seems to be the problem? Briefly describe the issue.',
                user: true,
                trigger: 'summary'
            },
            {
                id: 'moneyGoneRemarks',
                message: 'Sorry to hear that. We will attempt to resolve the matter ASAP. Please enter remarks if any.',
                trigger: 'summary'
            },
            {
                id: 'summary',
                message: 'Here is the summary'
            }
            //   {
            //     id: 'name',
            //     user: true,
            //     trigger: '3',
            //   },
            //   {
            //     id: '3',
            //     message: 'Hi {previousValue}! What is your gender?',
            //     trigger: 'gender',
            //   },
            //   {
            //     id: 'gender',
            //     options: [
            //       { value: 'male', label: 'Male', trigger: '5' },
            //       { value: 'female', label: 'Female', trigger: '5' },
            //     ],
            //   },
            //   {
            //     id: '5',
            //     message: 'How old are you?',
            //     trigger: 'age',
            //   },
            //   {
            //     id: 'age',
            //     user: true,
            //     trigger: '7',
            //     validator: (value) => {
            //       if (isNaN(value)) {
            //         return 'value must be a number';
            //       } else if (value < 0) {
            //         return 'value must be positive';
            //       } else if (value > 120) {
            //         return `${value}? Come on!`;
            //       }

            //       return true;
            //     },
            //   },
            //   {
            //     id: '7',
            //     message: 'Great! Check out your summary',
            //     trigger: 'review',
            //   },
            //   {
            //     id: 'review',
            //     component: <Review />,
            //     asMessage: true,
            //     trigger: 'update',
            //   },
            //   {
            //     id: 'update',
            //     message: 'Would you like to update some field?',
            //     trigger: 'update-question',
            //   },
            //   {
            //     id: 'update-question',
            //     options: [
            //       { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            //       { value: 'no', label: 'No', trigger: 'end-message' },
            //     ],
            //   },
            //   {
            //     id: 'update-yes',
            //     message: 'What field would you like to update?',
            //     trigger: 'update-fields',
            //   },
            //   {
            //     id: 'update-fields',
            //     options: [
            //       { value: 'name', label: 'Name', trigger: 'update-name' },
            //       { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            //       { value: 'age', label: 'Age', trigger: 'update-age' },
            //     ],
            //   },
            //   {
            //     id: 'update-name',
            //     update: 'name',
            //     trigger: '7',
            //   },
            //   {
            //     id: 'update-gender',
            //     update: 'gender',
            //     trigger: '7',
            //   },
            //   {
            //     id: 'update-age',
            //     update: 'age',
            //     trigger: '7',
            //   },
            //   {
            //     id: 'end-message',
            //     message: 'Thanks! Your data was submitted successfully!',
            //     end: true,
            //   },
            ]}
          />
        }
      </div>
    );
};

export default CustomerService;