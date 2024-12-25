"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatKundliData, fetchKundli } from "@/lib/kundli";
import KundliDisplay from "@/components/KundliDisplay";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import { AppBar, Toolbar, Typography } from '@mui/material';


export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    place: ""
  });
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [kundliHtml, setKundliHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!coordinates) {
        throw new Error("Please select a valid place from the suggestions");
      }

      // Format data for kundli API
      const kundliData = formatKundliData(formData, coordinates);

      // Fetch kundli
      const kundliResponse = await fetchKundli(kundliData);
      if (!kundliResponse) {
        throw new Error("Failed to generate kundli");
      }

      setKundliHtml(kundliResponse);
      toast({
        title: "Success",
        description: "Kundli generated successfully",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#171717',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              color: '#fff',
              fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem' }, // Responsive font size for title
            }}
          >
            Nadi Events Analyzer
          </Typography>
        </Toolbar>

        {/* Footer Section */}
        <Typography
          variant="body2"
          component="div"
          sx={{
            color: '#aaa',
            fontSize: '16px', // Responsive font size for footer
            textAlign: 'center',
          }}
        >
          Made with ❤️ by Rahul Dhiman
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{
            paddingBottom: { xs: '6px', sm: '8px' },
            color: '#aaa',
            fontSize: '11px', // Responsive font size for footer
            textAlign: 'center',
          }}
        >
          Contact: Rahuldhiman3855@gmail.com
        </Typography>
      </AppBar>



      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <Card className="p-2 d-flex">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} gap={2}>

              <Box flex={1} minWidth={{ xs: "100%", sm: "48%" }}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full"
                />
              </Box>

              <Box flex={1} minWidth={{ xs: "100%", sm: "48%" }}>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                  className="w-full"
                />
              </Box>

              <Box flex={1} minWidth={{ xs: "100%", sm: "48%" }}>
                <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-700">
                  Time of Birth
                </label>
                <Input
                  id="timeOfBirth"
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                  required
                  className="w-full"
                />
              </Box>

              <Box flex={1} minWidth={{ xs: "100%", sm: "48%" }}>
                <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                  Place
                </label>
                <PlaceAutocomplete
                  value={formData.place}
                  onChange={(value) => setFormData({ ...formData, place: value })}
                  onSelect={(place) => {
                    setCoordinates({
                      lat: parseFloat(place.lat),
                      lng: parseFloat(place.lon)
                    });
                  }}
                />
              </Box>

              <Box width="200px" mt={1}>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Generating please wait..." : kundliHtml ? 'Re-Generate' : "Generate"}
                </Button>
              </Box>
            </Box>
          </form>

        </Card>

        {kundliHtml && <KundliDisplay html={kundliHtml} />}
      </div>
    </>
  );
}