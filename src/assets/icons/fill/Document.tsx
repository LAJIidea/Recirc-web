export default function DocumentIcon({ isActive }: { isActive: boolean }) {
  return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" rx="4"  strokeWidth="2" strokeLinejoin="round" className={`${isActive ? "stroke-primaryGreen" : "stroke-white"}`} />
          {/* <path d="M6 4C4.89543 4 4 4.89543 4 6V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V10L20 4H6Z" strokeWidth="2" strokeLinejoin="round" className={`${isActive ? "stroke-primaryGreen" : "stroke-white"}`} /> */}
          <path d="M20 4V10H26" strokeWidth="2" strokeLinejoin="round" className={`${isActive ? "stroke-primaryGreen" : "stroke-white"}`} />
          <path d="M10 18H22" strokeWidth="2" strokeLinecap="round" className={`${isActive ? "stroke-primaryGreen" : "stroke-white"}`} />
          <path d="M10 22H18" strokeWidth="2" strokeLinecap="round" className={`${isActive ? "stroke-primaryGreen" : "stroke-white"}`} />
      </svg>
  )
}
