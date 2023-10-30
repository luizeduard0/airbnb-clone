'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import qs from 'query-string'

interface CategoryBoxProps {
  label: string
  description: string
  icon: any
  selected?: boolean
}

export default function CategoryBox({
  label,
  icon: Icon,
  selected
}: CategoryBoxProps) {

  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {
      skipNull: true
    })

    router.push(url)

  }, [params, label, router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col
        items-center justify-center
        gap-2 p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'text-neutral-800 border-neutral-800' : 'text-neutral-500 border-transparent'}
      `}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>
        {label}
      </div>
    </div>
  )
}