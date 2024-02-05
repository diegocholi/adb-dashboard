'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { FormEvent } from 'react'

const SearchAction = (props: any) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handlerSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    let hrefBuilder: string = `/dashboard?search=${formData.get('search')}`
    searchParams.forEach((item, key) => {
      if (hrefBuilder.indexOf(`${key}=`) !== -1) return
      if (hrefBuilder.indexOf('?') === -1) {
        hrefBuilder += `?${key}=${item}`
        return
      }
      hrefBuilder += `&${key}=${item}`
    })
    router.push(hrefBuilder)
  }

  return (
    <form onSubmit={handlerSearch} className='mb-1 mt-3'>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          name='search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Buscar por APPS'
          required
        />
        <button
          type='submit'
          className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Buscar
        </button>
      </div>
    </form>
  )
}

export default SearchAction
