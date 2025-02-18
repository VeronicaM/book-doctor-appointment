# Book Doctor Appointment
The app allows you to book an appointment with a consultant. You can select 
- a consultant type (GP, therapist, specialist)
- an available date and time for the chosen consultant
- the appointment type (audio, video)

The application is hosted [here](https://book-appointment-react.herokuapp.com/)

## Requirements

To configure locally you will need to have installed on your machine:
* node *v8.12* or higher 
* npm  *v5.3.0* or higher or yarn *v1.0* or higher

## Installation
1. git clone this repository 
2. cd into the root folder 
3. run `npm install` or `yarn` to install all dependencies

## Run the project
* Run `yarn start` or `npm start` in the root of your project. This should open the project in your default browser at http://localhost:3000/ 

## Technical choices and Tradeoffs

- Enzyme for testing in additional to the JEST setup made available by create-react-app.
  I've chosen to use Enzyme thanks to
   - the ease of testing components
   - I was already familiar with it.
  #### Tradeoffs
    In a production app I would maybe investigate different testing libraries like react-testing-library as:
    - it is more light-weight
    - it allows you to focus more on testing the user interaction with the app instead of components implementation details.
- Heroku for deployment 
  I've chosen to use Heroku thanks to its ease of use and free availability 
- If I had more time to work on it I would ensure better test coverage as well as cross browser compatibility and keyboard accessibility only, screen readers accessibility with proper HTML5 semantic markup. 
