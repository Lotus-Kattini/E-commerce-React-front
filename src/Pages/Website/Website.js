import { Outlet } from "react-router-dom"
import Navbarhome from "./Navbarhome"

function Website() {
  return (
    <>
        <Navbarhome/>
        <Outlet/>
    </>
  )
}

export default Website