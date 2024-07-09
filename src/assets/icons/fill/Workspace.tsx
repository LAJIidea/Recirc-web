export default function WorkspaceIcon({ isActive }: { isActive: boolean }) {
  const fillColor = isActive ? "fill-primaryGreen" : "fill-white";
  const strokeColor = isActive ? "stroke-primaryGreen" : "stroke-white";

  return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className={`${fillColor}`} d="M4 26V22H28V26H4Z" />
          <path  d="M10 6H22V18H10V6Z" strokeWidth="2" strokeLinejoin="round" className={strokeColor} />
          <path className={`${fillColor}`} d="M4 26H28V30H4V26Z" />
          <path  d="M14 14H18V18H14V14Z" strokeWidth="2" strokeLinejoin="round" className={strokeColor} />
          <path className={`${strokeColor}`} d="M4 22H28V26H4V22Z" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 18H20V20H12V18Z" className={strokeColor} />
      </svg>
  );
}

