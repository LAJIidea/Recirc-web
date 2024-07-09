export default function CodeIcon({ isActive }: { isActive: boolean }) {
  const strokeColor = isActive ? "stroke-primaryGreen" : "stroke-white";

  return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className={`${isActive ? "stroke-primaryGreen" : "stroke-white"}`} d="M6 4C4.89543 4 4 4.89543 4 6V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V6C28 4.89543 27.1046 4 26 4H6Z" strokeWidth="2" strokeLinejoin="round" />
          <path d="M13 20L9 16L13 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={strokeColor} />
          <path d="M19 12L23 16L19 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={strokeColor} />
          <path d="M17 10L15 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={strokeColor} />
      </svg>
  );
}