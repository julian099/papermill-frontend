import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`
      <div class="grid">
      <article>
        <div class="signinup-box">
              <img class="signinup-logo" src="/images/logo.svg">
                <h1>Sign Up</h1>
                <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
                  <div class="input-group">
                    <sl-input name="firstName" type="text" placeholder="First Name" required><sl-icon name="person-fill" slot="prefix"></sl-icon></sl-input>
                  </div>
                  <div class="input-group">
                    <sl-input name="lastName" type="text" placeholder="Last Name" required><sl-icon name="person-fill" slot="prefix"></sl-icon></sl-input>
                  </div>
                  <div class="input-group">
                    <sl-input name="email" type="email" placeholder="Email" required><sl-icon name="envelope-fill" slot="prefix"></sl-icon></sl-input>
                  </div>
                  <div class="input-group">
                    <sl-input name="password" type="password" placeholder="Password" required toggle-password><sl-icon name="key-fill" slot="prefix"></sl-icon></sl-input>
                  </div>  
                  <div class="input-group"> 
                    <sl-select name="accessLevel" placeholder="I am a...">
                      <sl-menu-item value="1">Customer</sl-menu-item>
                      <sl-menu-item value="2">Designer</sl-menu-item>
                    </sl-select>
                  </div>  
                  <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
                </sl-form>
                <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
              </div>
              </article>
              <div class="signin-artwork">
          <div class="artwork-signin">
              <img class="signin_artwork" src="/images/signin_artwork.svg">
          </div> 
        </div>
            </div>

    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()