import React from 'react'
import Signup from './components/Signup'
import Sender from './components/Sender';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Myprofile from './components/Myprofile';
import Sponser from './components/Sponser'
import Influencer from './components/Influencer'
import U123 from './components/U123'
import Inbox  from './components/Inbox'
function App() {
  return (
    <div>
       <Router>
    <Sender>
      <Routes>
  
        <Route exact path='/' element={<Signup/>}/>
        
        
        <Route exact path='/Sponser' element={<Sponser/>}/>
        
        <Route exact path='/Influencer' element={<Influencer/>}/>
        <Route exact path='/Myprofile' element={<Myprofile/>}/>
        <Route exact path='/inbox' element={<Inbox/>}/>
        <Route exact path='/profile/:name' element={<U123/>}/>
        <Route exact path='/inbox/:name' element={<Inbox/>}/>
      </Routes>
      </Sender>
      
    </Router>
    

    </div>
  )
}
export  default App;
