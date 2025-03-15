'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import img from '/public/alalaa.jpg'
export default function About() {
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/services`
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
        <div className="about" >
            <div className="container m-auto" id='services'>
                <h2>خدماتنا ..</h2>
                <h3>جاهزون لخدمتك... تواصل معنا ودعنا نصنع الفرق معاً.</h3>
                <div className="services-conr" style={{ direction: 'rtl' }}>
                    {
                        loading ? <Loading /> :
                        <Swiper
                        slidesPerView={2}
                        spaceBetween={32}
                        autoplay={true}
                        dir={'rtl'}
                        loop={false}
                        modules={[Autoplay, Navigation, Pagination]}
                        breakpoints={{
                            1400: {
                                slidesPerView: 3,
                            },
                            1100: {
                                slidesPerView: 3,
                            },
                            767: {
                                slidesPerView: 2.5,
                            },
                            640: {
                                slidesPerView: 1.5,
                                autoplay: false,
                                spaceBetween: 16
                            },
                            100: {
                                slidesPerView: 1.1,
                                autoplay: false,
                                spaceBetween: 16
                            }
                        }}
                        className="option"
                    >
                    
                                {data.map((item, index) =>
                                    <SwiperSlide key={index} style={{ order: index }}>
                                        <motion.div
                                            initial={{ y: 100, opacity: 0, }}
                                            whileInView={{ y: 0, opacity: 1, }}
                                            transition={{
                                                type: 'spring',
                                                bounce: 0.5,
                                                duration: index * .5,
                                            }}
                                            viewport={{ once: true }}
                                            className="option" key={index}
                                        >
                                            <div className="img-cont">
                                                <Image src={item.cover} width={200} height={200} alt="alalaa"></Image>
                                            </div>
                                            <div className="text">
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                                <Link href={`/service?id=${item.id}`} className="btn"><span>اعرف المزيد </span> <i className="fa-solid fa-chevron-left"></i></Link>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                    }
                </div>
            </div>
        </div>
    )
}
