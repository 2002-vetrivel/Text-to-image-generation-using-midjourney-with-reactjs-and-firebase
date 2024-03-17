import React from 'react'
import { Link } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth';
import {Auth} from "../firebase-config"
import { signOut } from 'firebase/auth';
import logout from "../logout.png";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user] = useAuthState(Auth)
  const navigator = useNavigate()
  const logOut = async () => {
    await signOut(Auth)
    navigator("/")
  }
  return (
    <header className="Navbar">
        <h3 className="h11">V I S I O N - <span className="span1">AI</span></h3>
        <div className="menu">
            <Link className='link' to={"/"}>Showcase</Link>
            {user && <Link className='link' to={"/generate"}>Generate</Link>}
            {user? <div className='link'><div className='d-flex'><img className='logo' src={user.photoURL} alt="" />  <button onClick={logOut}>Logout</button></div></div>
            : <Link className='link' to={"/login"}>Login</Link>
            }
        </div>
    </header>
  )
}

export default Navbar
