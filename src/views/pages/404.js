import App from './../../App'
import {html, render } from 'lit-html'

class FourOFourView{
  init(){
    console.log('FourOFourView.init')    
    document.title = '404 File not found'    
    this.render()
  }

  render(){
    const template = html`    
      <div class="calign">
        <h1 class="fourOhFour">404!</h1>
        <h1>Sorry about that.</h1>

      </div>
    `
    render(template, App.rootEl)
  }
}

export default new FourOFourView()