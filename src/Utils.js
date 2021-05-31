import gsap from 'gsap'


class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }






  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})
  }

  favouriteArtworkAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo("#favourite_artwork", {opacity: 1, y: -600}, {opacity: 1, y: 0, ease: 'power4', duration: 1.4})
  }
  designContainerAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".design-card", {stagger:1, y: 600, stagger:0.3}, {opacity: 1, y: 0, stagger:0.3, ease: 'power4', duration: 0.8, delay: 1})
  }
  filterWrapperAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".filter-menu-wrapper",  {opacity: 1, x: -2000}, {opacity: 1, x: 0, ease: 'power4', duration: 2, delay: 0.2})
    gsap.fromTo(".search-bar-wrapper",  {opacity: 1, x: -2000}, {opacity: 1, x: 0, ease: 'power4', duration: 2, delay: 0})
  }
  designArtworkAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo("#design_artwork", {opacity: 0, y: 600}, {opacity: 1, y: 0, ease: 'power4', duration: 2, delay: 0.8})
  }
  newDesignArtworkAnim(){
    const pageContent = document.querySelector('.page-content-secondary')
  if(!pageContent) return
  gsap.fromTo(".newdesign-artwork", {opacity: 0, x: 600}, {opacity: 1, x: 0, ease: 'power4', duration: 1, delay: 1})  
  gsap.fromTo("article", {y: 1200}, {y: 0, ease: 'power4', duration: 1, delay: 0.5})  
  }
  designProfilesAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".designs-container", {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: 'power4', duration: 1, delay: 0.5})
    gsap.fromTo("#design_artwork", {opacity: 1, y: -600}, {opacity: 1, y: 0, ease: 'power4', duration: 1.4})
  }
  homeAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".home-item1", {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: 'power4', duration: 1})
    gsap.fromTo(".home-item2", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0.2})
    gsap.fromTo(".home-item3", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0.3})
    gsap.fromTo(".home-item4", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0.4})
    gsap.fromTo(".home-item5", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0.5})
    gsap.fromTo(".home-item6", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0.6})
  }
  guideAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".guide-text-1", {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: 'power4', duration: 1, delay: 0.1})
    gsap.fromTo(".guide-text-2", {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: 'power4', duration: 1, delay: 3})
    gsap.fromTo(".home-item1", {opacity: 0, scale: 0}, {opacity: 1, scale: 1, ease: 'power4', duration: 1, delay: 3.4})
    gsap.fromTo(".home-item2", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 1000})
    gsap.fromTo(".home-item3", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 1000})
    gsap.fromTo(".home-item4", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 1000})
    gsap.fromTo(".home-item5", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 1000})
    gsap.fromTo(".home-item6", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 1000})
  }
  guideAnimTwo(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".home-item1", {opacity: 0, scale: 0, visibility: "hidden", ease: 'power4', duration: 0.5, delay: 0})
    gsap.fromTo(".home-item2", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0})
  }
  guideAnimThree(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".home-item2", {opacity: 0, scale: 0, visibility: "hidden", ease: 'power4', duration: 0.5, delay: 0})
    gsap.fromTo(".home-item3", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0})
  }
  guideAnimFour(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".home-item3", {opacity: 0, scale: 0, visibility: "hidden", ease: 'power4', duration: 0.5, delay: 0})
    gsap.fromTo(".home-item4", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0})
  }
  guideAnimFive(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".home-item4", {opacity: 0, scale: 0, visibility: "hidden", ease: 'power4', duration: 0.5, delay: 0})
    gsap.fromTo(".home-item5", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0})
  }
  guideAnimSix(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".home-item5", {opacity: 0, scale: 0, visibility: "hidden", ease: 'power4', duration: 0.5, delay: 0})
    gsap.fromTo(".home-item6", {opacity: 0, scale: 0}, {opacity: 1, scale: 1,ease: 'power4', duration: 1, delay: 0})
  }
  guideAnimSeven(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".home-item6", {opacity: 0, scale: 0, ease: 'power4', duration: 0.5, delay: 0})
  }
  hidePromptAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.to(".guide-text-2", {opacity: 0, scale: 0, visibility: "hidden", ease: 'power4', duration: 0.5, delay: 0})
 
  }
  profileAnim(){
    const pageContent = document.querySelector('.page-content')
    gsap.fromTo(".profile-grid", {opacity: 0, y: -400}, {opacity: 1, y: 0, ease: 'power4', duration: 0.3})
 
  }
  

}








export default new Utils()