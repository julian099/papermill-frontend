import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-design'
import './components/va-design-small'
import './components/va-profile'
import './components/va-design-favourite'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})