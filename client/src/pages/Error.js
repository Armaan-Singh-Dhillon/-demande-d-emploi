import styled from'styled-components'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <>
    <Wrapper>

    <div className='main'>
      <div className='inner'>
        <h1>Error 404</h1>
        <h4>Try Checking Your url !</h4>
        <div className='btn-container'>
           <Link to='/'>
           
        <button className='btn'>Back To Home</button>
           </Link>
        </div>
      </div>
    </div>

    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
.btn-container{
   display:flex;
  justify-content:space-evenly;
  width:100%;
  align-items:center;
}
.main{
  display:flex;
  justify-content:space-evenly;
  width:100%;
  height:70vh;
  align-items:center;
  
}
.inner{
 
  height:50%;
}
.inner h1{
 font-size:5rem;
  height:50%;
  color:#20b5d6;
}
`

export default Error