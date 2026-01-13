import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '6282221016393';
  const message = encodeURIComponent('Halo, saya ingin bertanya tentang reservasi di Andelir Hotel.');
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-pulse-glow group"
      style={{ 
        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
      }}
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 fill-current"
      >
        <path d="M16.002 0C7.165 0 0 7.163 0 16c0 2.824.737 5.574 2.135 7.998L0 32l8.216-2.154A15.93 15.93 0 0 0 16.002 32C24.838 32 32 24.837 32 16S24.838 0 16.002 0zm0 29.052c-2.637 0-5.223-.707-7.472-2.041l-.535-.319-5.549 1.456 1.48-5.409-.35-.556A13.005 13.005 0 0 1 2.948 16c0-7.213 5.866-13.078 13.082-13.078S29.052 8.787 29.052 16s-5.837 13.052-13.05 13.052zm7.173-9.795c-.393-.197-2.325-1.147-2.685-1.277-.36-.131-.622-.196-.884.196s-1.015 1.277-1.244 1.54c-.229.262-.458.295-.851.098-.393-.196-1.66-.612-3.162-1.952-1.169-1.042-1.958-2.33-2.187-2.723-.229-.393-.024-.606.172-.802.177-.176.393-.458.589-.687.197-.229.263-.393.394-.655.131-.262.066-.491-.033-.687-.098-.197-.883-2.129-1.21-2.916-.319-.765-.643-.661-.884-.673-.229-.011-.491-.014-.753-.014s-.687.098-1.047.491c-.36.393-1.375 1.344-1.375 3.277s1.408 3.8 1.604 4.062c.196.262 2.77 4.228 6.71 5.929.937.404 1.669.645 2.24.826.941.299 1.798.257 2.474.156.755-.113 2.325-.95 2.653-1.868.328-.918.328-1.704.229-1.868-.098-.164-.36-.262-.753-.459z" />
      </svg>
      
      <span className="font-semibold whitespace-nowrap">WhatsApp Chat</span>
      
      {/* Ping Animation */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
