import { useState, useRef } from 'react'
import { getDatabase, ref as fireRef, onValue} from "firebase/database"

const HouseLights = (_lightsRef) => {
  const lightsRef = useRef(_lightsRef)
  const [isOn, setIsOn] = useState()

  onValue(lightsRef, (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    setIsOn(Boolean(data))
  })

  return (
    <div class="w-full md:w-1/2 xl:w-1/2 p-6">
      <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded-full p-5 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-600">House Lights</h5>
            <h3 class="font-bold text-3xl">{isOn}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseLights