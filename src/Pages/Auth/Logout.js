import { LOGOUT} from "../../Api/Api"
import { Axios } from "../../Api/Axios"

function Logout() {


    async function handelLogOut(){
        try{
            let res=await Axios.get(`/${LOGOUT}`)
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <button onClick={handelLogOut}>Logout</button>
  )
}

export default Logout