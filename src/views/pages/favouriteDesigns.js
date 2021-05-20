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
    document.title = 'Template'
    this.favDesigns = null    
    this.render()
    Utils.favouriteArtworkAnim()    
    Utils.pageIntroAnim()
    await this.getFavDesigns()
    Utils.designContainerAnim()
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
      <svg xmlns="http://www.w3.org/2000/svg" class="footerWave" viewBox="0 0 1440 320">
  <path fill="#6fa5e2" fill-opacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg>
    </div>
      <div class="page-content"> 




      <div class="design-page-container">
          <main>
              <div class="design-artwork_wrapper">
              <img class="design_artwork" id="favourite_artwork" src="/images/favourites_artwork.svg">
              </div>
          </main>

          </div>

              
        <div class="designs-container">
        ${this.favDesigns == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favDesigns.map(design => html`
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


 
    `
    render(template, App.rootEl)
  }
}


export default new favouriteDesigns()