import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import DesignAPI from '../../DesignAPI'
import Toast from '../../Toast'

class designersView {
  async init(){
    document.title = 'Designers'
    this.allusers = null  
    this.render()    
    Utils.pageIntroAnim()
    Utils.designProfilesAnim()
    await this.getAllUsers()
  }

  async getAllUsers(){
    try{
      this.allusers = await UserAPI.getAllUsers()
      console.log(this.allusers)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  

  


  

  render(){
    const template = html`
    <va-app-header title="Designers" user="${JSON.stringify(Auth.currentUser)}"></va-app-header> 
    <div class="page-content calign">      
      

          <main>
              <div class="design-artwork_wrapper">
              <img class="design_artwork" id="design_artwork" src="/images/designers_artwork.svg">
              </div>
          </main>

      <div class="designs-container">
      

          ${this.allusers == null ? html`
            <sl-spinner></sl-spinner>
          `: html`
          ${this.allusers.map(user => html`
            <va-profile class="design-card"
            user="${JSON.stringify(user)}"
            name="${user.firstName} ${user.lastName}" 
            image="${user.avatar}"
            
            
            >
            </va-profile>
            
              
              `)}
          `}
        </div>





    </div>      
  `
    render(template, App.rootEl)
  }
}





export default new designersView()