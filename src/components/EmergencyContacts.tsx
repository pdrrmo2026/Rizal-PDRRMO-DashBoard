import { Phone, ShieldAlert, Flame, Ambulance, Building2, MapPin } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  numbers: string[];
  icon: any;
  color: string;
  bgColor: string;
}

const EMERGENCY_CONTACTS: Contact[] = [
  {
    id: 'pdrrmo',
    name: 'Rizal PDRRMO',
    numbers: ['(02) 8620-2400 loc 4902', '0917-508-3605'],
    icon: ShieldAlert,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
  },
  {
    id: 'pnp',
    name: 'PNP Rizal',
    numbers: ['117', '(02) 8620-2400'],
    icon: ShieldAlert,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    id: 'bfp',
    name: 'Bureau of Fire Protection',
    numbers: ['117', '(02) 8620-2400'],
    icon: Flame,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
  {
    id: 'red-cross',
    name: 'Red Cross Rizal',
    numbers: ['143', '(02) 8620-2400'],
    icon: Ambulance,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20',
  },
  {
    id: 'ndrrmc',
    name: 'NDRRMC',
    numbers: ['(02) 8911-5061', '(02) 8912-2665'],
    icon: Building2,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
  },
  {
    id: 'dpwh',
    name: 'DPWH Rizal',
    numbers: ['165-02', '(02) 8620-2400'],
    icon: MapPin,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
  }
];

export default function EmergencyContacts() {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 sm:p-6 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-100">Emergency Contact Numbers</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Official hotlines and rescue units for Rizal Province</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EMERGENCY_CONTACTS.map((contact) => (
          <div key={contact.id} className="bg-gray-950/50 border border-gray-800/60 rounded-xl p-4 hover:border-amber-500/30 hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${contact.bgColor} flex items-center justify-center shrink-0`}>
                <contact.icon className={`w-5 h-5 ${contact.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 text-sm mb-2 group-hover:text-amber-400 transition-colors">{contact.name}</h3>
                <div className="space-y-1.5">
                  {contact.numbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <a href={`tel:${num.replace(/[^0-9]/g, '')}`} className="hover:text-amber-400 hover:underline transition-colors">{num}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800/50 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
        In case of extreme emergencies, please call the National Emergency Hotline 911 immediately.
      </div>
    </div>
  );
}
