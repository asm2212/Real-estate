import React from "react";

function CreateList() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">CreateList</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="223"
            minLength="12"
            required
          />
          <textarea
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <div>
                <p>regularPrice</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <div>
                <p>DiscountPrice</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  flex-1 gap-4">
            <p className="font-semibold">Images:
                <span className="font-normal text-gray-700 ml-2">The first image will be the cover max 5</span>
            </p>
           <div className="flex gap-4">
              <input  className="p-3 border border-gray-400 rounded w-full"
               type="file" id="images" accept="image/*" multiple />
               <button className="p-3 text-orange-600 border border-orange-600
                   rounded hover:shadow-lg disabled:opacity-80">
                Upload
               </button>
           </div>
           <button className="p-3 bg-orange-500 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
        >Create List</button>
        </div>
      
      </form>
    </main>
  );
}

export default CreateList;