import { useEffect, useState } from "react"
import { USER, USERS } from "../../Api/Api"
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/TableShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";



function Users() {

  const [users,setusers]=useState([])
  const [runuseeffect,setrunuseeffect]=useState(0)
  const [currentuser,setcurrentuser]=useState('')

  const [page,setpage]=useState(1);
  const [limit,setlimit]=useState(3);
  const [loading,setloading]=useState(false);
  const[total,settotal]=useState(0)



  //Get Current User
  useEffect(()=>{
    Axios.get(`${USER}`).then((res)=>setcurrentuser(res.data))
  },[])

  //Get Users
    useEffect(()=>{
      setloading(true)
        let res=Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
        .then((data)=>{
          setusers(data.data.data)
          settotal(data.data.total)
        })
        .catch((err)=>console.log(err))
        .finally(()=>setloading(false))
    },[limit,page])


    //header of the table componants
    const header=[
      {
        key:'name',//the data of user from backend
        name:'UserName'
      },
      {
        key:'email',
        name:'Email'
      },
      {
        key:'role',
        name:'Role'
      },
      {
        key:'created_at',
        name:'Created'
      },
      {
        key:'updated_at',
        name:'Last login'
      },
    ]
    
    //Filter Current User
    // const userFilter=users.filter((user)=> user.id !==currentuser.id)
    

   //DELETE
   async function HandelDelete(id){
    try{
      const res=await Axios.delete(`${USER}/${id}`)
      setrunuseeffect((prev)=>prev+1)
    }
    catch(err){
      console.log(err)
    }
   }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page:</h1>
        <Link className="btn btn-primary" to='/dashboard/user/add'><FontAwesomeIcon icon={faUserPlus} />Add User</Link>
      </div>
    
    <TableShow
     header={header} 
     data={users} 
     deletee={HandelDelete} 
     currentuser={currentuser} 
     setrunuseeffect={setrunuseeffect}
     page={page}
     limit={limit}
     setlimit={setlimit}
     setpage={setpage}
     loading={loading}
     total={total}
     datalink={USER}
    />

    </div>
  )
}

export default Users