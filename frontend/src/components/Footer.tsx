import { Link } from "react-router-dom";
import { FaGithub,FaHeart    } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";


export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand */}
          <div className="max-w-sm">
            <div className="text-2xl font-bold tracking-tight">
              Byte<span className="text-gray-500">Write</span>
            </div>

            <p className="text-gray-500 mt-3 leading-7 text-sm">
              A modern blogging platform built for developers,
              creators, and thinkers to share ideas beautifully.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-semibold mb-3 text-gray-900">
              Navigation
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link
                to="/"
                className="hover:text-black transition-colors"
              >
                Home
              </Link>

              <Link
                to="/blogs"
                className="hover:text-black transition-colors"
              >
                Blogs
              </Link>

              <Link
                to="/publish"
                className="hover:text-black transition-colors"
              >
                Write
              </Link>

              <Link
                to="/me"
                className="hover:text-black transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="font-semibold mb-3 text-gray-900">
              Connect
            </div>

            <div className="flex gap-4">

              <a
                href="https://github.com/yashAnjaliGupta/ByteWrite"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <FaGithub />

              </a>

              <a
                href="https://www.linkedin.com/in/yash-g-927b24118/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <CiLinkedin />
              </a>

              <a
                href="mailto:yashgupta@yashguptaiiit.in"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <CiMail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">

          <div>
            © {new Date().getFullYear()} ByteWrite. All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            Built with
            <FaHeart />
            by Yash Gupta
          </div>
        </div>
      </div>
    </footer>
  );
};