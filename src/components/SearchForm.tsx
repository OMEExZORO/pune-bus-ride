import { useState } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface Stop {
  id: string;
  name: string;
}

interface SearchFormProps {
  onSearch?: (from: string, to: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [fromStop, setFromStop] = useState<string>('');
  const [toStop, setToStop] = useState<string>('');

  // Mock data - replace with API call later
  const mockStops: Stop[] = [
    { id: '1', name: 'Pune Station' },
    { id: '2', name: 'Shivajinagar' },
    { id: '3', name: 'Camp' },
    { id: '4', name: 'Deccan Gymkhana' },
    { id: '5', name: 'JM Road' },
    { id: '6', name: 'FC Road' },
    { id: '7', name: 'Karve Road' },
    { id: '8', name: 'Warje' },
    { id: '9', name: 'Katraj' },
    { id: '10', name: 'Hadapsar' },
  ];

  const handleSearch = () => {
    if (fromStop && toStop && fromStop !== toStop) {
      onSearch?.(fromStop, toStop);
    }
  };

  const swapStops = () => {
    const temp = fromStop;
    setFromStop(toStop);
    setToStop(temp);
  };

  return (
    <Card className="p-6 shadow-card-hover border-0 bg-surface">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Find Your Bus</h2>
          <p className="text-muted-foreground">Search for buses between any two stops in Pune</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* From Stop */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              From
            </label>
            <Select value={fromStop} onValueChange={setFromStop}>
              <SelectTrigger className="bg-background border-border focus:ring-primary">
                <SelectValue placeholder="Select starting point" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-card-hover">
                {mockStops.map((stop) => (
                  <SelectItem key={stop.id} value={stop.id} className="focus:bg-surface-hover">
                    {stop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapStops}
              className="rounded-full border-border hover:bg-surface-hover"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To Stop */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-destructive" />
              To
            </label>
            <Select value={toStop} onValueChange={setToStop}>
              <SelectTrigger className="bg-background border-border focus:ring-primary">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-card-hover">
                {mockStops.map((stop) => (
                  <SelectItem key={stop.id} value={stop.id} className="focus:bg-surface-hover">
                    {stop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleSearch}
            disabled={!fromStop || !toStop || fromStop === toStop}
            className="px-8 py-3 bg-gradient-primary text-white font-medium shadow-button hover:shadow-card-hover transition-all duration-200"
          >
            <Search className="h-4 w-4 mr-2" />
            Find Buses
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchForm;