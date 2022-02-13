import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();
  let isEmpty = true;

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);        
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  if (!searchTerm) {
    return(<div className='text-center text-2xl mt-10 text-gray-500 dark:text-white-100'>
      <div>Enter something in searchbox 🚴‍♂️</div>
      <div className="text-sm mt-5">Created by Cijo M Jose <a href="https://www.linkedin.com/in/cijo-m-jose-6b3502134/" className="text-blue-500" target="_blank" rel="noreferrer">(Linkedin)</a></div>
      <div className="text-sm">Referred from videos of <a href="https://www.youtube.com/watch?v=NDbruK1fzG8&t=3197s" className="text-red-500" target="_blank" rel="noreferrer">JavaScript Mastery</a></div>
    </div>)
  } else {
    if (results?.length === 0)
      return (
        <div className='text-center font-mono text-black-500 dark:text-white-500'>
          No Results found
        </div>
      );
      
    // console.log({results});
    switch (location.pathname) {
      case "/search":
        return (
          <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
            {results?.map((result, index) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={result?.link} target='_blank' rel='noreferrer'>
                  <p className='text-sm'>
                    {console.log(typeof(result?.link))}
                    {typeof(result?.link) === 'string' && (result?.link?.length > 30 ? result?.link?.substring(0, 30) : result?.link)}
                  </p>
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {result?.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        );
      case "/images":
        return (
          <div className='flex flex-wrap justify-center items-center'>
            {results?.map(({ image, link }, index) => (
              <a
                className='sm:p-3 p-5'
                href={link.href}
                key={index}
                target='_blank'
                rel='noreferrer'>
                <img src={image?.src} alt={link.title} loading='lazy' />
                <p className='w-36 break-words text-sm mt-2'>{link.title}</p>
              </a>
            ))}
          </div>
        );
      // case "/news":
      //   return (
      //     <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
      //       {results?.map(({ links, source, title }, index) =>  (              
      //         <div key={index} className='md:w-2/5 w-full'>
      //           <a
      //             href={links?.[0].href}
      //             target='_blank'
      //             rel='noreferrer'
      //             className='hover:underline'>
      //             <p className='text-lg dark:text-blue-300 text-blue-700'>
      //               {title}
      //             </p>
      //           </a>
      //           <div className='flex gap-4'>
      //             <a href={source?.href} target='_blank' rel='noreferrer'>
      //               {source?.href}
      //             </a>
      //           </div>
      //         </div>
      //       ))}
      //     </div>
      //   );
      case "/videos":
        return (
          <div>
            <div className='flex flex-wrap'>
              {results?.map((video, index) => {
                if (
                  video?.additional_links?.[0].href &&
                  video?.additional_links?.[0].href.includes("youtube") &&
                  video?.additional_links?.[0].text.includes("watch")
                )
                  isEmpty = false;
                return (
                  <div key={index} className='p-2'>
                    {video?.additional_links?.[0].href &&
                      video?.additional_links?.[0].href.includes("youtube") &&
                      video?.additional_links?.[0].text.includes("watch") && (
                        <ReactPlayer
                          url={video.additional_links?.[0].href}
                          controls
                          width='355px'
                          height='200px'
                        />
                      )}
                  </div>
                );
              })}
            </div>
            <div
              hidden={!isEmpty}
              className='text-center font-mono text-black-500 dark:text-white-500'>
              No Results found
            </div>
          </div>
        );
      default:
        return <div>ERROR</div>;
    }
  }
};
