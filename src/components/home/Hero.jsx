'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';

export default function Hero() {
    const [muted, setMuted] = useState(true);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/sliders`, {
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
        <div className="hero">
            <i className={`fa-solid mute-icon ${muted ? " fa-volume-low" : "fa-volume-xmark"}`} onClick={() => setMuted(!muted)}></i>

            <video
                width="320"
                height="240"
                autoPlay
                loop
                muted={muted}
            >
                <source src='/video1.mp4' type="video/mp4" />
                <source src='/video1.mp4' type="video/ogg" />
                Your browser does not support the video tag.
            </video>
            {
                loading ? <Loading /> :
                    <div className="overlay">
                        <Swiper
                            slidesPerView={3.1}
                            spaceBetween={24}
                            autoplay={false}
                            dir={'rtl'}
                            loop={true}
                            modules={[Autoplay, Navigation, Pagination]}
                            breakpoints={{
                                1400: {
                                    slidesPerView: 1,
                                },
                                1100: {
                                    slidesPerView: 1,
                                },
                                767: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 1,
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
                            {data.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <div className="heading">
                                        <h1>{item.title}</h1>
                                        <p>{item.description}</p>
                                        <div className="links">
                                            <Link href="/#services" className='sec-link' >تعرف علي خدماتنا </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
            }
        </div>
    );
}
