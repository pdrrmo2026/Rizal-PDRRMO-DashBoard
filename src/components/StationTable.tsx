import { useState } from 'react';
import { ChevronUp, ChevronDown, MapPin } from 'lucide-react';
import { StationData } from '../types';

interface StationTableProps {
  stationData: StationData[];
}

export default function StationTable({ stationData }: StationTableProps) {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...stationData].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.station.name.localeCompare(b.station.name);
        break;
      case 'waterLevel':
        comparison = a.waterLevel - b.waterLevel;
        break;
      case 'rainfall':
        comparison = (a.weather?.precipitation || 0) - (b.weather?.precipitation || 0);
        break;
      case 'temperature':
        comparison = (a.weather?.temperature || 0) - (b.weather?.temperature || 0);
        break;
      case 'humidity':
        comparison = (a.weather?.humidity || 0) - (b.weather?.humidity || 0);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">Critical</span>;
      case 'alarm':
        return <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">Alarm</span>;
      case 'alert':
        return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">Alert</span>;
      default:
        return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Normal</span>;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">All Stations Overview</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th 
                className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-gray-300"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Station <SortIcon field="name" />
                </div>
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Basin</th>
              <th 
                className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-gray-300"
                onClick={() => handleSort('waterLevel')}
              >
                <div className="flex items-center gap-1">
                  Water Level <SortIcon field="waterLevel" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-gray-300"
                onClick={() => handleSort('rainfall')}
              >
                <div className="flex items-center gap-1">
                  Rainfall <SortIcon field="rainfall" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-gray-300"
                onClick={() => handleSort('temperature')}
              >
                <div className="flex items-center gap-1">
                  Temp <SortIcon field="temperature" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-gray-300"
                onClick={() => handleSort('humidity')}
              >
                <div className="flex items-center gap-1">
                  Humidity <SortIcon field="humidity" />
                </div>
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((data, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-sm text-gray-200">{data.station.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs text-gray-400">{data.station.basin}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm font-medium ${
                    data.alertStatus.status === 'critical' ? 'text-red-400' :
                    data.alertStatus.status === 'alarm' ? 'text-orange-400' :
                    data.alertStatus.status === 'alert' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {data.waterLevel.toFixed(2)} m
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-300">{data.weather?.precipitation.toFixed(1) || '0.0'} mm</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-300">{data.weather?.temperature.toFixed(1) || '--'}°C</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-300">{data.weather?.humidity.toFixed(0) || '--'}%</span>
                </td>
                <td className="py-3 px-4">
                  {getStatusBadge(data.alertStatus.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
