'use client';

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  const onRent = useCallback(() => {
    if(!currentUser) {
      return loginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          '
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='
            py-4
            xs:px-4
            sm:px-4
            md:py-1
            md:px-2
            md:border-[1px]
          md:border-neutral-200
            flex flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            sm:border-transparent
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  label='My trips'
                  onClick={() => router.push('/trips')}
                  />
                <MenuItem
                  label='My favorites'
                  onClick={() => {}}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => {}}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => {}}
                />
                <MenuItem
                  label='Airbnb my home'
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem
                  label='Logout'
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label='Login'
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label='Sign up'
                  onClick={registerModal.onOpen}
                />
              </>

            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu