import React from 'react'

function Footer() {
  return (
   <>
   <footer className="bg-gray-800 text-white py-12 mt-20" >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
        
          <div className="flex flex-col mb-6 sm:mb-0">
            <h3 className="text-2xl font-bold text-yellow-500">Shoezz</h3>
            <p className="mt-2 text-gray-400">Step into style and comfort with our premium footwear collection. Quality and design, all in one place.</p>
          </div>

        
          <div className="flex flex-wrap space-x-12 mb-6 sm:mb-0">
            <div>
              <h4 className="font-semibold text-gray-300">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="" className="text-gray-400 hover:text-white">Shop</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="tel:+918590362596" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-300">Follow Us</h4>
              <div className="mt-4 flex space-x-4">
                <a href="" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/abdul__vajid_k/" target='blank' className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-600 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Shoezz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
   </>
  )
}

export default Footer