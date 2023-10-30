'use client'

import Button from '@/app/components/Button';
import Calendar from '@/app/components/Calendar';
import { Range } from 'react-date-range'

interface IListingReservation {
  price: number
  dateRange: Range;
  totalPrice: number
  onChangeDate: (range: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates?: Date[]
}

export default function ListingReservation({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}: IListingReservation) {
  return (
    <div
      className='
        bg-white rounded-xl
        border-[1px] border-neutral-200
        overflow-hidden
      '
    >
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>
          $ {price}
        </div>
        <div className='font-light text-neutral-600'>
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button
          disabled={disabled}
          label='Reserve'
          onClick={onSubmit}
        />
      </div>
      <div
        className='
          flex flex-row items-center justify-between
          p-4 font-semibold text-lg
        '
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}