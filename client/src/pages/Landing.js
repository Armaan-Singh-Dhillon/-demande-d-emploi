
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/Testing"
import Logo from "../components/Logo"
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <>
            <Wrapper>
                <div className="main">


                    <div className="middle">
                        <div className="content">
                            <div>

                            <div>
                                <h1>JOB TRACKING APP</h1>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus explicabo ex aperiam officiis quis illum maiores eaque incidunt dolore facere.
                                    
                                        <Link to='/register'>
                                        <button className="btn">Login/Register</button>
                                        </Link>
                                    
                                </p>
                            </div>

                            </div>
                        </div>
                        <div>

                            <img src={main} alt="" />
                        </div>


                    </div>

                </div>
            </Wrapper>
        </>
    )
}


export default Landing