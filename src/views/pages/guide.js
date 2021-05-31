import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class TemplateView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()

    Utils.guideAnim()

    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
    <va-app-header title="Guide" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
    
    <div class="page-content calign">
    <div class="guide-text-1"><h3>Welcome, ${Auth.currentUser.firstName}! It looks like you're new, <br>so here's a quick guide to show you what Papermill is all about.</h3></div>
    <div class="guide-text-2"><h4>(Select the square to continue)</h4></div>



      <div class="home-container-guide calign">
    <div class="grid-container-home">
<div class="home-item1 calign" @click=${() => Utils.guideAnimTwo()}><sl-tooltip  trigger="click" open content="Browse an ever-expanding collection of design assets." placement="top-start">
<div class="home_image_wrapper" @click=${() => Utils.hidePromptAnim()}>
            <img class="home_artwork" src="/images/discover_artwork_home.svg" >
            </div>
            <h3 class="home_title">Find a design</h3>


      </div>
  <div class="home-item2 calign" @click=${() => Utils.guideAnimThree()} ><sl-tooltip trigger="click" open content="You can view other users' profiles and design works, too." placement="top-start">
  <div class="home_image_wrapper" >
            <img class="home_artwork" src="/images/designers_artwork_home.svg" >
            </div>
            <h3 class="home_title">Find a designer</h3>
  </div>
  <div class="home-item3 calign" @click=${() => Utils.guideAnimFour()}><sl-tooltip trigger="click" open content="You can submit your own artwork easily. We hope to see some from you!" placement="top-start">
  <div class="home_image_wrapper">
            <img class="home_artwork" src="/images/add_design_home.svg">
            </div>
            <h3 class="home_title">Add your own design</h3>
  </div>
  <div class="home-item4 calign" @click=${() => Utils.guideAnimFive()}><sl-tooltip  trigger="click" open content="Save designs by selecting the heart icon to save them for later viewing." placement="top-start">
  <div class="home_image_wrapper">
            <img class="home_artwork" src="/images/favourites_artwork_final_home.svg" >
            </div>
            <h3 class="home_title">Your favourite designs</h3>
  </div>
  <div class="home-item5 calign" @click=${() => Utils.guideAnimSix()}><sl-tooltip trigger="click" open content="Your profile displays all your submitted works as well as contact details." placement="top-start">
  <div class="home_image_wrapper">
  <img class="home_artwork" src="/images/profile_artwork_home.svg" >
            </div>
            <h3 class="home_title">Your profile</h3>
  </div>
  <div class="home-item6 calign" @click=${() => Utils.guideAnimSeven()}  ><sl-tooltip  trigger="click" open content="One designer is picked to be featured per week, so make sure to get involved!" placement="top-start">
  <div class="home_image_wrapper" @click=${() => gotoRoute('/')}>
            <img class="home_artwork" src="/images/user_spotlight_home.svg" @click=${() => Toast.show("You're all set! Enjoy.")}>
            </div>
            <h3 class="home_title">Weekly user spotlight</h3>
  </div>



    </div>
    </div> 
    </div> 
    
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()