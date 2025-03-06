'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/lib/apiConfig';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import Image from 'next/image';
import NumberTicker from '../ui/number-ticker';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import BlurFade from '../ui/blur-fade';
import img1 from '/public/alalaa.jpg'
import img2 from '/public/alalaa2.jpg'
import img3 from '/public/alalaa3.jpg'


export default function SingleService() {
    const searchParams = useSearchParams()
    const [pathId, setPathId] = useState(searchParams.get('id'))
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        //scroll to top
        window.scrollTo(0, 0);
        axios.get(`${API_BASE_URL}/services/${pathId}/show`
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

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
    return (
        <div className="SingleService" >
            {
                loading ? <Loading /> :
                    <div className="container m-auto">
                        <div className="single-details">
                            <div className="text">
                                <h2>{data?.name}</h2>
                                <p>{data?.description}</p>
                                <div className="counters">
                                    {
                                        data.features.map((feature, index) =>
                                            <div className="counter" key={index}>
                                                <h4>{feature.title}</h4>
                                                <h5><NumberTicker value={Number(feature.counter)} /> + </h5>
                                                <p>{feature.description}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="img-cont">
                                <Image src={data?.cover} alt="Mazar" width={200} height={200} />
                                {/* <Image src={img2} alt="Mazar" width={200} height={200} /> */}
                            </div>
                        </div>
                        <div className="gallery">
                            <h3>معرض الصور</h3>
                            <div className="columns-2 gap-4 sm:columns-5">
                                {
                                    data.images.map((img, idx) =>
                                        <BlurFade key={img.id} delay={0.25 + idx * 0.05} inView>
                                            <a href={img.image} data-fancybox="gallery">
                                                <figure>
                                                    <Image src={img.image} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-lg object-contain" />
                                                </figure>
                                            </a>
                                        </BlurFade>
                                    )
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
