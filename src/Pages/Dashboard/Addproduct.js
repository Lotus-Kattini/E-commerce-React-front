import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../Api/Axios';
import {CAT, Pro} from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';
import './dashboard.css'
import { Button } from 'react-bootstrap';

function Addproduct() {
    const [form,setform]=useState({
        category:'',
        title:'',
        description:'',
        price:'',
        discount:'',
        About:'',
    })
    //dummt data form for sending the form when the category is selected
    const dummyForm={
      category:null,
        title:'dummy',
        description:'dummy',
        price:0,
        discount:0,
        About:'dummy',
    }
    const [loading,setloading]=useState(false)
    const [err,seterr]=useState('')
    const [images,setimages]=useState([])
    const [disable,setdisable]=useState(true)
    const [id,setid]=useState()
    const [uploading,setuloading]=useState(0)


    const [category,setcategory]=useState([])
  const [runuseeffect,setrunuseeffect]=useState(0)

  //Get CATEGORIES
  useEffect(()=>{
    let res=Axios.get(`/${CAT}`)
    .then((data)=>setcategory(data.data))
    .catch((err)=>console.log(err))
    // console.log(res)
        if(res.status===200){
        setrunuseeffect((prev)=> prev + 1)
        }
    },[runuseeffect])




    const nav=useNavigate()

    

    //useRef (for focus on the input when the page loads)
    const focus=useRef(null);
    //عملناها مشان لما نضغط على صورة التحميل يفتح الانبت تبع الفايلاا
    const openImage=useRef(null);

    //useRef for uploading img without too many request
    const progress=useRef([]);
    //لما نرفع اول مرة صرتين و بعدين شو ما كان ما عم يرجع يحملن ليش لان الفور بدا ترجع تعيد من الصفر مش رح تكمل 
    //ف منعرف متغير جديد بحيث يعد مع الفور و بيضل فيه اخر قيمة وصل عندا مشان نكمل من عندا التحميل
    // let j=-1;
    const j=useRef(-1);

    //to get the id of all images that uploded
    const ids=useRef([]);


    useEffect(()=>{
        focus.current.focus();
    },[])

    //to open the input files when we click on the upload img
    function HandelopenImage(){
      openImage.current.click();
    }


    //Handel Edit
    async function HandelEdit(e){
        e.preventDefault();
        try{
            setloading(true)
            const res=await Axios.post(`${Pro}/edit/${id}`,form)
            nav('/dashboard/products')
        }
        catch(err){
            console.log(err)
            setloading(false)
        }
    }

    //Handel delete image
    async function HandeldeleteImage(id,image){
      const findId=ids.current[id];
      try{
        const res= await Axios.delete(`product-img/${findId}`)
        console.log(res)
        //رجع كلشي صور لا تساوي الصورة يلي بعتا بالبراميتر
        setimages((prev)=>prev.filter((img)=> img !== image))
        ids.current = ids.current.filter((id)=>id !== findId)
        j.current--;
      }catch(err){
        console.log(err)
      }
      console.log(ids.current)
    }

    //handel form sent
    async function handelSubmitForm(){
      try{
        const res=await Axios.post(`${Pro}/add`,dummyForm);
        console.log(res)
        setid(res.data.id);
      }
      catch(err)
      {
        console.log(err)
      }
    }


    const categoriesShow=category.map((item,key)=> <option key={key} value={item.id} >{item.title}</option>)

    //maping for images
    const imgShow=images.map((img,key)=> 
    <div className='border w-100 p-2'>
      <div className='d-flex align-items-center justify-content-between'> 
      <div key={key} className='d-flex align-items-center justify-content-start gap-2 '>
        <img src={URL.createObjectURL(img)} width='100px'/>
        <div >
          <p className='mb-0'>{img.name}</p>
          <p>{img.size/1024 < 1000 ? (img.size/1024).toFixed(2) + 'KB' : (img.size/(1024*1024)).toFixed(2) + 'MB'}</p>
        </div>
      </div>
      <Button className='mb-4' variant='danger' onClick={()=>HandeldeleteImage(key,img)}>Delete</Button>
      </div>
      <div className='custom-progress mt-2'>
        <span ref={(e)=>progress.current[key] = e}
           className='inner-progress'></span>
      </div>
    </div>)


    //Handel form changes
    function Handelform(e){
        setform({...form,[e.target.name]:e.target.value})
        setdisable(false)
        //this if for not sending a form when we change the CAT but for sent the form once only
        if(disable){
          handelSubmitForm()
        }
    }
    //Handel upload images
    async function HandelUploadImages(e){
      setimages((prev)=>[...prev,...e.target.files]);
      const imagesAsFile=e.target.files;
      const imageForm=new FormData();
      for(let i=0;i<imagesAsFile.length;i++){
        j.current++;
        imageForm.append('image',imagesAsFile[i]);
        imageForm.append('product_id',id);
        try{
          const res=await Axios.post(`/product-img/add`,imageForm,{
            onUploadProgress : (ProgressEvent)=>{
              const loaded=ProgressEvent.loaded;
              const total=ProgressEvent.total;
              //لما نستعمل الستيت عم يصير مليون ري ريندر و كتير عم يتم استهلاك المعالج ف رح نستخدم اليوز ريف مشان ما عاد يصير ريرندر كتير و يزيدو الريكويستات
              // setuloading(Math.floor((loaded * 100)/total));
              const percent=Math.floor((loaded * 100)/total);
              progress.current[j.current].style.width=`${percent}%`;
              progress.current[j.current].setAttribute('percent',`${percent}%`);
            }
          });
          console.log(res) 
          ids.current[j.current]=res.data.id;
        }
        catch(err){
          console.log(err)
        }
      }
    }

  return (
    <>
    {loading && <Loading/>}
    <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandelEdit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Category:</Form.Label>
        <Form.Select  value={form.category} name='category' onChange={Handelform} ref={focus}>
          <option disabled value=''>Select Category</option>
          {categoriesShow}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title:</Form.Label>
        <Form.Control disabled={disable} type="text" name='title' value={form.title} onChange={Handelform} placeholder="title.." />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Description:</Form.Label>
        <Form.Control disabled={disable} type="text" name='description' value={form.description} onChange={Handelform} placeholder="description.." />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Price:</Form.Label>
        <Form.Control disabled={disable} type="number" name='price' value={form.price} onChange={Handelform} placeholder="price.." />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label>Discount:</Form.Label>
        <Form.Control disabled={disable} type="number" name='discount' value={form.discount} onChange={Handelform} placeholder="discount.." />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="exampleForm.ControlInput6">
        <Form.Label>About:</Form.Label>
        <Form.Control disabled={disable} type="text" name='About' value={form.About} onChange={Handelform} placeholder="about.." />
      </Form.Group>
      <Form.Group  className="mb-3" controlId="exampleForm.ControlInput8">
        <Form.Label>Images:</Form.Label>
        <Form.Control disabled={disable} ref={openImage} hidden type="file" multiple  onChange={HandelUploadImages} />
        <div className='d-flex align-items-center justify-content-center gap-2 flex-column py-3 rounded mb-2 w-100' 
          style={{border:disable ?'2px dashed gray' : '2px dashed #0086fe',cursor: !disable && 'pointer'}}
          onClick={HandelopenImage}  >
          <img src={require('../../Assets/upload.png')} width='150px' style={{filter: disable && 'grayscale(1)'}}/>
          <p className='fw-bold' style={{color: disable ? 'gray' : '#0086fe'}}>Upload Here</p>
        </div>
      </Form.Group>
      <div className='d-flex align-items-start gap-2 flex-column '>
        {imgShow}
      </div>

      
      {err !== '' && <span className="error">{err}</span>}
      <button style={{marginTop:'0.5rem'}}
        className='btn btn-primary'
        disabled={form.category ==='' ? true: false}
        >Add</button>
    </Form>
    </>
  )
}

export default Addproduct