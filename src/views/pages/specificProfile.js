import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import moment from 'moment'
import UserAPI from '../../UserAPI'
import DesignAPI from '../../DesignAPI'
import Toast from '../../Toast'

class specificProfileView {
  async init(){
    console.log('ProfileView.init')
    document.title = 'Profile'       
    this.user = null
    this.userId = null
    await this.getUser()
    await this.filterDesigns('published', this.userId)
    this.render()    
    Utils.pageIntroAnim()

   

  }

  


  async getUser(){
    try {
        const urlParams = new URLSearchParams(window.location.search)
        var userId = urlParams.get('id')
        console.log(userId)
        this.userId = urlParams.get('id')
        this.user = await UserAPI.getPublicUser(userId)
        this.render()
    }catch(err){
        Toast.show(err)
    }
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






  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <div class="profile-centre">
      ${this.user == null ? html`
        <sl-spinner></sl-spinner>
      ` : html`

        ${this.user && this.user.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2>${this.user.firstName} ${this.user.lastName}</h2>
        <p>Contact me at ${this.user.email}</p>
        
        <p>Last update was ${moment(this.user.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

        ${this.user.bio ? html`
        <h3>Bio</h3>
        <p>${this.user.bio}</p>
        `: html`
        <p>No bio found.</p>
        `}
      
      `}  
      </div>
    
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
        
  
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new specificProfileView()