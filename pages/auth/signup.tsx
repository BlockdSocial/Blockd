import Image from 'next/image';
import Link from 'next/link';
import {
    CheckIcon,
    KeyIcon,
} from '@heroicons/react/24/outline'
import React, { useState } from 'react';

function signup() {

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isChecked2, setIsChecked2] = useState<boolean>(false)
    const [isDisplayTermsAndConditionsModal, setIsDisplayTermsAndConditionsModal] = useState<boolean>(false);
    const [isDisplayPrivacyPolicyModal, setIsDisplayPrivacyPolicyModal] = useState<boolean>(false);

    return (
        <section className="min-h-screen flex items-stretch overflow-hidden text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
            <div className="md:flex w-1/2 hidden relative items-center">
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col items-start justify-center">
                        <Image
                            src="/images/logo/long-logo.png"
                            alt="Blockd Logo"
                            className="md:w-30 md:h-14"
                            width={180}
                            height={50}
                        />
                        <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">CREATE</h2>
                        <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-4xl">NEW ACCOUNT</h2>
                        <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline'>Login</Link></h4>
                        <br />
                        <hr className="w-1/3"></hr>
                        <h4 className="text-white mt-10 ml-2 pb-3 text-m md:text-m lg:text-l">Verified By Blockchain Technology</h4>
                        <div className='flex mt-8 '>
                            <button className="w-32 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">Learn more</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="md:w-1/2 w-full flex items-center justify-center text-center p-10 lg:p-20 z-0">
                <div className="flex items-center h-full w-full bg-color relative rounded-md">
                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                        <div className="flex justify-center items-center p-4 space-x-4 border-b border-gray-500 w-full">
                            <Image
                                src="/images/logo/logo.png"
                                alt="Blockd Logo"
                                className="md:hidden md:w-30 md:h-14"
                                width={70}
                                height={50}
                            />
                            <h2 className="text-center font-bold text-white text-4xl lg:text-5xl pb-3">Sign Up</h2>
                        </div>
                        <form action="" className="flex flex-col items-center justify-center w-full h-full px-10 py-5 lg:px-20">
                            <div className='flex flex-col items-start justify-center space-y-1 w-full'>
                                <p className='text-white font-semibold text-l'>Display Name</p>
                                <input className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none" type="text" name="name" placeholder="@" />
                            </div>
                            <div className='flex flex-col items-start justify-center space-y-1 mt-4 w-full'>
                                <p className='text-white font-semibold text-l'>Email</p>
                                <input className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none" type="email" name="email" placeholder="example@gmail.com" />
                            </div>
                            <div className='flex items-center justify-start mt-4 w-full space-x-2'>
                                <div onClick={() => setIsChecked(!isChecked)} className='flex items-center justify-center border rounded-md cursor-pointer w-5 h-5'>
                                    {isChecked &&
                                        <CheckIcon className='w-4 h-4 text-white' />
                                    }
                                </div>
                                <p onClick={() => setIsDisplayTermsAndConditionsModal(!isDisplayTermsAndConditionsModal)} className='text-white font-semibold text-l cursor-pointer'>Terms and Conditions</p>
                            </div>
                            <div className='flex items-center justify-start mt-4 w-full space-x-2'>
                                <div onClick={() => setIsChecked2(!isChecked2)} className='flex items-center justify-center border rounded-md cursor-pointer w-5 h-5'>
                                    {isChecked2 &&
                                        <CheckIcon className='w-4 h-4 text-white' />
                                    }
                                </div>
                                <p className='text-white font-semibold text-l'>Privacy Policy</p>
                            </div>
                            <button className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">Connect Wallet</button>
                            {isChecked === true && isChecked2 === true ? (
                                <button className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">Sign Up</button>
                            ) : (
                                <button className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white font-semibold py-3 px-4 rounded-full opacity-70" disabled>Sign Up</button>
                            )}
                        </form>
                        <div className='w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500'>
                            <h2 className="text-white text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline font-semibold'>Login</Link></h2>
                        </div>

                    </div>
                </div>
            </div>
            {/*  ****************Modal****************   */}
            <div className={`absolute flex items-start justify-center left-0 right-0 top-10 bottom-0 mx-auto w-96 h-[80vh] scrollbar-hide overflow-scroll bg-white rounded-lg ${isDisplayTermsAndConditionsModal ? '' : 'hidden'}`}>
                <div className="relative flex flex-col w-full max-w-md">
                    <div className="flex flex-col rounded-lg h-full">
                        <div className='sticky top-0 z-10 flex items-center justify-between w-full p-2 border-b backdrop-blur-md bg-white/30'>
                            <div className='text-black flex text-center justify-center font-semibold'>
                                Terms and Conditions
                            </div>
                            <button type="button" onClick={() => setIsDisplayTermsAndConditionsModal(!isDisplayTermsAndConditionsModal)} className="text-black bg-transparent hover:bg-gray-200 rounded-full text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className='flex flex-col items-start text-black justify-center w-full p-4 space-y-2'>
                            <p className='text-sm font-semibold text-justify'>
                                Thank you for using our social media platform, BLOCK’d (the "Service").
                                The Service is provided by BLOCK’d LLC., located in the Republic of
                                Cyprus. By using the Service, you agree to be bound by these Terms of
                                Use ("Terms"). If you do not agree to these Terms, please do not use the
                                Service.
                            </p>
                            <p className='text-xl font-semibold'>1. Creation of Accounts</p>
                            <p className='text-sm font-semibold text-justify'>
                                In order to use the Service, you must create an account
                                and provide certain information about yourself as
                                prompted by the Service's registration form. You must
                                provide accurate and complete information when creating
                                your account. Additionally, you are responsible for
                                maintaining the confidentiality of your account which
                                includes the credentials for the cryptocurrency wallet
                                linked to BLOCK’d. You are also responsible for all
                                activities that occur in connection with your account.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                You agree to immediately notify us of any unauthorized
                                use of your account, or any other breach of security. We
                                cannot and will not be liable for any loss or damage arising
                                from your failure to comply with this requirement.
                            </p>
                            <p className='text-xl font-semibold'>2. Who May Use the Service</p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> The Service is intended for users who are at least
                                18 years old. By using the Service, you represent
                                and warrant that you are at least 18 years old and
                                have the legal capacity to enter into this agreement.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> By using our platform, you affirm that you are not a
                                person who has been previously banned or
                                removed from our platform for violations of our
                                terms of service.
                            </p>
                            <p className='text-xl font-semibold'>3. Use of the Service</p>
                            <p className='text-sm font-semibold text-justify'>
                                You may use the Service only for lawful purposes and in
                                accordance with these Terms. You agree not to use the
                                Service:
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> In any way that violates any applicable federal,
                                state, local, or international law or regulation.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> To transmit, or procure the sending of, any
                                advertising or promotional material, including any
                                "junk mail," "chain letter," "spam," or any other similar
                                solicitation.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> To engage in any other conduct that restricts or
                                inhibits anyone's use or enjoyment of the Service, or
                                which, as determined by us, may harm the Service
                                or users of the Service or expose them to liability.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                Additionally, you agree not to:
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> Use the Service for any illegal or unauthorized purpose.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> Use the Service in any manner that could damage, disable,
                                overburden, or impair the Service or interfere with any other
                                party's use of the Service.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> Attempt to gain unauthorized access to the Service,
                                accounts, computer systems, or networks connected to the Service through hacking, password mining,
                                or any other means.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> Use the Service to transmit any virus, worm, defect, or
                                other harmful item.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> Engage in any activities that could compromise the security
                                or integrity of BLOCK'd.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                We reserve the right to terminate your access to the Service at any
                                time, without notice, for any reason, including without limitation,
                                for violation of these Terms.
                            </p>
                            <p className='text-xl font-semibold'>4. Intellectual Property</p>
                            <p className='text-sm font-semibold text-justify'>
                                All content, including logos, designs, text, graphics, images,
                                and software, contained on this platform is the property of
                                BLOCK’d LLC. or its licensors and is protected by copyright
                                and trademark laws. You may not use any content on this
                                platform for any commercial purpose without the express
                                written consent of BLOCK’d LLC. or the relevant licensor.
                                You may not modify, copy, distribute, transmit, display,
                                perform, reproduce, publish, license, create derivative
                                works from, transfer, or sell any content, contained on this
                                platform without the express written consent of BLOCK’d
                                LLC. or the relevant licensor. You may not use any content
                                on this platform for any purpose that is unlawful or
                                prohibited by these terms of use. If you violate any of these
                                terms, your permission to use the content on this platform
                                will automatically terminate and you must immediately
                                destroy any copies you have made of the content.
                            </p>
                            <p className='text-xl font-semibold'>5. Content on the Services</p>
                            <p className='text-sm font-semibold text-justify'>
                                The Service allows you to post, link, store, share, and
                                otherwise make available certain information, text,
                                graphics, videos, or other material ("Content"). You are
                                responsible for the Content that you post to the Service,
                                including its legality, reliability, and appropriateness.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                By posting Content to the Service, you grant us the right
                                and license to use, modify, publicly perform, publicly
                                display, reproduce, and distribute such Content on and
                                through the Service. You retain any and all of your rights to
                                any Content you submit, post, or display on or through the
                                Service, and you are responsible for protecting those
                                rights. You agree that this license includes the right for us
                                to make your Content available to other users of the
                                Service, who may also use your Content subject to these
                                Terms.
                            </p>
                            <p className='text-sm font-bold'>You represent and warrant that:</p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> You own the Content posted by you on or through the
                                Service or otherwise have the right to grant the rights and
                                licenses set forth in these Terms.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> The posting and use of your Content on or through the
                                Service does not violate, misappropriate, or infringe on the
                                rights of any third party, including, without limitation,
                                privacy rights, publicity rights, copyrights, other BLOCK’d
                                users, trademark, and/or other intellectual property rights.
                            </p>
                            <p className='text-xl font-semibold'>6.  Termination Clause</p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> We reserve the right to terminate your access to our social
                                media platform at any time, for any reason, and without
                                prior notice. If we terminate your access, you will no longer
                                be able to use our platform.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> In the event of termination, you may request that we delete
                                your personal data by contacting us at
                                narek_m@blockd.app. Please note that we may retain
                                certain information as required by law or for legitimate
                                business purposes. We also reserve the right to retain and
                                use any anonymous data derived from your use of the
                                platform.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>●</span> This termination clause is a material part of our terms of
                                use and your use of our platform signifies your acceptance
                                of this clause. If you do not agree to the terms of this
                                clause, you should not use our platform.
                            </p>
                            <p className='text-xl font-semibold'>7. Disclaimer & Limitations of Liability</p>
                            <p className='text-sm font-bold'>
                                DISCLAIMER:
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                BLOCK'd is a social media platform that utilizes
                                blockchain technology to verify accounts. While we
                                strive to ensure the accuracy and security of our
                                verification process, we cannot guarantee the
                                authenticity of every account. Users are advised to use
                                caution when interacting with others on the platform
                                and to report any suspicious activity to our team.
                                BLOCK'd is not responsible for any loss or damage
                                resulting from the use of the platform or reliance on
                                information obtained through the platform. Your access
                                to and use of the Services or any Content are at your own
                                risk.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                The Service is provided on an "as is" and "as available"
                                basis. We make no representations or warranties of any
                                kind, express or implied, as to the operation of BLOCK’d
                                or the information, content, materials, or products
                                included on the Service.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                We do not warrant that:
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(i)</span> the Service will be uninterrupted or error-free, and we
                                will not be liable for any interruptions or errors.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(ii)</span> the Service or any content or materials on the
                                platform will be free from viruses or harmful
                                components.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                We do not endorse and are not responsible for the
                                accuracy or reliability of any opinion, advice, or
                                statement made through the Service by any party other
                                than us.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                No information or advice obtained by you through the
                                Service or from us or any of our employees shall create
                                any warranty not expressly stated in these terms.
                            </p>
                            <p className='text-sm font-bold'>
                                LIMITATION OF LIABILITY:
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                We will not be liable for any damages of any kind arising
                                from the use of the Service, including, but not limited to,
                                direct, indirect, incidental, punitive, and consequential
                                damages.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                We will not be liable for:
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(i)</span> any loss or damage caused
                                by a distributed denial-of-service attack, viruses, or other
                                technologically harmful material that may infect your
                                computer equipment, computer programs, data, or other
                                proprietary material due to your use of the Service or to
                                your downloading of any material posted on BLOCK’d or
                                on any website linked to BLOCK’d.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(ii)</span> any loss or
                                damage resulting from your reliance on information or
                                other content posted on BLOCK’d.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(iii)</span> any loss or
                                damage resulting from the unauthorized access to,
                                alteration of, or destruction of your transmissions or
                                data.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(iii)</span> any loss or
                                damage resulting from the unauthorized access to,
                                alteration of, or destruction of your transmissions or
                                data.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(iv)</span> any loss or damage resulting from any actions
                                we take or fail to take as a result of communications you
                                send to us.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                <span className='text-blockd'>(v)</span> any loss or damage resulting from your
                                failure to comply with these terms.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                These limitations of liability apply whether the damages
                                arise from the use or misuse of the Service, from the
                                inability to use the Service, or from the interruption,
                                suspension, or termination of the Service (including
                                such damages incurred by third parties).
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                These limitations of liability apply even if we have been
                                advised of the possibility of such damages.
                            </p>
                            <p className='text-sm font-semibold text-justify'>
                                Nothing in these terms will exclude or limit our liability
                                for gross negligence, for death or personal injury caused
                                by our negligence, or for fraudulent misrepresentation.
                            </p>
                            <p className='text-xl font-semibold'>8. Indemnification</p>
                            <p className='text-sm font-semibold text-justify'>
                                You agree to indemnify and hold BLOCK'd and its
                                affiliates, officers, agents, and employees harmless
                                from any claim or demand, including reasonable
                                attorneys' fees, made by any third party due to or
                                arising out of your use of BLOCK'd, your violation of
                                these Terms, or your violation of any rights of another.
                            </p>
                            <p className='text-xl font-semibold'>9. Governing Law</p>
                            <p className='text-sm font-semibold text-justify'>
                                These Terms shall be governed by and construed in
                                accordance with the laws of the Republic of Cyprus,
                                and any disputes arising out of or in connection with
                                these Terms shall be subject to the exclusive
                                jurisdiction of the courts of the Republic of Cyprus.
                            </p>
                            <p className='text-xl font-semibold'>10. Changes to These Terms</p>
                            <p className='text-sm font-semibold text-justify'>
                                We reserve the right to modify these Terms at any
                                time. If we make any changes to these Terms, we will
                                post the updated Terms on this page and update the
                                "Last updated" date at the top of these Terms. We
                                encourage you to review these Terms regularly to stay
                                informed about our practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default signup