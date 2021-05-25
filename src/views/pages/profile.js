import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'
import DesignAPI from '../../DesignAPI'
import moment from 'moment'

class ProfileView {
  async init(){
    console.log('ProfileView.init')
    document.title = 'Profile'  
    this.designs = null    
    this.render()    
    Utils.pageIntroAnim()
    await this.getDesigns()

    Utils.designContainerAnim()
    await this.filterDesigns('published', '60a665e8f45c409a83f78d83')

    
  }


  


  async filterDesigns(field, match){
    // validate
    if(!field || !match) return

    // get fresh copy of designs
    this.designs = await DesignAPI.getDesigns()
    
    let filteredDesigns

    // filter designs published by user based on their ID
    if(field == 'published'){
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)

      filteredDesigns = this.designs.filter(design => design.user._id == match)
    }


    
    //render
    this.designs = filteredDesigns
    this.render()

  }




  async getDesigns(){
    try{
      this.designs = await DesignAPI.getDesigns()
      console.log(this.designs)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p>Contact me at ${Auth.currentUser.email}</p>
        
        <p>Last update was ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>



        ${Auth.currentUser.bio ? html`
        <h3>Bio</h3>
        <p>${Auth.currentUser.bio}</p>
        `: html`
        <p>No bio found.</p>
        `}
  

        <sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
        <div class="designs-container">
          ${this.designs == null ? html`
            <sl-spinner></sl-spinner>
          `: html`
          ${this.designs.map(design => html`
            <va-design class="design-card"
            id="${design._id}"
            name="${design.name}" 
            description="${design.description}"
            price="${design.price}"
            user="${JSON.stringify(design.user)}"
            image="${design.image}"
            gender="${design.gender}"
            length="${design.length}"
            >
            </va-design>

              
              `)}
          `}
        </div>
      </div>      
      </div>  
      
        
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()