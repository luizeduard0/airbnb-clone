'use client'

import { useCallback, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Range } from "react-date-range"

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/CoutrySelect"
import queryString from "query-string"
import Heading from "../Heading"
import Calendar from "../Calendar"
import Counter from "../inputs/Counter"

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

export default function SearchModal() {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const Map = useMemo(() => dynamic(
    () => import('@/app/components/Map').then((module) => module.Map),
    { ssr: false }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [location])

  const onBack = useCallback(() => {
    setStep(step - 1)
  }, [step])

  const onNext = useCallback(() => {
    setStep(step + 1)
  }, [step])

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = dateRange.startDate.toISOString()
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = dateRange.endDate.toISOString()
    }

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {
      skipNull: true,
    })

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)

  }, [step, params, location?.value, guestCount, roomCount, bathroomCount, dateRange.startDate, dateRange.endDate, searchModal, router, onNext])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you want to go?'
        subtitle='Find the perfect place to stay'
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setLocation(value as CountrySelectValue)
        }}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you want to go?'
          subtitle="Make sure everyone's schedule is clear"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='More Information'
          subtitle="Find your perfect place to stay"
        />
        <Counter
          title='Guests'
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  )
}