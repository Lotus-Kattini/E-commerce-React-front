import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Website/Homepage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';
import User from './Pages/Dashboard/User';
import Adduser from './Pages/Dashboard/Adduser';
import Writer from './Pages/Dashboard/Writer';
import Err404 from './Pages/Auth/Err404'
import Requireback from './Pages/Auth/Requireback';
import Categories from './Pages/Dashboard/Categories';
import Addcategory from './Pages/Dashboard/Addcategory';
import UpadateCat from './Pages/Dashboard/UpdateCat';
import Products from './Pages/Dashboard/Products';
import Addproduct from './Pages/Dashboard/Addproduct';
import Updateproduct from './Pages/Dashboard/Updateproduct';
import Hoooome from './Pages/Website/Hoooome';
import CategoriesHome from './Pages/Website/CategoriesHome';
import Website from './Pages/Website/Website';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Website/>}>
        {/* PUBLIC ROUTES */}
          <Route path='/' element={<Hoooome/>}/>
          <Route path='/categories' element={<CategoriesHome/>}/>
        </Route>
        <Route element={<Requireback/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack/>}/>
        <Route path='/*' element={<Err404/>}/>
        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuth allowedrole={['1995','1996','1999']}/>}>
        <Route path='/dashboard' element={<Dashboard/>} >
        <Route element={<RequireAuth allowedrole={['1995']}/>}>
            <Route path='users' element={<Users/>}/>
            <Route path='users/:id' element={<User />}/>
            <Route path='user/add' element={<Adduser />}/>
          </Route>
          <Route element={<RequireAuth allowedrole={['1999','1995']}/>}>
            {/*CATEGORIES*/}
            <Route path='categories' element={<Categories />}/>
            <Route path='categories/:id' element={<UpadateCat />}/>
            <Route path='category/add' element={<Addcategory />}/>

            {/* PRODUCTS */}
            <Route path='products' element={<Products />}/>
            <Route path='products/:id' element={<Updateproduct />}/>
            <Route path='product/add' element={<Addproduct />}/>
          </Route>
        <Route element={<RequireAuth allowedrole={['1996','1995']}/>}>
            <Route path='writer' element={<Writer />}/>
            </Route>
          </Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
