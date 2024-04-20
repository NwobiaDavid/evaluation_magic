import React, { useState } from 'react';
import axios from 'axios';
import { Boxes } from '../components/ui/background-boxes';
import { IoSparklesSharp } from "react-icons/io5";
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation'

function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/evaluate', { username, password });
            setCourses(response.data.courses);
            console.log("res=> " + JSON.stringify(response.data.courses));
        } catch (error) {
            setError('Error: Incorrect Username or Password');
            console.error('Error:', error);
        }

        setLoading(false);
    };

    return (
        <BackgroundGradientAnimation>
            <div className="w-full font absolute flex-col h-full flex justify-center items-center overflow-hidden " >
                {/* <Boxes /> */}



                <div className="h-[20%] flex z-20 justify-center items-center ">
                    <h2 className=' text-5xl text-center lg:text-7xl font-bold text-white ' >Evaluation Magic ✨ </h2>
                </div>
                <form className='flex flex-col h-[50%] justify-center w-[90%] md:w-[50%] lg:w-[25%] z-20 ' onSubmit={handleSubmit} >
                    {/* <div className="h-[70%] flex flex-col "> */}
                        <input
                            type="text"
                            placeholder="Moodle Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='py-3 px-4 rounded-full duration-200 outline-none '
                        />
                        <input
                            type="password"
                            placeholder="Moodle Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='py-3 px-4 mt-7 mb-14 rounded-full duration-200 outline-none '
                        />
                    {/* </div> */}
                    {/* <button className={` duration-300 flex items-center justify-center ${loading ? " " : " hover:bg-yellow-400 font-semibold duration-200 hover:rounded-full  "} px-4 py-4  bg-white `} type="submit" disabled={loading}>
                        {loading ? 'Doing my Magic...' : 'Submit'}
                        {loading && (<div className='ml-2 text-xl' > <IoSparklesSharp /> </div>)}
                    </button> */}

                    <button className={`blob-btn duration-300 flex items-center justify-center ${loading ? " text-white " : "  duration-200 hover:rounded-full  "} px-4 py-4 overflow-hidden bg-white `} type="submit" disabled={loading} >
                        {loading ? ( <div className="flex flex-col items-center">
                            <div className=' text-lg flex items-center capitalize font-light ' > Doing my Magic... <IoSparklesSharp className='ml-2 ' />  </div>
                            <img className=' h-16 ' src="/Spinner.svg" alt="" />
                        </div>) : 'Submit'}

                        <span className={` ${loading && 'hidden'} blob-btn__inner`}>
                            <span className="blob-btn__blobs ">
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                                <span className="blob-btn__blob  bg-yellow-300 "></span>
                            </span>
                        </span>
                    </button>


                </form>
                {error && <span className='text-center' >
                    <p>{error}</p>
                    <p>
                        make sure you have good internet connection
                    </p>
                </span>}
                <div className=' text-white mt-10 ' >
                    {courses.map((course, index) => (
                        <div key={index}> Finished <span className="font-semibold ">{course.name}</span> course evaluation <IoSparklesSharp/> </div>
                    ))}
                </div>

            </div>
        </BackgroundGradientAnimation>
    )
}

export default Home