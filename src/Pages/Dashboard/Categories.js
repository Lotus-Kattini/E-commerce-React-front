import { useEffect, useState } from "react"
import { CAT, Cat } from "../../Api/Api"
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/TableShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";


function Categories() {
  const [category,setcategory]=useState([])

  const [limit,setlimit]=useState(3);
  const [page,setpage]=useState(1);
  const [loading,setloading]=useState(false)
  const[total,settotal]=useState(0)

  //Get CATEGORIES
    useEffect(()=>{
      setloading(true)
        Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
        .then((data)=>{
          setcategory(data.data.data)
          settotal(data.data.total)
        })
        .catch((err)=>console.log(err))
        .finally(()=>setloading(false))
        
    },[limit,page])

    //header of the table componants
    const header=[
      {
        key:'title',//the data of category from backend
        name:'title'
      },
      {
        key:'image',
        name:'image'
      },
      {
        key:'created_at',
        name:'Created'
      },
      {
        key:'updated_at',
        name:'Updated'
      },
    ]


    //Mapping
  //   const usersshow=users.map((user,index)=>
  //     <tr key={index}>
  //       <td className="text-center">{index+1}</td>
  //       <td className="text-center">{user.name}</td>
  //       <td className="text-center">{user.email}</td>
  //       <td className="text-center">{user.role ==="1995" ? "admin" : user.role ==='2001' ? 'User' : "Writer"}</td>
  //       <td >
  //         <div className="d-flex align-items-center gap-3 ml-2">
  //         {<Link to={`${user.id}`} > <FontAwesomeIcon fontSize={'18px'}  icon={faPenToSquare} /></Link>}
  //         </div>
  //       </td>
  //     </tr>
  //  )

   //DELETE
   async function HandelDelete(id){
    try{
      await Axios.delete(`${Cat}/${id}`);
    }
    catch(err){
      console.log(err)
    }
   }


  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page:</h1>
        <Link className="btn btn-primary" to='/dashboard/category/add'><FontAwesomeIcon icon={faUserPlus} />Add category</Link>
      </div>
      
      <TableShow 
        limit={limit}
        setlimit={setlimit}
        page={page}
        setpage={setpage}
        header={header}
        data={category}
        deletee={HandelDelete}
        loading={loading}
        total={total}
        datalink={Cat}
      />
      
    </div>
  )
}

export default Categories