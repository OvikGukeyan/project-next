import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import React, { FC } from 'react'

interface Props {
    className?: string
    imageUrl: string
    size: 20 | 30 | 40
}
export const PizzaImage: FC<Props> = ({ className, imageUrl, size }) => {
    return (
        <div className={cn('flex items-center h-[500px] justify-center relative w-full lg:w-1/2 ', className)}>
            <Image
                width={300}
                height={300}
                src={imageUrl}
                alt='pizza'
                className={cn('relative left-2 top-2 tranzition-all z-10 duration-300', {
                    'w-[300px] h-auto': size === 20,
                    'w-[400px] h-auto': size === 30,
                    'w-[500px] h-auto': size === 40,
                })}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </div>
    )
}
