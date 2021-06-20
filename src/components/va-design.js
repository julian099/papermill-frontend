import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-design', class Design extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      gender: {
        type: String
      },
      length: {
        type: String
      }                        
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }





  moreInfoHandler(){  
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add className
    dialogEl.className = 'design-dialog'
    // sl-dialog content
    const dialogContent = html`
          <style>
        .wrap {
          display: flex;
        }
        .image {
          width: 50%;
        }
        .image img {
          width: 80%;
          box-shadow: 5px 5px 5px rgba(170, 170, 170, 0.2);
          border-radius: 25px;
        }
        .content {
          padding-left: 1em;
        }
        .gender span,
        .length span {
          text-transform: uppercase;
          font-weight: bold;
        }
        .price{
          font-size: 1.5em;
          color: var(--brand-color)
        }
      </style>
      <div class="wrap">
        <div class="image">
          <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
          
        </div>
        <div class="content">
          <h1>${this.name}</h1>
          <p>${this.description}</p>
          <p class="price">$${this.price}</p>


          <sl-button @click=${this.addFavHandler.bind(this)}>
            <sl-icon slot="prefix" name="heart-fill"></sl-icon>
            Add to Favourites
          </sl-button>
          <sl-button @click=${this.downloadHandler.bind(this)}>
            <sl-icon slot="prefix" name="save"></sl-icon>
            Download
            <a href="${App.apiBase}/images/${this.image}" download="${this.name}"></a>
          </sl-button>
          <sl-button @click=${() => gotoRoute(`/public?id=${this.user._id}`)}><sl-icon slot="prefix" name="person"></sl-icon>Visit author</sl-button>
        </div>
      </div>
    `
    render(dialogContent, dialogEl)
    // append to document.body
    document.body.append(dialogEl)
    // show sl-dialog
    dialogEl.show()
    // on hide delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
      dialogEl.remove()
    })
  }

  async addFavHandler(){    
    try {
      await UserAPI.addFavDesign(this.id)
      Toast.show('Design added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async downloadHandler(){    
    try {
      // await UserAPI.downloadDesign(this.id)
      Toast.show('Design downloaded*')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  
  render(){    
    return html`
    <style>
      .author {
        font-size: 0.9em;
        font-style: italic;
        opacity: 0.8;
        cursor: pointer;
      }
      .moreInfoText{
        position: absolute;
        top: 120px;
        left: 34%;
        display: flex;
        justify-items: center;
        user-select: none;
        cursor: pointer;
        opacity: 0;
        color: white;
        pointer-events: none;
      }


      .design-image{
        height: 300px;
        width: 300px;
        max-height: 100%;
        max-width: 100%;
        overflow: hidden;
        justify-items: center;
        display: grid;
        justify-content: center;
        
        
      }

      img.design-image{
      cursor: pointer;
      transform: scale(0.9);
      }
      img.design-image:hover {
      cursor: pointer;
      filter: blur(2px);
      filter: brightness(1.1);
      transform: scale(2);
      transition: transform 0.1s ease-in-out;
      }



   

      
      @media all and (max-width: 768px){ 
    .designs-container{

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 200px));
    grid-auto-rows: repeat(auto-fit, minmax(auto, auto));
    grid-gap: 1em;
    padding: 3em;
    justify-items: center;
    justify-content: center;
    }
    .design-image{
      height: 200px;
      width: 100%;
    }
    h2{
      font-size:1.1rem;
    }



    
  }

    </style>

    <sl-card>
 


      <img @click=${this.moreInfoHandler.bind(this)} class="design-image" slot="image" src="${App.apiBase}/images/${this.image}" alt="${this.name}" onerror="this.src='/images/default_avatar.png';"/>
      <div class="moreInfoText"><h3>More Info</h3></div>
      <h2>${this.name}</h2>
      <h3>$${this.price}</h3>
      <a @click=${() => gotoRoute(`/public?id=${this.user._id}`)}><p class="author">By ${this.user.firstName} ${this.user.lastName}</p></a>
      <sl-button @click=${this.moreInfoHandler.bind(this)}>More info</sl-button>
      <sl-icon-button name="heart-fill" label="Add to favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>
    `
  }
  
})


