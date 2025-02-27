'use client'
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import validator from "validator";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
// import PhnoeInput from 'react-phone-number-input'; // Importing a phone number input component.
import PhoneInput from 'react-phone-number-input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations
import axios from 'axios';
import Loading from '@/app/loading';
import { Textarea } from '../ui/textarea';
import { comment } from 'postcss';
import { API_BASE_URL } from '@/lib/apiConfig';
import { Toast } from '../ui/toast';
import { toast } from "sonner"
export default function FormPage(props) {
    // const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const sendPostRequest = async (data) => {
        const url = 'https://alaa.irfaad.com/api/contact-us';
        console.log(data);
        const queryParams = {
            customer_name: data?.name,
            customer_mobile: data?.phone,
            customer_email: data?.email,
            service_id: data.service,
            message: data.comments,
        };
        return axios({
            method: 'post',
            url: url,
            data: queryParams,
            headers: {
                lang: 'ar',
            },
        }).then(response => {
            console.log(response);
            const message = response.data?.message || 'Operation successful';
            if (response.status === 200) {
                // Success toast notification
                toast(message, {
                    style: {
                        borderColor: "#28a745",
                        boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)'
                    },
                });
                // Redirect or perform additional actions
                form.reset(); // Reset form fields
            } else {
                // Handle unexpected responses
                toast(errorMessage, {
                    style: {
                        borderColor: "#dc3545",
                        boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                    },
                    description: 'Unexpected response',
                });
            }
        })
    };

    console.log(data);
    const router = useRouter()

    let setDone = props.setDone;
    console.log(props);
    // const [date, setDate] = React.useState<Date>()
    const [date, setDate] = useState(new Date());
    const [visited, setVisited] = useState(false);
    const [captchaa, setCaptchaa] = useState(false);
    function onChange(value) {
        setCaptchaa(true);
        console.log(captchaa);
    }
    const formSchema = z
        .object({

            name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must be at most 50 characters" }),
            phone: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" }),
            email: z.string().email({ message: "Invalid email address" }),
            comments: z.string().max(500, { message: "Comments must be at most 500 characters" }),
            service: z.string().min(1, { message: "Service is required" }),

        })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            comments: '',
            service: '',
            // captcha: '',
        },
    });
    const Submit = (data) => {
        console.log(data);
        sendPostRequest(data);

    };
    return (
        // loading ? <div className="w-full"><Loading /> </div> :
        <motion.div
            initial={{ opacity: 0, x: -300 }} // Initial animation state (faded and shifted left)
            whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
            viewport={{ once: true }}
            transition={{
                delay: 0.2,
                // type: 'spring', // Using spring animation for smooth motion
                bounce: 0.2, // Small bounce effect for the animation
            }}
            className='w-full form form-contact-alaa'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(Submit)} >
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.3,
                            // type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                        }}>
                        <FormField
                            control={form.control}
                            name="name"
                            className='w-full'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>اسم الشركه </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="قم بادخال اسم شركتك"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='form-message' />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.4,
                            // type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                        }}>
                        <FormField
                            className="w-full"
                            control={form.control}
                            name="email" // Field for phone number
                            render={({ field }) => (
                                <FormItem className={`w-full `}>
                                    <FormLabel className=''>البريد الاكتروني</FormLabel> {/* Label for phone number */}
                                    <FormControl className=''>
                                        <Input
                                            type="email"
                                            placeholder="Email@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='form-message' /> {/* Displaying validation messages */}
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.4,
                            // type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                        }}>
                        <FormField
                            className="w-full"
                            control={form.control}
                            name="phone" // Field for phone number
                            render={({ field }) => (
                                <FormItem className={`w-full `}>
                                    <FormLabel className=''>رقم الهاتف</FormLabel> {/* Label for phone number */}
                                    <FormControl className=''>
                                        <PhoneInput placeholder="+965 00000000" defaultCountry="SA"
                                            className="phoneInput-cont" {...field} />
                                    </FormControl>
                                    <FormMessage className='form-message' /> {/* Displaying validation messages */}
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.5,
                            // type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                        }}>
                        <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>الخدمه</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className="date-picker">
                                            <SelectTrigger className="w-full">
                                                <FormLabel className="date-btn">
                                                    <SelectValue placeholder="اختار خدمه" />
                                                </FormLabel>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="1">نقل مواد يتروليه</SelectItem>
                                                <SelectItem value="2">استثمارات بتروليه</SelectItem>
                                                <SelectItem value="3">خدمة عالمية</SelectItem>
                                                <SelectItem value="4">خدمه ما بعد البيع</SelectItem>

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='form-message' />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.6,
                            // type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                        }} className='text-area-cont'>
                        <FormField
                            className=""
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem className="">

                                    <FormControl>
                                        <Textarea
                                            type="textarea"
                                            {...field}
                                            placeholder={"اخبرنا اكثر عن شركتك ونوع الخدمه "}
                                            className=""
                                        />
                                    </FormControl>
                                    <FormMessage className="" />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                    <Button disabled={loading} type="submit" className={`${loading? 'opacity-50' : ''} text-xl py-4 rounded-xl min-w-32 h-13 submit `}>تأكيد</Button>
                </form>
            </Form>
        </motion.div>
    );
}
