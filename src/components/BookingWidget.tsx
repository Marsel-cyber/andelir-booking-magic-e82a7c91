import { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  return (
    <div className="bg-background rounded-2xl shadow-2xl p-6 lg:p-8 w-full max-w-5xl mx-auto -mt-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Check-in
          </label>
          <Input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border-border focus:ring-primary"
          />
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Check-out
          </label>
          <Input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border-border focus:ring-primary"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Tamu
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih tamu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Dewasa</SelectItem>
              <SelectItem value="2">2 Dewasa</SelectItem>
              <SelectItem value="3">3 Dewasa</SelectItem>
              <SelectItem value="4">4 Dewasa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Tipe Kamar</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kamar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deluxe">Deluxe Room</SelectItem>
              <SelectItem value="suite">Suite Room</SelectItem>
              <SelectItem value="presidential">Presidential Suite</SelectItem>
              <SelectItem value="family">Family Room</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button className="bg-primary hover:bg-primary-dark text-primary-foreground h-10 gap-2">
          <Search className="w-4 h-4" />
          Cari Kamar
        </Button>
      </div>
    </div>
  );
};

export default BookingWidget;
