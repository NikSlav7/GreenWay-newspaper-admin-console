import '../css/navbar.css'
function NavBar(){
    return (
        <div className="navbar-container">
            <div className='navbar-links'>
                <a href='/home'>Home</a>
                <a href='/post'>Send new email</a>
                <a href='/emails'>All emails</a>
            </div>
        </div>
    )
}
export default NavBar;
