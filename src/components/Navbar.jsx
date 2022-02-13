import React from 'react';
import { Search } from './Search';

export const Navbar = ({darkTheme, setDarkTheme}) => {
  return (
    <div className='p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200'>
        <div className='flex justify-between items-center space-x-5 w-screen'>
            <div>
                <p className='text-xl bg-green-500 font-bold text-white py-1 px-2 rounded dark:bg-yellow-300 dark:text-gray-900'>
                    Web Search 🕮
                </p>
            </div>
            <button type="button" onClick={() => setDarkTheme(!darkTheme)} className='rounded-full text-sm dark:bg-gray-50 dark:text-gray-900 bg-white border px-2 py-1 hover:shadow-lg' >
                {darkTheme? 'Light 💡' : 'Dark 🌙'}
            </button>           
        </div>
        <Search/>
    </div>
  );
}
