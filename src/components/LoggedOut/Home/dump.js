import React, { Fragment, useState } from 'react';

const Welcome = () => {
  const [welcomeMessageShow, setWelcomeMessageShow] = useState(true);

  return (
  
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      {welcomeMessageShow && (
        <div
          className="bg-indigo-600 text-white rounded shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4"
          x-data="{welcomeMessageShow:true}"
          x-show="welcomeMessageShow"
          x-transition:enter="transition-all ease duration-500 transform"
          x-transition:enter-start="opacity-0 scale-110"
          x-transition:enter-end="opacity-100 scale-100"
          x-transition:leave="transition-all ease duration-500 transform"
          x-transition:leave-end="opacity-0 scale-90"
        >
           
          <div className="flex flex-wrap -mx-3 items-center">
            <div className="w-1/4 px-3 text-center hidden md:block">
              <div className="p-5 xl:px-8 md:py-5">
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 868 731"
                >
                  <style>
                    {`.st0{opacity:.5;fill:#434190;enable-background:new}.st1{fill:url(#SVGID_1_)}.st2{fill:url(#SVGID_2_)}.st3{fill:#434190}.st4{fill:url(#SVGID_3_)}.st5{fill:url(#SVGID_4_)}.st6{fill:url(#SVGID_5_)}.st7{fill:url(#SVGID_6_)}.st8{fill:url(#SVGID_7_)}.st9{fill:url(#SVGID_8_)}.st10{fill:url(#SVGID_9_)}.st11{fill:url(#SVGID_10_)}.st12{fill:url(#SVGID_11_)}.st13{fill:url(#SVGID_12_)}.st14{fill:url(#SVGID_13_)}.st15{fill:url(#SVGID_14_)}.st16{fill:url(#SVGID_15_)}.st17{fill:url(#SVGID_16_)}.st18{fill:url(#SVGID_17_)}.st19{fill:#fff}.st20{fill:url(#SVGID_18_)}.st21{fill:url(#SVGID_19_)}.st22{fill:url(#SVGID_20_)}.st23{opacity:.5;enable-background:new}.st24{fill:url(#SVGID_21_)}.st25{fill:#263238}.st26{fill:#f8c198}.st27{fill:#ff9800}.st28,.st29{opacity:.2}.st29{fill:#fff;enable-background:new}`}
                  </style>
                  <title>welcome</title>
                  <path
                    className="st0"
                    d="M179 68.2h510v595.5H179V68.2z"
                  />
                  <linearGradient
                    id="SVGID_1_"
                    gradientUnits="userSpaceOnUse"
                    x1="731.5"
                    y1="102"
                    x2="731.5"
                    y2="627"
                    gradientTransform="matrix(1 0 0 -1 0 732)"
                  >
                    <stop offset="0" style={{ stopColor: '#263238' }} />
                    <stop offset="1" style={{ stopColor: '#607D8B' }} />
                  </linearGradient>
                  <path
                    className="st1"
                    d="M755.4 179.9c-13-8.7-33.7-11.7-58-6.6-44.7 9-77.9 34.5-102.9 74.3-23.2 36-29.6 82.5-17.3 133.8 13.4 58.6 49.7 97.8 107.6 121.4 14.2 5.3 30 9 47.6 10.5v4.5c0 21.6-8.7 40.6-26 57.3-13.7 12.5-29.8 21.8-48.2 27.7-43 12-89.6-.2-126-32.7-25.8-22.2-43.3-54.6-50.5-94.6-9-49.7 1.3-91.5 30.4-124.3C628.2 230 669.9 217 716 219.2c3.9.2 7.9.3 11.9.7 35 3.1 66.3 18.4 89.5 46.3 21.8 25.9 31.6 61.3 26.2 98.9-.5 4.4-.8 8.9-.8 13.3v1c.3 18.7 5.3 36.2 15 52 20.3 32.2 61 46.7 98.6 34.6 24.7-8.5 41.4-28.5 47-53 5.7-26-1-49.6-19.4-69.5"
                  />
                  <linearGradient
                    id="SVGID_2_"
                    gradientUnits="userSpaceOnUse"
                    x1="403"
                    y1="56.6"
                    x2="403"
                    y2="590.1"
                  >
                    <stop offset="0" style={{ stopColor: '#607D8B' }} />
                    <stop offset="1" style={{ stopColor: '#263238' }} />
                  </linearGradient>
                  <path
                    className="st2"
                    d="M322.2 559.2c-33.5-2.5-62.3-15.6-85.4-38.8-44.2-43.5-59.5-102.8-43.5-166 14.5-58.4 52.2-98 114.5-120.6 23.5-7.8 48.1-11.7 72.5-11.9 33.2-2 62.4 10.4 84.5 35.7 10.3 11.4 18.3 24.3 23.8 38.5v.2c12.8 32.5 12.3 65.2-1.7 97.4-10.5 26.8-28 47.6-50.7 62.4v.3c-12.2 8.2-25.1 15.4-38.7 21.4-17.8 7.3-36.8 11.6-56.4 11.5zm-8.4-2.3h.2zM643.3 493.2c-11.3-27.5-29.2-49.6-53.2-65.8v-.2c-23.2-15-47.7-22.3-73.2-21.9-23.7.2-47 5.8-68.4 16.5-38.2 17.2-63.7 50.6-72.5 93.8-11 48 1.7 89.6 34.6 121 36.2 36.1 87.4 52.1 143.2 42.4 26.8-4.2 51.3-15.6 71.6-33.8 19-16.2 32.7-36.7 41.4-60.8v-.2c4.3-11.6 7.4-23.6 9.3-35.9v-.2c2.4-18.6-2.1-36.3-13.6-52.6zm-180.5-42.3c0-2.4-.1-4.7-.2-7v-.2c-1.2-20.2-12.5-35.7-32.5-42.1v-.2c-12.3-4.1-24.9-6-37.6-5.5-8.6.3-17.1 1.7-25.6 4.2v-.2c-21.2 6-35.9 22.8-37.2 43.9-.5 8.6 1.4 17.1 5.4 25.6 1.7 4.2 3.8 8.3 6.4 12.3v.2c6.7 10.3 15.6 17.7 27 21.9v.2c11.8 3.8 23.9 5.7 36.1 5.6 9.7-.1 19.4-1.2 29-3.6v.2c22.2-5 37.8-19.7 43.1-41.7 1.5-6.7 1.8-13.5.9-20.3zm-77.5-11.4c.2 0 .3-.1.5-.1zm78 10.2c-3.2 19.5-16.4 32.7-38.2 36.1v.2c-13 2.1-26.2 1.2-39.2-2.6v-.2c-16-5.4-27.5-17.6-31.5-35.7v-.2c-3.1-17.4.1-30.3 8.9-38.4v-.2c6.1-6.1 13.5-9.5 21.9-10.2 10.3-.6 20.5 1.9 30 7.3v.2c14.6 7.4 22.9 19.6 24.5 36.7.1 1.1.2 2.2.2 3.2v.2z"
                  />
                  <linearGradient
                    id="SVGID_3_"
                    gradientUnits="userSpaceOnUse"
                    x1="220.5"
                    y1="133.9"
                    x2="220.5"
                    y2="724.7"
                  >
                    <stop offset="0" style={{ stopColor: '#FFA000' }} />
                    <stop offset="1" style={{ stopColor: '#FFC107' }} />
                  </linearGradient>
                  <path
                    className="st3"
                    d="M228.5 724.7c-12.9 0-25.5-2.4-37.6-7.2-19.2-7-35.7-20-48.4-38-13.6-19.4-20.5-41.7-20.5-66.5v-44.3c0-32.3 6.8-61.9 20.3-89.1 13.5-27.3 33.1-49.3 58.7-65.9 25.6-16.6 54.7-24.9 87.2-24.9 32.5 0 61.5 8.3 87 24.9 25.6 16.6 45.2 38.6 58.7 65.9 13.5 27.3 20.3 56.8 20.3 88.2v44.1c0 24.8-6.9 47.1-20.5 66.5-13.6 19.4-29.8 31.4-48.4 38-12.1 4.8-24.7 7.2-37.6 7.2zm0-660.8c-69.8 0-126 56.2-126 126v44.1c0 8.5 1 16.8 3.1 24.9v-.2c2.6 8.6 7.4 16.8 14.3 23.7 6.9 6.9 15.1 11.7 23.7 14.3v.2c8.1 2.1 16.4 3.1 24.9 3.1 8.5 0 16.8-1 24.9-3.1v-.2c8.6-2.6 16.8-7.4 23.7-14.3 6.9-6.9 11.7-15.1 14.3-23.7v-.2c2.1-8.1 3.1-16.4 3.1-24.9v-44.1c0-69.8-56.2-126-126-126z"
                  />
                  <linearGradient
                    id="SVGID_4_"
                    gradientUnits="userSpaceOnUse"
                    x1="481.9"
                    y1="137.1"
                    x2="481.9"
                    y2="724.7"
                  >
                    <stop offset="0" style={{ stopColor: '#FFA000' }} />
                    <stop offset="1" style={{ stopColor: '#FFC107' }} />
                  </linearGradient>
                  <path
                    className="st4"
                    d="M481.9 724.7c-12.9 0-25.5-2.4-37.6-7.2-19.2-7-35.7-20-48.4-38-13.6-19.4-20.5-41.7-20.5-66.5v-44.3c0-32.3 6.8-61.9 20.3-89.1 13.5-27.3 33.1-49.3 58.7-65.9 25.6-16.6 54.7-24.9 87.2-24.9 32.5 0 61.5 8.3 87 24.9 25.6 16.6 45.2 38.6 58.7 65.9 13.5 27.3 20.3 56.8 20.3 88.2v44.1c0 24.8-6.9 47.1-20.5 66.5-13.6 19.4-29.8 31.4-48.4 38-12.1 4.8-24.7 7.2-37.6 7.2zm0-660.8c-69.8 0-126 56.2-126 126v44.1c0 8.5 1 16.8 3.1 24.9v-.2c2.6 8.6 7.4 16.8 14.3 23.7 6.9 6.9 15.1 11.7 23.7 14.3v.2c8.1 2.1 16.4 3.1 24.9 3.1 8.5 0 16.8-1 24.9-3.1v-.2c8.6-2.6 16.8-7.4 23.7-14.3 6.9-6.9 11.7-15.1 14.3-23.7v-.2c2.1-8.1 3.1-16.4 3.1-24.9v-44.1c0-69.8-56.2-126-126-126z"
                  />
                  <linearGradient
                    id="SVGID_5_"
                    gradientUnits="userSpaceOnUse"
                    x1="740.6"
                    y1="133.9"
                    x2="740.6"
                    y2="724.7"
                  >
                    <stop offset="0" style={{ stopColor: '#FFA000' }} />
                    <stop offset="1" style={{ stopColor: '#FFC107' }} />
                  </linearGradient>
                  <path
                    className="st5"
                    d="M748.6 724.7c-12.9 0-25.5-2.4-37.6-7.2-19.2-7-35.7-20-48.4-38-13.6-19.4-20.5-41.7-20.5-66.5v-44.3c0-32.3 6.8-61.9 20.3-89.1 13.5-27.3 33.1-49.3 58.7-65.9 25.6-16.6 54.7-24.9 87.2-24.9 32.5 0 61.5 8.3 87 24.9 25.6 16.6 45.2 38.6 58.7 65.9 13.5 27.3 20.3 56.8 20.3 88.2v44.1c0 24.8-6.9 47.1-20.5 66.5-13.6 19.4-29.8 31.4-48.4 38-12.1 4.8-24.7 7.2-37.6 7.2zm0-660.8c-69.8 0-126 56.2-126 126v44.1c0 8.5 1 16.8 3.1 24.9v-.2c2.6 8.6 7.4 16.8 14.3 23.7 6.9 6.9 15.1 11.7 23.7 14.3v.2c8.1 2.1 16.4 3.1 24.9 3.1 8.5 0 16.8-1 24.9-3.1v-.2c8.6-2.6 16.8-7.4 23.7-14.3 6.9-6.9 11.7-15.1 14.3-23.7v-.2c2.1-8.1 3.1-16.4 3.1-24.9v-44.1c0-69.8-56.2-126-126-126z"
                  />
                </svg>
              </div>
              <div className="text">
                <h2>Welcome to our Website</h2>
                <p>
                  We are a team of talented individuals passionate about
                  creating amazing websites. Our goal is to provide you with
                  innovative and visually stunning designs that will captivate
                  your audience.
                </p>
                <button>Learn More</button>
              </div>
            </div>
          </div>
          </div>
  
    );
  }
}

export default Welcome;
