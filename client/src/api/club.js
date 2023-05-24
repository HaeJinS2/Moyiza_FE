import axios from "axios"

const getClub = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/club`)
    return response
  } catch (error) {
    console.log(error)
  }
 
}


export {getClub}