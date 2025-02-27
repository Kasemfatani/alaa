'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import { motion } from 'framer-motion';
import img from '/public/alalaa.jpg'


export default function Who() {

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/about`
            , {
                headers: headers,
            }).then(response => {
                setData(response.data.data);  // Set the response data to state
                setLoading(false);  // Set loading to false

            })
            .catch(error => {
                setError(error);  // Handle any errors
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes
    console.log(data);

    return (
        <>
            {
                loading ? <Loading /> :
                    <section className={` hero-main why`} id='about'>
                        <div className="container m-auto">
                            <div className="hero-about" >
                                <motion.div
                                    initial={{ opacity: 0, x: -200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: .5,
                                    }}
                                    viewport={{ once: true }}
                                    className="l-side">
                                    <h3 className='sec-title'>{data?.title}</h3>
                                    <p className='who-p'>  {data?.description}  </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: .5,
                                    }}
                                    viewport={{ once: true }}
                                    className="r-side">
                                    <div className="img-cont">
                                        <div className="overlay"></div>
                                        <Image src={data?.image} width={500} height={500} alt="Mazar" className="img-hero" />
                                    </div>
                                </motion.div>

                            </div >
                        </div >
                    </section >
            }

        </>
    )
}