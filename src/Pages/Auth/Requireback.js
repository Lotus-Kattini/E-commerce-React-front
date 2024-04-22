import Cookie from 'cookie-universal'
import { Outlet } from 'react-router-dom';

function Requireback() {
    //token
    const cookie=Cookie();
    const token=cookie.get('e-commers')
  return (
    <>
        {token ? window.history.back() :<Outlet/>}
    </>
  )
}

export default Requireback