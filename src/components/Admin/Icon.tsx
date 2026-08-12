import favicon from '@/../public/favicon.svg'
import Image from 'next/image'

export default function Icon() {
  return (
    <div>
      <Image src={favicon} className="dark:invert h-14" alt="devehope-logo" />
    </div>
  )
}
