import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../Pages/Dashboard/dashboard.css";
import PaginatedItems from "./pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import Transformdate from "../../helpers/Transformdate";


function TableShow({
  header,
  data,
  deletee,
  currentuser,
  limit,
  loading,
  setpage,
  setlimit,
  total,
  page,
  datalink
}) {
  //default value for current user so if doesnt intered there will be no error
  const Currentuser = currentuser || false;

  //to make the pagination from front end only
  // ================
  // const start=(page*limit)-5; this is true toooooo
  // const start = (page - 1) * limit;
  // const end =start +limit;
  
  // const final = data.slice(start,end);
  // ===================

  //32-40 for the search fro front
  // ===========================
          // const [search,setsearch]=useState('')
          // const key=header[0].key;
          // const filterdData=data.filter((item)=>item[key].toLowerCase().includes(search.toLowerCase()))

          // function handelsearch(e){
          //   setsearch(e.target.value);
          //   console.log(e.target.value)
          // }
  // =================

  

  
  const [searchh,setseacrh]=useState('')
  const [date,setdate]=useState('')
  const [filteredData,setfilteredData]=useState([])

  const [searchloading,setsearchloading]=useState(false);


  const fileredDatedata=data.filter((item)=>Transformdate(item.created_at)===date);

  const dateSearchData=filteredData.filter((item)=>Transformdate(item.created_at)===date);


  const showWhichData=(searchh.length>0 &&date!=='') ? dateSearchData :  searchh.length>0 ? filteredData : date !==''? fileredDatedata : data; 

  

  async function handelsearchedData(){
    try{
      const res=await Axios.post(`${datalink}/search?title=${searchh}`);
      console.log(res)
      setfilteredData(res.data)
      
    }
    catch(err){
      console.log(err)
    }
    finally{
      setsearchloading(false)
    }
   }

   useEffect(()=>{
    const debounce=setTimeout(()=>{
      searchh.length > 0 ? handelsearchedData(searchh) : setsearchloading(false);
    },800)

    return ()=> clearTimeout(debounce)
   },[searchh])


  const headershow = header.map((item, key) => <th key={key}>{item.name}</th>);
  const datashow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img style={{ width: "3rem" }} alt="" src={item[item2.key]} />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.key].map((img) => (
              <img
                style={{ width: "3rem", paddingLeft: "0.2rem" }}
                alt=""
                src={img.image}
              />
            ))}
            </div>
          ) : 
          item2.key==='created_at' || item2.key==='updated_at' ?
            Transformdate(item[item2.key]) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manegar"
          )
            :(
              item[item2.key]
              )}
          {Currentuser && item[item2.key] === Currentuser.name && "    (YOU)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-3 ml-2">
          {
            <Link to={`${item.id}`}>
              {" "}
              <FontAwesomeIcon fontSize={"18px"} icon={faPenToSquare} />
            </Link>
          }
          {item.id !== Currentuser.id ? (
            <FontAwesomeIcon
              onClick={() => deletee(item.id)}
              fontSize={"18px"}
              icon={faTrash}
              style={{ color: "red", cursor: "pointer" }}
            />
          ) : (
            "Admin Cant be Deleted"
          )}
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="col-3">
      <Form.Control
        type="search"
        placeholder="Search"
        className="my-2"
        value={searchh}
        onChange={(e)=>{
          setseacrh(e.target.value)
          setsearchloading(true)
        }}
      />
      </div>
      <div className="col-5">
      <Form.Control
        type="date"
        placeholder="Search"
        className="my-2"
        value={date}
        onChange={(e)=>{
          setdate(e.target.value)
        }}
      />
      </div>
      <Table striped bordered hover responsive className="table-shadow rounded overflow-hidden text-white">
        <thead className="bg-danger">
          <tr className="test">
            <th>id</th>
            {headershow}
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ?
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Loading......</td>
            </tr> : searchloading?
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Searching......</td>
            </tr>
          :datashow.length ===0 ?<tr style={{ textAlign: "center" }}>
          <td colSpan={12} className="text-danger">No Results Found..</td>
          </tr>
        :datashow}
        </tbody>
      </Table>
      <div className="d-flex algin-items-center justify-content-end">
      {searchh.length === 0 &&<div className="col-1">
      <Form.Select onChange={(e)=>setlimit(e.target.value)} className="form-select" aria-label="Default select example">
        <option value='3' >3</option>
        <option value='5' >5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
      </Form.Select>
      </div>}
      {searchh.length === 0 &&<PaginatedItems itemsPerPage={limit} data={data} setpage={setpage} total={total} />}
      </div>
    </>
  );
}

export default TableShow;
