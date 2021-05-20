import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Design from '../../DesignAPI'
import designAPI from '../../DesignAPI'
import Toast from '../../Toast'

class newDesignView {
  init(){
    document.title = 'Template'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newDesignSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    const formData = e.detail.formData

    try{
      await designAPI.newDesign(formData)
      Toast.show('Design added!')
      submitBtn.removeAttribute('loading')
      // reset form
      // reset & textarea fields
      const textInputs = document.querySelectorAll('sl-input', 'sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      // reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      // reset file input 
      const fileInput = document.querySelector('input[type=file')
      if(fileInput) fileInput.value = null


    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  
  }



  render(){
    const template = html`
      <va-app-header title="New Design" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <div class="vhCap">  
        <div class="grid">
        <article>
        <div class="signinup-box-2">
        <sl-form class="form-signup" @sl-submit=${this.newDesignSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Design Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" id="descriptionWindow" rows="3" placeholder="Description"></sl-textarea>
          </div>
          <div class="input-group" id="imageInput" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>What is it?</label><br>
            <sl-radio-group label="Select gender" no-fieldset>
              <sl-radio name="gender" value="m">A texture</sl-radio>
              <sl-radio name="gender" value="f">A pattern</sl-radio>
              <sl-radio name="gender" value="u">An artwork</sl-radio>
            </sl-radio-group>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>How would you describe the design?</label><br>
            <sl-radio-group label="Select length" no-fieldset>
              <sl-radio name="length" value="s">Fun</sl-radio>
              <sl-radio name="length" value="m">Classic</sl-radio>
              <sl-radio name="length" value="l">Minimal</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="primary" class="submit-btn" submit>Add Design</sl-button>
        </sl-form>  
        </div>
        
        </article>
        <div class="newdesign-artwork">
          <div class="artwork-newdesign">
              <img id="newdesign_artwork" src="/images/newdesign_artwork2.svg">
          </div> 
        </div>
        </div>


        </div>

      </div>   
      
      </div> 
             
    `
    render(template, App.rootEl)
  }
}


export default new newDesignView()