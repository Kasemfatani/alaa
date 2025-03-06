'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NumberTicker from '../ui/number-ticker';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import logo from '/public/rawas.svg'
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import Loading from '@/app/loading';
export default function Rawas() {
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/services/vip`
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
        <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
                type: 'spring',
                bounce: 0.5,
                duration: .5,
            }}
            viewport={{ once: true }}
            className='rawas-page' id='contact'>
            {
                loading ? <Loading /> :
                    <div className="container m-auto">
                        <div className="rawas-cont">
                            <div className="main-side">
                                <h3>مع رواس تمتع بخدمات الامن والسلامة </h3>
                                <h4>مع رواس تمتع بخدمات الامن والسلامة </h4>
                                <div className="ltr mb-8" style={{ direction: 'ltr' }}>
                                    <Swiper
                                        slidesPerView={2}
                                        spaceBetween={32}
                                        autoplay={true}
                                        dir={'rtl'}
                                        loop={true}
                                        modules={[Autoplay, Navigation, Pagination]}
                                        breakpoints={{
                                            1400: {
                                                slidesPerView: 2,
                                            },
                                            1100: {
                                                slidesPerView: 2,
                                            },
                                            767: {
                                                slidesPerView: 1.5,
                                            },
                                            640: {
                                                slidesPerView: 1.5,
                                                autoplay: false,
                                                spaceBetween: 16
                                            },
                                            100: {
                                                slidesPerView: 1,
                                                autoplay: false,
                                                spaceBetween: 16
                                            }
                                        }}
                                    >
                                        {
                                            data.features.map((item, index) =>
                                                <SwiperSlide key={index}>
                                                    <motion.div
                                                        initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                                        transition={{
                                                            type: 'spring',
                                                            bounce: 0.5,
                                                            duration:
                                                                .5,
                                                        }}
                                                        viewport={{ once: true }}
                                                        className="rawas-options"
                                                    >
                                                        <h4>{item.title}</h4>
                                                        <h2> <NumberTicker value={Number(item.counter)>1000000?Number(item.counter)/1000000: Number(item.counter)} /> {Number(item.counter)>1000000? 'مليون': ''} +</h2>
                                                        <p>{item.description}</p>

                                                    </motion.div>
                                                </SwiperSlide>
                                            )
                                        }
                                    </Swiper>
                                </div>
                                <Link href={`service?id=${data.id}`} className="book-link"><span>اعرف المزيد </span> <i className="fa-solid fa-arrow-left"></i></Link>
                            </div>
                            <div className="logo-rawas">
                                <Image src={logo} alt="rawas" />
                            </div>
                        </div>
                    </div>
            }
        </motion.div>
    );
}
