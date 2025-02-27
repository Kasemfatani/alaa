'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'; // Importing React to use JSX syntax and create components.
import logo from '../../../src/assets/images/home/logo.png'
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';



export default function Footer() { // Defining the main functional component named 'Footer'.

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [contactData, setContactData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: 'ar', // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/social_media`, {
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
        axios.get(`${API_BASE_URL}/contacts`, {
            headers: headers,
        }).then(response => {
            setContactData(response.data.data);  // Set the response data to state
            setLoading(false);  // Set loading to false
        })
            .catch(error => {
                setError(error);  // Handle any errors
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes
    const [whatsapp, setWhatsapp] = useState("");

    useEffect(() => {
        if (contactData?.length) {
            const mobileNumber = contactData.find((item) => item.type === "mobile")?.value;
            if (mobileNumber) {
                setWhatsapp(mobileNumber);
            }
        }
    }, [contactData]); // Runs when `contactData` updates
    console.log(whatsapp);

    return (
        <footer id='footer'> {/* Main footer container with padding and background color */}
            {
                loading ? <Loading /> :
                    <>
                        <Link href={`https://wa.me/${whatsapp}?text=Good%20Morning%20Alalaa`} target="_blank" className="fixed-what">
                            <i className="fa-brands fa-whatsapp"></i>
                        </Link>
                        <div className="container m-auto" id='footer'>
                            <div className="content">
                                <div className="logo">
                                    <Image src={logo} alt="Mazar" width={200} height={200} />
                                </div>
                                <div className="links">
                                    <h3>روابط سريعة</h3>
                                    <ul>
                                        <li><Link href="/">الرئيسية</Link></li>
                                        <li><Link href="/#about">عن الشركة</Link></li>
                                        <li><Link href="/#contact">تواصل معنا</Link></li>
                                    </ul>
                                </div>
                                <div className="links">
                                    <h3>تواصل معنا</h3>
                                    <ul>
                                        {
                                            contactData?.map((item, index) =>
                                                <li key={index}><Link href={item.type == "mobile" ? `tel:${item.value}` : item.type == "email" ? `mailto:${item.value}` : "#footer"} key={index}>{item.value}</Link></li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="links">
                                    <h3>مواقع التواصل</h3>
                                    <div className="social">
                                        {
                                            data?.map((item, index) =>
                                                <Link href={item.value} key={index} target='_blank'><i className={`fa-brands fa-${item.type}`} key={index}></i></Link>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="served">
                                <i className="fa-regular fa-copyright"></i> 2025,جميع الحقوق محفوظة لشركة الالاء الوطنية التجارية
                            </div>
                        </div>
                    </>
            }
        </footer>
    )
}
