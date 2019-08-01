import React, {Component} from 'react';
import firebase from './firebase'
import './App.css';

class App extends Component {
  constructor (props) {
    super (props)
    this.ref = firebase.firestore().collection('test')
    this.unsubscribe = null
    this.state = {
      user: false,
      test: []
    }

  }

  onCollectionUpdate  = (querySnapshot) => {
    const testData = []
    querySnapshot.forEach((doc) =>{
      const {title} = doc.data()
      testData.push({
        key: doc.id,
        doc,
        title})
      })
      this.setState({...this.state, test: testData})
  }

  componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}


  signin = (event) => {
    event.preventDefault()
    console.log('click')
  }
  render() {
    const signedout = (
      <div className="signinform">
       <form className='auth-form' onSubmit={this.signin}>
          <h3>Sign In</h3>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
        <form className='auth-form' onSubmit={this.signup}>
           <h3>Sign Up</h3>
           <label htmlFor="email">Email</label>
           <input
             required
             type="email"
             name="email3"
             placeholder="Email"
             onChange={this.handleChange}
           />
           <label htmlFor="password">Password</label>
           <input
             required
             name="password"
             type="password"
             placeholder="Password"
             onChange={this.handleChange}
           />
           <button type="submit">Sign up</button>
         </form>
        </div> )

        const signedin = (      <div className="signedin">
                <form className="fBCreds" onSubmit={this.submitFireCredits}>
                <h3> Send Firebase Credits</h3>
                <p>Send to:<input
                  required
                  name="fbCredits"
                  label="email1"
                  type="email"
                  placeholder="email"
                  onChange={this.handleChange}
                /> Amount
                <input
                  required
                  name="firebaseCredits"
                  label="credits"
                  type="number"
                  placeholder="0.000"
                  onChange={this.handleChange}
                />
                <button type="submit"> Send Firebase Credits</button>
                </p>
                </form>
                <form className="dbCreds" onSubmit={this.submitDBCredits}>
                <h3> Send Firebase Credits</h3>
                <p>Send to:<input
                  required
                  name="dbCredits"
                  label="email2"
                  type="email"
                  placeholder="email"
                  onChange={this.handleChange}
                /> Amount
                <input
                  required
                  name="dbCredits"
                  label="credits"
                  type="number"
                  placeholder="0.000"
                  onChange={this.handleChange}
                />
                <button type="submit"> Send Firebase Credits</button>
                </p>
                </form>
                <button onClick={this.signout}>Sign Out </button>
              </div>)


   return(
      <div className="App">
      {!this.state.user ? signedout : signedin}
      {this.state.test.map(test => <p>{test.title}</p>)}

      </div>
  )
}
}

export default App;
