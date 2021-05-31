import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import DesignAPI from '../../DesignAPI'
import Toast from '../../Toast'

class designsView {
  async init(){
    document.title = 'Template'
    this.designs = null    
    this.render() 
    Utils.designArtworkAnim()
    Utils.filterWrapperAnim()
    await this.getDesigns()

    Utils.designContainerAnim()
  }

  

  async filterDesigns(field, match){
    // validate
    if(!field || !match) return


    // get fresh copy of designs
    this.designs = await DesignAPI.getDesigns()
    
    let filteredDesigns

    //gender
    if(field == 'gender'){
      filteredDesigns = this.designs.filter(design => design.gender == match)
    }

    //price
    if(field == 'price'){
      // get priceRangeStart
      const priceRangeStart = match.split('-')[0]
      const priceRangeEnd = match.split('-')[1]

      filteredDesigns = this.designs.filter(design => design.price >= priceRangeStart && design.price <= priceRangeEnd)
    }

    //length
    if(field == 'length'){
      filteredDesigns = this.designs.filter(design => design.length == match)
    }

    // name
    if(field == 'name'){
      // filter this.designs design.name contains a searchQuery
      filteredDesigns = this.designs.filter(design => design.name.toLowerCase().includes(match.toLowerCase())) 

      
    }

    
    //render
    this.designs = filteredDesigns
    this.render()

  }



  clearFilterBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.setAttribute('type', 'default'))
  }


  handleFilterBtn(e){
    // clear all filter buttons active (type = primary)
    this.clearFilterBtns()

    // set button active (type = primary)
    e.target.setAttribute("type", "primary")

    // extract the field and match from the button
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")

    //filter designs
    this.filterDesigns(field, match)


  }


  clearFilters(){
    this.getDesigns()
    this.clearFilterBtns()
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

  handleSearchKeyUp(e){
    // if search query is empty clear filters
    if(e.target.value == ''){
      this.getDesigns()
        }else{
          // filter designs based on name and search query
          this.filterDesigns('name', e.target.value)
        }
  }

  render(){
    const template = html`

      <style>
        .filter-menu {
          display: flex;
          align-items: center;
        }

        .filter-menu > div {
          margin-right: 1em;
        }
      </style>
      <va-app-header title="Designs" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      <div class="page-content">

        <div class="design-page-container">
          <main>
              <div class="design-artwork_wrapper">
              <img class="design_artwork" id="design_artwork" src="/images/discover_artwork.svg">
              </div>
          </main>

          </div>
          <div class="search-bar-wrapper">
        <sl-input  inputmode="search" size="large" clearable @keyup=${this.handleSearchKeyUp.bind(this)} placeholder="Search"><sl-icon name="search" slot="prefix"></sl-icon></sl-input> 
      </div>
        <div class="filter-menu-wrapper">
      <div class="filter-menu">
      <div>
      </div>
        <div class="btn-col1">
        <sl-button class="filter-btn" pill size="medium" data-field="gender" data-match="m" @click=${this.handleFilterBtn.bind(this)}>Textures</sl-button>
        <sl-button class="filter-btn" pill size="medium" data-field="gender" data-match="f" @click=${this.handleFilterBtn.bind(this)}>Patterns</sl-button>
        <sl-button class="filter-btn" pill size="medium" data-field="gender" data-match="u" @click=${this.handleFilterBtn.bind(this)}>Artwork</sl-button>
        </div>

        <div class="btn-col2">
        <sl-button class="filter-btn" pill size="medium" data-field="length" data-match="s" @click=${this.handleFilterBtn.bind(this)}>Flat</sl-button>
        <sl-button class="filter-btn" pill size="medium" data-field="length" data-match="m" @click=${this.handleFilterBtn.bind(this)}>3D</sl-button>
 

        </div>

        <div class="btn-col3">
        <sl-button class="filter-btn" pill size="medium" data-field="price" data-match="0-0" @click=${this.handleFilterBtn.bind(this)}>Free</sl-button>
        <sl-button class="filter-btn" pill size="medium" data-field="price" data-match="1-50000" @click=${this.handleFilterBtn.bind(this)}>Premium</sl-button>
        <sl-button class="filter-btn" pill size="medium" data-field="name" data-match="pack" @click=${this.handleFilterBtn.bind(this)}>Packs</sl-button>
        </div>

      <div class="btn-col4">
      <div> 
        <sl-button pill size="medium" @click=${this.clearFilters.bind(this)}>Clear filters</sl-button>
      </div>
      </div>
      </div>
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
    `
    render(template, App.rootEl)
  }
}


export default new designsView()