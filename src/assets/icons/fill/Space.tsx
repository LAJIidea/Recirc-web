export default function SpaceIcon({ isActive }: { isActive: boolean }) {
  const fillColor = isActive ? "fill-primaryGreen" : "fill-white";
  const strokeColor = isActive ? "stroke-primaryGreen" : "stroke-white";

  return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className={`${fillColor}`} d="M16 2C9.37258 2 4 7.37258 4 14C4 20.6274 9.37258 26 16 26C22.6274 26 28 20.6274 28 14C28 7.37258 22.6274 2 16 2ZM16 24C10.4772 24 6 19.5228 6 14C6 8.47715 10.4772 4 16 4C21.5228 4 26 8.47715 26 14C26 19.5228 21.5228 24 16 24Z" />
          <circle cx="21" cy="11" r="2" className={fillColor} />
          <path className={fillColor} d="M16 6L18 14L14 14L16 6Z" />
          <path className={fillColor} d="M8 16L14 18L14 14L8 16Z" />
          <path className={fillColor} d="M22 16L26 14L22 12L22 16Z" />
          <path className={`${strokeColor}`} d="M16 2C7.71573 2 2 7.71573 2 16C2 24.2843 7.71573 30 16 30C24.2843 30 30 24.2843 30 16C30 7.71573 24.2843 2 16 2ZM16 28C8.8203 28 4 23.1797 4 16C4 8.8203 8.8203 4 16 4C23.1797 4 28 8.8203 28 16C28 23.1797 23.1797 28 16 28Z" strokeWidth="2" strokeLinejoin="round" />
      </svg>
  );
}