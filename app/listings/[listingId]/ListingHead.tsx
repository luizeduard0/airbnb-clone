'use client'

import Heading from "@/app/components/Heading"
import HeartButton from "@/app/components/HeartButton"
import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import Image from "next/image"

interface IListingHead{
  id: string
  title: string
  imageSrc: string
  locationValue: string
  currentUser?: SafeUser | null
}

export default function ListingHead({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser
}: IListingHead) {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div
        className='
          w-full h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        '
      >
        <Image
          alt='Image'
          src={imageSrc}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}