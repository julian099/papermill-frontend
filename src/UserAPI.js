import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class UserAPI {
  
  async updateUser(userId, userData, dataType = 'form'){
    // validate
    if(!userId || !userData) return
    
    let responseHeader
    
    // form data
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
        body: userData
      }
      
    // json data
    }else if(dataType == 'json'){
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      }
    }
  
    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/user/${userId}`, responseHeader)
  
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getUser(userId){
    if(!userId) return
    
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      headers: {"Authorization": `Bearer ${localStorage.accessToken}`}
    })

    if(!response.ok){
      const err = await response.json()
      if(err) console.log(err)
      throw new Error('Problem getting user')
    }

    const data = await response.json()

    return data
  }


  async addFavDesign(designId){
    // validate
    if(!designId) return

    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/addFavDesign`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({designId: designId})
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem adding design to favourites')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data

  }


  async getAllUsers(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/allusers`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting all users')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}



export default new UserAPI()