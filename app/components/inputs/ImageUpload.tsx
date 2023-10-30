'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export default function ImageUpload({
  value,
  onChange
}: ImageUploadProps) {

  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url)
  }, [onChange])

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="rqqcu1nb"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='
              flex flex-col justify-center items-center
              gap-4
              relative cursor-pointer
              hover:opacity-70
              transition
              border-dashed border-2 border-neutral-300
              text-neutral-600
              p-20
            '
          >
            <TbPhotoPlus size={50} />
            <div className='font-semibold text-lg'>
              Click to upload
            </div>
            {value && (
              <div
                className='absolute inset-0 w-full h-full'
              >
                <Image
                  fill
                  alt='Upload'
                  src={value}
                  objectFit='cover'
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}