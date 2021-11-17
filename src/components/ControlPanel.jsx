import HouseSecurity from './cards/HouseSecurity'
import FrontDoor from './cards/FrontDoor'
import HouseLights from './cards/HouseLights'
import Temperature from './cards/Temperature'

import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref as fireRef } from "firebase/database"
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
  const [isLightsOn, lightLoading, lightError] = useObjectVal(fireRef(db, 'LED'))
  const [isDoorClosed, doorLoading, doorError] = useObjectVal(fireRef(db, 'DOOR'))
  const [isAlarmOn, alarmLoading, alarmError] = useObjectVal(fireRef(db, 'ALARM'))
  const [temp, tempLoading, tempError] = useObjectVal(fireRef(db, 'TEMP'))

  const toggle = (name, val) => {
    set(fireRef(db, name), val ? 0 : 1)
  }

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
                    <button
                      onClick={() => toggle('LED', isLightsOn)}
                      className="material-icons bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                    >
                      power_settings_new
                    </button>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h5 class="font-bold uppercase text-gray-600">House Lights</h5>
                    <h3 class="font-bold text-3xl">{isLightsOn ? 'ON' : 'OFF'}</h3>
                  </div>
                </div>
              </div>
            </div>


            <div class="w-full md:w-1/2 xl:w-1/2 p-6">
              <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <button
                      onClick={() => toggle('DOOR', isDoorClosed)}
                      className="material-icons bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                    >
                      power_settings_new
                    </button>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h5 class="font-bold uppercase text-gray-600">Front Door</h5>
                    <h3 class="font-bold text-3xl">{isDoorClosed ? 'CLOSED' : 'OPEN'}</h3>
                  </div>
                </div>
              </div>
            </div>


            <div class="w-full md:w-1/2 xl:w-1/2 p-6">
              <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <button
                      onClick={() => toggle('ALARM', isAlarmOn)}
                      className="material-icons bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                    >
                      power_settings_new
                    </button>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h5 class="font-bold uppercase text-gray-600">ALARM CLOCK</h5>
                    <h3 class="font-bold text-3xl">{isAlarmOn ? 'ACTIVATED' : 'DEACTIVATED'}</h3>
                  </div>
                </div>
              </div>
            </div>


            <div class="w-full md:w-1/2 xl:w-1/2 p-6">
              <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-1 text-right md:text-center">
                    <h5 class="font-bold uppercase text-gray-600">Temperature</h5>
                    <h3 class="font-bold text-3xl">{temp} °C</h3>
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
