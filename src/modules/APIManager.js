
const remoteURL = "http://localhost:5002"

export default class APIManager{
  constructor(resource){
    this.resource = resource
  }
  get(id){
      return fetch(`${remoteURL}/${this.resource}/${id}`).then(e => e.json())
  }

  getAll(){
    return fetch(`${remoteURL}/${this.resource}`).then(e => e.json())
  }
  delete(id){
    return fetch(`${remoteURL}/${this.resource}/${id}`, {
      method: "DELETE"
    })
    .then(e => e.json())
    .then(()=> this.getAll())
  }
  post(newItem){
    return fetch(`${remoteURL}/${this.resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }).then(e => e.json())
  }
}