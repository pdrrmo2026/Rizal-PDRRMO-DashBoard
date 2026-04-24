import { Phone } from 'lucide-react';

export default function EmergencyContacts() {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
        <Phone className="w-4 h-4 text-red-400" />
        Emergency Hotlines
      </h3>
      
      <div className="relative rounded-lg overflow-hidden border border-gray-700 bg-white shadow-xl max-w-md transition-transform duration-300 hover:scale-[1.02]">
        <img 
          src="/emergency_contact_numbers.jpg" 
          alt="Rizal Province Emergency Hotlines" 
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
}
