import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'
import DesignAPI from '../../DesignAPI'

class favouriteDesigns {
  async init(){
    document.title = 'Favourites'
    this.favDesigns = null    
    this.render()
    Utils.favouriteArtworkAnim()    
    Utils.pageIntroAnim()
    await this.getFavDesigns()
    Utils.designProfilesAnim()
  }


  

  async getFavDesigns(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favDesigns= currentUser.favouriteDesigns
      console.log(this.favDesigns)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }



  render(){
    const template = html`
      <va-app-header title="Favourite Designs" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div id="footer-container">

    </div>
      <div class="page-content"> 




      <div class="design-page-container">
          <main>
              <div class="design-artwork_wrapper">
              <img class="design_artwork" id="favourite_artwork" src="/images/favourites_artwork_final.svg">
              </div>
          </main>

          </div>

              
        <div class="designs-container">
        ${this.favDesigns == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favDesigns.map(design => html`
            <va-design-favourite class="design-card"
              id="${design._id}"
              name="${design.name}"
              description="${design.description}"
              price="${design.price}"
              user="${JSON.stringify(design.user)}"
              image="${design.image}"
              gender="${design.gender}"
              length="${design.length}"
            >        
            </va-design-favourite>
        
          `)}
        `}
        </div>

 
    `
    render(template, App.rootEl)
  }
}


export default new favouriteDesigns()