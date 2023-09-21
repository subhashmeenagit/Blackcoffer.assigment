import React, { useEffect, useState } from 'react'
import Loader from './Loader';


const Home = () => {

    const [loading, setloading] = useState(true)
    const [alldata, setalldata] = useState([]);
    useEffect(() => {
        const fun = async () => {
            try {
                await fetch("/getdata")
                    .then(res => res.json())
                    .then((data) => {

                        const newdata = Object.values(data)
                        const data1 = [{}]
                        newdata.map((e) => {

                            data1.push(...e);
                        })
                        setalldata(data1);
                        setloading(false)
                    })
            }
            catch {
                console.log("error")
            }
        }
        fun()

    }, [])

    return (

        <>

            {loading ? (<Loader />) :
                (

                    <div className='home' >


                        <div className="allcont">

                            {


                                alldata.map((e) => (
                                    <>
                                        {
                                            e.country ? (
                                                <div className="contcard">

                                                    <h1 style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, 0)" }}>{e.country}</h1>
                                                    <p style={{ position: "absolute", top: "2rem", left: "2rem" }}>region:{e.region}</p>
                                                    <p style={{ position: "absolute", top: "2rem", right: "2rem" }}>sector:{e.sector}</p>


                                                    <p style={{ position: "absolute", top: "2rem", left: "50%", transform: "translate(-50%, 0)" }}>Topic:{e.topic}</p>

                                                    <p style={{ position: "absolute", top: "4rem", left: "2rem" }}>start_year:{e.start_year}</p>                                               <p style={{ position: "absolute", top: "4rem", right: "2rem" }}>end_year:{e.end_year}</p>

                                                    <p style={{ position: "absolute", top: "4rem", left: "50%", transform: "translate(-50%, 0)" }}>pestle:{e.pestle}</p>

                                                    <p style={{ position: "absolute", top: "6rem", left: "2rem" }}>title:{e.title}</p>
                                                    <p style={{ position: "absolute", top: "8rem", left: "2rem" }}>impact:{e.impact}</p>


                                                    <p style={{ position: "absolute", top: "8rem", right: "2rem" }}> source:{e.source}</p>





                                                    <p className="url" style={{ position: "absolute", bottom: "50%", left: "50%", transform: "translate(-50%, 0)" }}>


                                                        <a href={e.url}> Know More </a>
                                                    </p>





                                                    <p style={{ position: "absolute", bottom: "6rem", right: "2rem" }} >intensity:{e.intensity}</p>


                                                    <p style={{ position: "absolute", bottom: "6rem", left: "2rem" }}>relevance:{e.relevance}</p>



                                                    <p style={{ position: "absolute", bottom: "4rem", right: "2rem" }}>insight:{e.insight}</p>

                                                    <p style={{ position: "absolute", bottom: "4rem", left: "2rem" }}>likelihood:{e.likelihood}</p>


                                                    <p style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>published:{e.published}</p>
                                                    <p style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>added:{e.added}</p>




                                                </div>) :
                                                (<></>)
                                        }
                                    </>
                                ))
                            }

                        </div>




                        <div className="basicinfo">
                            {


                                alldata.map((e) => (
                                    <>
                                        {
                                            e.country ? (<div className="card" >


                                                <p> </p>                                            <h1>{e.country}</h1>
                                                <p>{e.sector}</p>
                                                <p>{e.topic}</p>

                                            </div>) : (<></>)
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div >
                )
            }


        </>



    )
}

export default Home

