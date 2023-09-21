import React, { useState, useEffect } from 'react'
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Loader from './Loader';

const Chaart = () => {
    const [Loading, setLoading] = useState(true);
    const [alldata, setalldata] = useState([]);
    const [country, setcountry] = useState([])
    const [relevance, setrelevance] = useState([])
    const [likelihood, setlikelihood] = useState([])
    const [intensity, setintensity] = useState([])
    const [lablez, setlablez] = useState(relevance)
    const [vs, setvs] = useState('relevance')

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
                        const country1 = []
                        const relevance1 = []
                        const likelihood1 = []
                        const intensity1 = []
                        data1.map((e) => {
                            if (e.country) {
                                country1.push(e.country)
                                if (e.relevance) relevance1.push(e.relevance)
                                else relevance1.push("0")
                                if (e.intensity) intensity1.push(e.intensity)
                                else relevance1.push("0")
                                if (e.likelihood) likelihood1.push(e.likelihood)
                                else relevance1.push("0")
                            }
                        })
                        setcountry(country1)
                        setrelevance(relevance1)
                        setlikelihood(likelihood1)
                        setintensity(intensity1)
                        setlablez(relevance1)
                        setLoading(false)

                    })
            }
            catch {
                console.log("error")
            }
        }
        fun()

    }, [])

    const func = (data1, vs) => {
        const data = {
            labels: country,
            datasets: [
                {
                    label: `country-${vs}`,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: data1,
                    resposive: true,


                },
            ],

        };
        return data;
    }


    return (
        <>
            {
                Loading ? (<Loader />) : (
                    <div className='chart'>
                        <lable> Choose country vs </lable>
                        <select name='opt' id='opt'>

                            <option value={'likelihood'}


                            >likelihood</option>
                            <option value={'intensity'}

                            >intensity</option>
                            <option value={'relevance'}

                            >relevance</option>
                        </select>

                        <Line data=
                            {
                                func(relevance, 'relevance')


                            } />


                    </div >
                )

            }


        </>
    )
}

export default Chaart                                                                                        