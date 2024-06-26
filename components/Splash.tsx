import React, { Fragment } from 'react';
import Image from 'next/image';
import logo from '/public/logo.svg';
import serviceName from '/public/service_title_white.svg';
import { Transition } from '@headlessui/react';

export default function Splash({ showSplash }: { showSplash: boolean }) {
  return (
    <Transition
      show={showSplash}
      enter='transition-opacity duration-1000'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-1000'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='h-screen flex flex-col justify-center items-center bg-[#171717] space-y-3 z-50'>
        <Image src={logo} alt='logo' width={70} height={70}/>
        <Image src={serviceName} alt='service_name' width={100} height={30}/>
      </div>
    </Transition>
  );
}
