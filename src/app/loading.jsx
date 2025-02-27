import React from 'react'
import footerimg from '../assets/images/home/logo.png'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className="fire-cont">
            <div className="fire">
                <div className="fire-left">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                </div>
                <div className="fire-center">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                </div>
                <div className="fire-right">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                </div>
                <div className="fire-bottom">
                    <div className="main-fire"></div>
                </div>
            </div>
        </div>
    )
}
