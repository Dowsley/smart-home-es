import HouseSecurity from './cards/HouseSecurity'
import FrontDoor from './cards/FrontDoor'
import HouseLights from './cards/HouseLights'
import Temperature from './cards/Temperature'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref as fireRef } from "firebase/database"
import { useObjectVal } from 'react-firebase-hooks/database'

const app = initializeApp({
  apiKey: "AIzaSyAqiJJBwtYz-L05Ua18XWk23dRH_j1jMnA",
  authDomain: "sd-smart-room-cd813.firebaseapp.com",
  databaseURL: "https://sd-smart-room-cd813-default-rtdb.firebaseio.com",
  projectId: "sd-smart-room-cd813",
  storageBucket: "sd-smart-room-cd813.appspot.com",
  messagingSenderId: "246210837967",
  appId: "1:246210837967:web:d7859e67078f17b0b4e6ba",
  measurementId: "G-ZPYMRC5PZ2"
})

const db = getDatabase(app)

const ControlPanel = () => {
  const [isLightsOn, loading, error] = useObjectVal(fireRef(db, 'LED'))

  return (
    <>
      <div class="flex flex-col md:flex-row">

        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

          <div class="bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h3 class="font-bold pl-2">Smart Home</h3>
          </div>

          <div class="flex flex-wrap">

            <div class="w-full md:w-1/2 xl:w-1/2 p-6">
              <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h5 class="font-bold uppercase text-gray-600">House Lights</h5>
                    <h3 class="font-bold text-3xl">{isLightsOn}</h3>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default ControlPanel
