import { useEffect, useState } from "react"
import { PRO, Pro } from "../../Api/Api"
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../Components/Dashboard/TableShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";


function Products() {
  const [products,setproducts]=useState([])
  const [runuseeffect,setrunuseeffect]=useState(0)

  const [page,setpage]=useState(1);
  const [limit,setlimit]=useState(3);
  const [loading,setloading]=useState(false);
  const[total,settotal]=useState(0)
  


  //Get PRODUCTS    
    useEffect(()=>{
      setloading(true)
        let res=Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
        .then((data)=>{
          setproducts(data.data.data)
          settotal(data.data.total)
        })
        .catch((err)=>console.log(err))
        .finally(()=>setloading(false))
    },[limit,page])

    //header of the table componants
    const header=[
      {
        key:'title',//the data of products from backend
        name:'Title'
      },
      {
        key:'images',
        name:'images'
      },
      {
        key:'description',
        name:'Description'
      },
      {
        key:'price',
        name:'Price'
      },
      {
        key:'rating',
        name:'Rating'
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


   //DELETE
   async function HandelDelete(id){
    try{
      const res=await Axios.delete(`${Pro}/${id}`);
      if(res.status===200){
          setrunuseeffect((prev)=> prev + 1)
        }
    }
    catch(err){
      console.log(err)
    }
   }
   console.log(products)

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page:</h1>
        <Link className="btn btn-primary" to='/dashboard/product/add'><FontAwesomeIcon icon={faUserPlus} /> Add Product</Link>
      </div>
      <TableShow
       header={header} 
       data={products} 
       deletee={HandelDelete}
       limit={limit}
       setlimit={setlimit}
       page={page}
       setpage={setpage}
       loading={loading}
       total={total}
       datalink={Pro}
      />

    </div>
  )
}

export default Products