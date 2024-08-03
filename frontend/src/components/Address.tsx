import { ChangeEvent, useState } from "react";
import useAddAddress from "../hooks/useAddAddress";

const Address = () => {
  const [address, setAddress] = useState({
    streetName: "",
    pincode: "",
    localityName: "",
    city: "",
    state: "",
  });

  const { loading, error, addAddress } = useAddAddress();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleUserSubmit = async () => {
    console.log(address);
    await addAddress(address);
  };

  return (
    <div className="mx-14 bg-black  mt-10 border-2 border-blue-400 rounded-lg">
      <div className="p-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="streetName"
            className="mt-1 block text-black w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Street Name *"
            value={address.streetName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="pincode"
            className="mt-1 block w-1/2 text-black rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Pincode *"
            value={address.pincode}
            onChange={handleChange}
          />
        </div>
        <div className="my-6 text-black flex gap-4">
          <input
            type="text"
            name="localityName"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Locality Name *"
            value={address.localityName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="City *"
            value={address.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="State *"
            value={address.state}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button
            className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"
            onClick={handleUserSubmit}
            disabled={loading}
          >
            Update
          </button>
          {error ? <p className="text-red-500 pt-4 ">{error}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Address;
