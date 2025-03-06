'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NumberTicker from '../ui/number-ticker';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';



export default function Parteners() {
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/counters`
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
   
    return (
        <div className="parteners" >
            <div className="container  m-auto" >
                
                <div className="nums">
                    <h3> أرقامنا .. </h3>
                    <h4>منذ تأسيسنا ونحن نصنع الفرق... إليك أرقام الآلاء التي تتحدث عن نفسها!</h4>
                    {
                        loading ? <Loading /> :
                            <div className="numbers-cont">
                                {
                                    data.map((item, index) =>
                                        <motion.div
                                            initial={{ y: 100, opacity: 0, }}
                                            whileInView={{ y: 0, opacity: 1, }}
                                            transition={{
                                                type: 'spring',
                                                bounce: 0.5,
                                                duration: index * .5,
                                            }}
                                            viewport={{ once: true }
                                            }
                                            className="number" key={index}>
                                            <h2>{item.title}</h2>
                                            <div className="needed">
                                                {/* <NumberTicker value={item.counter} /> + */}
                                                <NumberTicker value={Number(item.counter)>1000000?Number(item.counter)/1000000: Number(item.counter)} /> {Number(item.counter)>1000000? 'مليون': ''} +
                                            </div>
                                            <p>{item.description}</p>
                                        </motion.div>
                                    )
                                }
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}
