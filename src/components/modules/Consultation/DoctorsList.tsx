"use client"

import { getDoctors } from '@/src/app/(commonLayout)/consultation/_actions'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const DoctorsList = () => {

    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getDoctors(),
    })

    console.log(data)

    // const { data: nonPrefetchedData } = useQuery({
    //     queryKey: ["doctors-non-prefetched"],
    //     queryFn: () => getDoctors(),
    // });

    // console.log(nonPrefetchedData)

    return (
        <div>{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.data.map((doctor: any) => {
                <div key={doctor.id} >{doctor.name}</div>
            })
        }</div>
    )
}

export default DoctorsList