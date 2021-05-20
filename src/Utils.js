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
    gsap.fromTo("#favourite_artwork", {opacity: 1, y: -600}, {opacity: 1, y: 0, ease: 'bounce', duration: 1.4})
  }
  designContainerAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".design-card", {stagger:1, y: 600, stagger:0.3}, {opacity: 1, y: 0, stagger:0.3, ease: 'power4', duration: 1, delay: 1})
  }
  filterWrapperAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(".filter-menu-wrapper", {opacity: 1, x: -2000}, {opacity: 1, x: 0, ease: 'power4', duration: 2, delay: 0})
  }
  designArtworkAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo("#design_artwork", {opacity: 0, y: 600}, {opacity: 1, y: 0, ease: 'power4', duration: 2, delay: 0.5})
  }
  

}









export default new Utils()