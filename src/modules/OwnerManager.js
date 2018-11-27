import APIManager from "./APIManager";
import AnimalManager from "./AnimalManager";
import AnimalOwnerManager from './AnimalOwnerManager'

class OwnerManager extends APIManager{
  getOwners(){
    return this.getAll()
  }

  deleteOwner(id){
    let animalsInfo = []
    const remoteURL = "http://localhost:5002"
    return fetch(`${remoteURL}/animalsOwners?ownerId=${id}`)
    .then(e => e.json())
    .then(animalOwners => animalsInfo.push(animalOwners))
    .then(()=> this.delete(id))
    .then(()=> AnimalOwnerManager.getAll()
    .then(animalsOwners => {
      if(animalsOwners.find(info => info.animalId === animalsInfo[0][0].animalId)){
        return
      } else{
        AnimalManager.delete(animalsInfo[0][0].animalId)
      }
    }))
    .then(()=> this.getAll())
  }

}

export default new OwnerManager("owners")