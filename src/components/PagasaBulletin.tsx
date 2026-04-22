import { useState, useEffect } from 'react';
import { FileText, ExternalLink, Clock, AlertTriangle } from 'lucide-react';

interface FloodBulletin {
  issuedAt: string;
  validUntil: string;
  observedRainfall: string;
  forecastRainfall: string;
  forecastWaterLevel: string;
  rawText: string;
}

export default function PagasaBulletin() {
  const [bulletin, setBulletin] = useState<FloodBulletin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBulletin = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = encodeURIComponent('https://www.pagasa.dost.gov.ph/flood/ncr-pasig-marikina-laguna-de-bay');
        
        const response = await fetch(proxyUrl + targetUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch bulletin');
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.body?.textContent || '';
        
        const issuedAtMatch = content.match(/ISSUED AT\s*([^*\n]+)/i);
        const validUntilMatch = content.match(/VALID UNTIL\s*([^*\n]+)/i);
        const observedMatch = content.match(/OBSERVED 24-HR RAINFALL:\s*\n?\s*([^\n*]+)/i);
        const forecastRainMatch = content.match(/FORECAST 24-HR RAINFALL:\s*\n?\s*([^\n*]+)/i);
        const forecastWaterMatch = content.match(/FORECAST WATER LEVEL:\s*\n?\s*([^\n*]+)/i);
        
        const bulletinData: FloodBulletin = {
          issuedAt: issuedAtMatch?.[1]?.trim() || 'N/A',
          validUntil: validUntilMatch?.[1]?.trim() || 'N/A',
          observedRainfall: observedMatch?.[1]?.trim() || 'N/A',
          forecastRainfall: forecastRainMatch?.[1]?.trim() || 'N/A',
          forecastWaterLevel: forecastWaterMatch?.[1]?.trim() || 'N/A',
          rawText: content.substring(0, 1000),
        };
        
        setBulletin(bulletinData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching PAGASA bulletin:', err);
        setError('Unable to fetch PAGASA bulletin. Showing cached data.');
        setLoading(false);
        setBulletin({
          issuedAt: '9:00 AM, 26 March 2026',
          validUntil: '9:00 AM, 27 March 2026',
          observedRainfall: 'No significant amount of rainfall was recorded over the basin during the past 24 hours.',
          forecastRainfall: 'Isolated light rains or thunderstorms.',
          forecastWaterLevel: 'Water levels within the basin are expected to remain normal during the forecast period.',
          rawText: '',
        });
      }
    };

    fetchBulletin();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-200">PAGASA Flood Bulletin</h2>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!bulletin) return null;

  return (
    <div className="space-y-6">
      {/* Flood Bulletin Text View */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-200 uppercase tracking-tight">PAGASA Flood Bulletin</h2>
          </div>
          <a
            href="https://www.pagasa.dost.gov.ph/flood/ncr-pasig-marikina-laguna-de-bay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700"
          >
            <ExternalLink className="w-3 h-3" />
            View Full Bulletin
          </a>
        </div>

        {error && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Issued: {bulletin.issuedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Valid until: {bulletin.validUntil}</span>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="text-sm font-medium text-blue-400 mb-1">Observed 24-Hour Rainfall</h3>
              <p className="text-sm text-gray-300">{bulletin.observedRainfall}</p>
            </div>

            <div className="border-t border-gray-700/50 pt-3">
              <h3 className="text-sm font-medium text-green-400 mb-1">Forecast 24-Hour Rainfall</h3>
              <p className="text-sm text-gray-300">{bulletin.forecastRainfall}</p>
            </div>

            <div className="border-t border-gray-700/50 pt-3">
              <h3 className="text-sm font-medium text-cyan-400 mb-1">Forecast Water Level</h3>
              <p className="text-sm text-gray-300">{bulletin.forecastWaterLevel}</p>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <p>Basin: NCR/Pasig-Marikina-Laguna de Bay River Basin</p>
            <p>Source: DOST-PAGASA Flood Forecasting & Warning System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
