import styled from 'styled-components'
import Logo from "../assets/images/logo.svg"
const Navbar = () => {
  return (
    <>
        <Wrapper>
            <div className="main">

                <div className="header-image">
                    <img src={Logo} alt="" />
                </div>

           

            </div>
        </Wrapper>
        </>
  )
}
const Wrapper = styled.div`

.header-image{
    display:flex;
    height:4rem;
    max-width:100%;
    margin:1.2rem;

    
}

`
export default Navbar