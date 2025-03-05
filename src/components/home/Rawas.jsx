'use client'
import React, { useState } from 'react';
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
export default function Rawas() {

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
                                <SwiperSlide>
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
                                        <h4>توريد وتركيب </h4>
                                        <h2> <NumberTicker value={265} /> +</h2>
                                        <p>نظام إطفاء وإنذار عبر مختلف القطاعات.</p>

                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.5,
                                            duration: .5,
                                        }}
                                        viewport={{ once: true }}
                                        className="rawas-options"
                                    >
                                        <h4>تصميم وتنفيذ</h4>
                                        <h2> <NumberTicker value={265} /> +</h2>
                                        <p> نظام أمني متكامل يشمل أجهزة الإنذار من السرقة وكاميرات المراقبة والبوابات الأمنية.</p>

                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.5,
                                            duration: .5,
                                        }}
                                        viewport={{ once: true }}
                                        className="rawas-options"
                                    >
                                        <h4>تصميم وتنفيذ</h4>
                                        <h2> <NumberTicker value={265} /> +</h2>
                                        <p> نظام أمني متكامل يشمل أجهزة الإنذار من السرقة وكاميرات المراقبة والبوابات الأمنية.</p>

                                    </motion.div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <Link href="https://www.google.com" className="book-link"><span>إعرف المزيد </span> <i className="fa-solid fa-arrow-left"></i></Link>
                    </div>
                    <div className="logo-rawas">
                        <Image src={logo} alt="rawas" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
