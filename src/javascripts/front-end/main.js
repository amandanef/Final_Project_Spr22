// Required by Webpack - do not touch
require.context('../../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../../stylesheets/', true, /\.(css|scss)$/i)
require.context('../../', true, /\.(json|txt|dat)$/i)

// TODO
import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'

import {Title} from './components/Title'
import {MealList} from './components/MealList'
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
function App(props){
  return (
    <React.StrictMode>
        <Navbar/>
        <Title/>
        <MealList/>
        <Footer/>
    </React.StrictMode>
  )
}
if(document.getElementById('main')){
    ReactDOM.render(<App/>, document.getElementById('main'))
} else if(document.getElementById('#title')) {
    ReactDOM.render(<Title/>, document.querySelector('#title'))
  }
  else if(document.getElementById('#navbar')) {
    ReactDOM.render(<Navbar/>, document.querySelector('#navbar'))
  } 
  else if(document.getElementById('#footer')) {
    ReactDOM.render(<Footer/>, document.querySelector('#footer'))
  }

