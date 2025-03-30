export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="150" height="50"> {/* Increase size */}
      <rect x="10" y="20" width="50" height="40" rx="5" fill="#3B82F6" />
      <rect x="25" y="15" width="50" height="40" rx="5" fill="#60A5FA" />
      <rect x="40" y="10" width="50" height="40" rx="5" fill="#93C5FD" />
      
      <path d="M220,40 a25,25 0 1,0 -5,15" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M212,55 l-5,-8 l10,-3z" fill="#3B82F6" />
      
      <path d="M150,25 h30 a5,5 0 0,1 5,5 v20 a5,5 0 0,1 -5,5 h-30 l-10,-15 z" fill="#FBBF24" />
      <circle cx="175" cy="32" r="3" fill="white" />
      
      <text x="112" y="55" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="26" fill="#1E3A8A">Second</text>
      <text x="185" y="55" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="26" fill="#1E3A8A">Hand</text>
      <text x="150" y="70" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="#4B5563" textAnchor="middle">MARKETPLACE</text>
      
      <text x="165" y="42" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="white">$</text>
    </svg>
  );
}