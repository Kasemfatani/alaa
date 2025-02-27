'use client';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/home/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from "@/lib/apiConfig";
import axios from "axios";
import Loading from '@/app/loading';
export default function Header() {
  function handleClose() {
    document.querySelector('html').style.overflowY = 'unset';
    document.querySelector('.side-menu').classList.toggle('side-menu-active')
    document.querySelector('.menu-bars').classList.toggle('hidden')
    document.querySelector('.menu-bars-X').classList.toggle('hidden')
    document.querySelector('.X-overlay').classList.toggle('hidden')
  }


  return (
      <header className="header">
        <div className="X-overlay hidden" onClick={handleClose}></div>
        <div className="container m-auto flex items-center gap-2 justify-between">
          <Link href="/"> <Image src={logo} alt="logo" className="logo-img" /></Link>
          <div className="links">
            <Link href="/">الرئيسية</Link>
            <Link href="/#about">أعرف عنا</Link>
            <Link href="/#services">خدماتنا </Link>
            <Link href="/#contact" className='book-link' >تواصل معنا </Link>
          </div>
          <Menu className='menu-bars' onClick={() => {
            document.querySelector('html').style.overflowY = 'hidden';
            document.querySelector('.side-menu').classList.toggle('side-menu-active')
            document.querySelector('.menu-bars').classList.toggle('hidden')
            document.querySelector('.menu-bars-X').classList.toggle('hidden')
            document.querySelector('.X-overlay').classList.toggle('hidden')
          }} />
          <X className='menu-bars-X hidden' onClick={handleClose} />
          <div className="side-menu" onClick={handleClose}>
            <div className="links" onClick={handleClose} >
              <Link href="/" onClick={handleClose}>الرئيسية</Link>
              <Link href="/#about" onClick={handleClose}>أعرف عنا</Link>
              <Link href="/#services" onClick={handleClose}>خدماتنا </Link>
              <Link href="/#contact" className='book-link' onClick={handleClose} >تواصل معنا </Link>
            </div>
          </div>
        </div>
      </header>
     
  );
}