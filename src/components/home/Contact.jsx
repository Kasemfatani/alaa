'use client'
import React, { useState } from 'react';
import MazarInfo from '../../components/book/MazarInfo';
import FormPage from '../../components/book/FormPage';
export default function Contact() {

    return (
        <div className='book-main-page' id='contact'>
            <div className="container m-auto">
                <h2 className='h2-form-contact'>تواصل معنا لنحقق النجاح سويا </h2>
                <div className="book-cont">
                    <MazarInfo></MazarInfo>
                    <FormPage ></FormPage>
                </div>
            </div>
        </div>
    );
}
