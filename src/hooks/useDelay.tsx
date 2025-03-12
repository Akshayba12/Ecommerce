import { useEffect, useState } from "react";

function  useDelay<T>(value: T, delay: number): T  {
  const [delayedValue, setDelayedValue] = useState(value)

   useEffect(() =>{
     const handler = setTimeout(() =>{
      setDelayedValue(value)
     }, delay)

     return () => {
       clearTimeout(handler)
     }

     
    }, [delay, value])
    return delayedValue
}

export default useDelay;