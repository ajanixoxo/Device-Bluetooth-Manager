import React, {useState, useEffect} from 'react'
import Bolt from '/images/bolt.png'
import DP from '/images/dp.png'
import Laptop from '/images/laptop.png'
import Phone from '/images/phone.png'
import Ring from '/images/ring.png'
import Setting from '/images/setting.png'
import Watch from '/images/watch.png'
import { Plus } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
function Home() {
    // AOS.init()

    const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  // Function to search for Bluetooth devices
  const searchBluetoothDevices = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }], // You can change this to other services if needed
        optionalServices: ['device_information'] // Add other services here if required
      });
      setDevices((prevDevices) => [...prevDevices, device]);
    } catch (error) {
      console.log('Error during device search:', error);
    }
  };

  // Function to connect to a Bluetooth device
  const connectToDevice = async (device) => {
    try {
      const server = await device.gatt.connect();
      setConnectedDevice(device);
      console.log('Connected to device:', device);
    } catch (error) {
      console.log('Connection failed:', error);
    }
  };

    return (
        <div>
            <nav className="flex justify-between p-4"
           >
                <div className="flex justify-center items-center gap-2">
                    <img src={DP} alt="" className="w-12 h-12" />
                    <div>
                        <h5 className="font-semibold">Timothy E.</h5>
                        <p className="text-[15px] font-light">Manage Your Device</p>
                    </div>
                </div>
                <img src={Setting} alt='' className="w-8 h-8" />
            </nav>
        <ul className="flex justify-between ml-3  w-full overflow-x-auto mt-7">
            <li className="bg-[#374b4c] px-2 rounded-xl py-1 text-[#577E83] ">Iphone  13</li>
            <li className="bg-[#374b4c] px-2 rounded-xl py-1 text-[#577E83] border-[#94C1C4] border-2 ">Samsung 22 Ultra</li>
            <li className="bg-[#374b4c] px-2 rounded-xl py-1 text-[#577E83] ">Watch</li>
            <li className="bg-[#374b4c] px-2 rounded-xl py-1 text-[#577E83]">L</li>
        </ul>
        <div className="flex justify-between items-center flex-col gap-5">
        <div className="flex justify-center items-center mt-10">
            <img src={Ring} alt='' className='w-[70%]' />
            <div className="absolute flex flex-col items-center g">
                <img src={Bolt} alt='' className='' />
                <div className="text-center">
                    <h5 className="text-[50px] font-bold !m-0 !p-0 relative">50<sup className="font-normal text-[15px] m-0 p-0 absolute top-6">%</sup></h5>
                    <p className="text-[#9BADB0] text-[12px]">charged</p>
                </div>
            </div>
        </div>
        <p className=" font-semibold text-[17px]"><span className="text-[#9F9454]">50 mins</span> left to fully charge</p>
        </div>
        <div className="flex flex-col justify-center p-2 gap-4 mt-10">
            <h1 className="font-bold">Connected Device <span className="bg-yellow-400 text-[#233E49] rounded-[50%] text-center w-8 h-8 px-1 text-[14px]">4</span></h1>
            <div className="flex justify-center gap-2 items-center">
                <div className="flex justify-between items-center flex-col gap-5 relative bg-[#0B191C] rounded-lg px-5 py-2 w-[33%]">
                    <img src={Phone} alt='' className="" />
                    <p className="font-semibold text-[13px] text-[#A7B0B2]">Phone</p>
                    <p className="absolute left-0 top-0 bg-[#94C1C4] text-[#233E49] rounded-[50%] text-center w-4 h-4 text-[10px]">2</p>
                </div>
                <div className="flex justify-between items-center flex-col gap-7 bg-[#0B191C] rounded-lg px-5 py-2 w-[33%]">
                    <img src={Laptop} alt='' className="" />
                    <p className="font-semibold text-[13px] text-[#A7B0B2]">Laptop</p>
                   
                </div>
                <div className="flex justify-between items-center flex-col gap-5 bg-[#0B191C] rounded-lg px-5 py-2 w-[33%]">
                    <img src={Watch} alt='' className="" />
                    <p className="font-semibold text-[13px] text-[#A7B0B2]">Watch</p>
                   
                </div>
            </div>
        </div>
        <div className="flex w-full items-center justify-center mt-7">
            <button onClick={searchBluetoothDevices} className="flex bg-[#78CDDE] w-[90%] text-center items-center justify-center py-4 rounded-3xl text-[#132D34] font-semibold">Connect New Device <Plus /></button>
        </div>
       
      {/* Display available Bluetooth devices */}
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            {device.name || 'Unnamed device'}{' '}
            <button onClick={() => connectToDevice(device)}>
              Connect
            </button>
          </li>
        ))}
      </ul>

      {/* Display connected device */}
      {connectedDevice && (
        <div>
          <h3>Connected to: {connectedDevice.name || 'Unnamed device'}</h3>
        </div>
      )}

        </div>
    )
}

export default Home