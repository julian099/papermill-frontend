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
    this.user = null
    this.userId = null
    await this.getUser()
    this.render()    
    await this.filterDesigns('published', Auth.currentUser._id)
    
    Utils.designContainerAnim()
    
  }

  async getUser(){
    try {
        var userId = UserAPI.getUser(Auth.currentUser._id)

        console.log(userId)

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
      <div class="page-content">
        <div class="profile-centre">
          <div class="profile-grid">
      ${Auth.currentUser == null ? html`
        <sl-spinner></sl-spinner>
      ` : html`
      <div class="profile-item1">
        
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar shape="rounded" style="--size: 250px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 150px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
                <p> ✉ ${Auth.currentUser.email}</p>
        </div>
        <div class="profile-item2">
      
        </div>
        <div class="profile-item3">
      
        </div>
        <div class="edit-btn">
        <sl-button style @click=${()=> gotoRoute('/editProfile')}></p><sl-icon style="font-size: 32px;" name="pencil-fill"></sl-icon></sl-button>
        </div>
        <div class="profile-item4">
        ${Auth.currentUser.bio ? html`
   
        <p>${Auth.currentUser.bio}
        `: html`
        <p>No bio found.</p>
        `}
        </div>
      `}  
      </div>
      
      </div>
      <div class="profile-title calign"><h2>Your shared designs</h2><sl-icon name="arrow-down-square" style="font-size: 32px;"></sl-icon></div>
    
      <div class="designs-container-profile">
        
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
      <div class="wrap">

      <svg class="svg3" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15%" id="blobSvg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop>
      <stop offset="100%" style="stop-color: #d6af87;"></stop>
    </linearGradient>
  </defs>
  <path id="blob" d="M317.5,337Q150,424,171,286.5Q192,149,338.5,199.5Q485,250,317.5,337Z" fill="url(#gradient)"></path>
</svg>

<svg class="svg3" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15%" id="blobSvg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop>
      <stop offset="100%" style="stop-color: rgb(239, 98, 159);"></stop>
    </linearGradient>
  </defs>
  <path id="blob" d="M409.5,310.5Q439,371,372.5,372Q306,373,263.5,412Q221,451,171.5,424.5Q122,398,121,343Q120,288,106,246Q92,204,94,138Q96,72,163,91Q230,110,273,108Q316,106,359.5,129Q403,152,391.5,201Q380,250,409.5,310.5Z" fill="url(#gradient)"></path>
</svg>

<svg class="svg3" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15%" id="blobSvg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop>
      <stop offset="100%" style="stop-color: rgb(239, 98, 159);"></stop>
    </linearGradient>
  </defs>
  <path id="blob" d="M355.5,345.5Q312,441,192,410Q72,379,68.5,247Q65,115,179.5,114Q294,113,346.5,181.5Q399,250,355.5,345.5Z" fill="url(#gradient)"></path>
</svg>


<svg class="svg3" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20%" id="blobSvg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop>
      <stop offset="100%" style="stop-color: rgb(239, 98, 159);"></stop>
    </linearGradient>
  </defs>
  <path id="blob" d="M355.5,345.5Q312,441,192,410Q72,379,68.5,247Q65,115,179.5,114Q294,113,346.5,181.5Q399,250,355.5,345.5Z" fill="url(#gradient)"></path>
</svg>





<svg class="svg3" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20%" id="blobSvg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: rgb(238, 205, 163);"></stop>
      <stop offset="100%" style="stop-color: rgb(239, 98, 159);"></stop>
    </linearGradient>
  </defs>
  <path id="blob" d="M424.5,338.5Q352,427,254.5,418.5Q157,410,94.5,330Q32,250,95,170.5Q158,91,257.5,78Q357,65,427,157.5Q497,250,424.5,338.5Z" fill="url(#gradient)"></path>
</svg>




</div>  
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()