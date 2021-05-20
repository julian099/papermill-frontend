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
      ${Auth.currentUser && Auth.currentUser.avatar ? html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
      `:html`
      <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
      `}
      <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
      <p>${Auth.currentUser.email}</p>

      
      <div class="designs-container">
          ${this.allusers == null ? html`
            <sl-spinner></sl-spinner>
          `: html`
          ${this.allusers.map(user => html`
            <va-design class="design-card"
            user="${JSON.stringify(user)}"
            name="${user.firstName} ${user.lastName}" 
            image="${user.avatar}"
            
            
            >
            </va-design>
            
              
              `)}
          `}
        </div>


      ${Auth.currentUser.bio ? html`
      <h3>Bio</h3>
      <p>${Auth.currentUser.bio}</p>
      `: html`
      <p>No bio found.</p>
      `}


      <sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
    </div>      
  `
    render(template, App.rootEl)
  }
}





export default new designersView()