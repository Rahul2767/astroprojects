"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid, Paper, TextField, List, ListItem, ListItemButton, IconButton, Drawer } from "@mui/material";
import { Menu as MenuIcon } from '@mui/icons-material';
import { Chip } from "@mui/material";

interface KundliDisplayProps {
  html: string;
}

export default function KundliDisplay({ html }: KundliDisplayProps) {
  if (!html) return null;

  // Memoize the parsed response to avoid re-parsing on every render
  const { response, activePlanets } = useMemo(() => JSON.parse(html), [html]);

  // State to handle the selected category and search input
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false); // Handle sidebar on mobile

  // Get category names for sidebar
  const categories = Object.keys(response).filter(category => {
    // Check if the category has at least one subcategory and matches the search query
    return (
      Object.keys(response[category]).length > 0 && // Ensure there are subcategories
      category.replace(/[._]/g, " ").toLowerCase().includes(searchQuery.toLowerCase()) // Check if the search query matches the category name
    );
  });
  

  // Select the first category by default on initial render
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // Toggle sidebar for mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebar = (
    <Box
      sx={{
        width: { xs: '100%', md: '250px' },
        padding: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        maxHeight: '80vh', // Set a maximum height
        overflowY: 'auto', // Enable vertical scrolling when content overflows
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton
              onClick={() => {
                setSelectedCategory(category);
                handleDrawerToggle(); // Close sidebar on mobile after selecting
              }}
              sx={{
                backgroundColor: selectedCategory === category ? '#171717' : 'transparent',
                color: selectedCategory === category ? '#fff' : '#000',
                borderRadius: 1,
                padding: 1,
                marginBottom: 1,
                fontSize: '12px',
              }}
            >
              {category.replace(/[._]/g, " ").toUpperCase()}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '80vh' }}>
      {/* App bar for mobile view */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          padding: 2,
          backgroundColor: '#171717',
          color: 'white',
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Drawer for mobile view */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: '80%' },
        }}
      >
        {sidebar}
      </Drawer>

      {/* Sidebar for desktop */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {sidebar}
      </Box>

      {/* Main content area to display cards of the selected category */}
      <Box sx={{ flex: 1, padding: 2 }}>
        {selectedCategory && Object.keys(response[selectedCategory]).length ? (
          <Box sx={{ marginBottom: 2, backgroundColor: '#171717', padding: 2, borderRadius: 5 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}
            >
              {selectedCategory.replace(/[._]/g, " ").toUpperCase()}
            </Typography>
            <Grid container spacing={2}>
              {Object.keys(response[selectedCategory]).map((subCategory) => (
                <Grid item xs={12} sm={6} md={4} key={subCategory}>
                  <Card
                    variant="outlined"
                    sx={{
                      boxShadow: 3,
                      backgroundColor: activePlanets[0] === subCategory ? '#4F6F52' :
                        activePlanets[1] === subCategory ? '#86A789' :
                        activePlanets[2] === subCategory ? '#C3E2C2' : '#f5f5f5',
                      padding: { xs: 1, sm: 2, md: 3 }, // Responsive padding
                      margin: { xs: 1, sm: 2 }, // Responsive margin
                      maxWidth: '100%', // Ensure it doesn't exceed the screen width
                    }}
                  >
                    <CardContent sx={{ padding: { xs: '4px !important', sm: '6px !important' } }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: { xs: '11px', sm: '13px' },
                          textAlign: 'center',
                          marginBottom: { xs: 1, sm: 2 },
                        }}
                      >
                        {subCategory.replace(/_/g, " ").toUpperCase()} {
                          activePlanets[0] === subCategory ? '(Dasha)' :
                          activePlanets[1] === subCategory ? '(Bhukti)' :
                          activePlanets[2] === subCategory ? '(Antra)' : ''
                        }
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1}>
                        {Object.keys(response[selectedCategory][subCategory]).map((key) => {
                          const value = response[selectedCategory][subCategory][key];
                          return (
                            <Paper
                              key={key}
                              elevation={3}
                              sx={{
                                padding: 0.5,
                                marginBottom: 1,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' }
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: { xs: '10px', sm: '11px' },
                                  marginBottom: { xs: 0.5, sm: 0 },
                                }}
                              >
                                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong>
                              </Typography>
                              <Chip
                                label={value}
                                variant="outlined"
                                sx={{
                                  fontSize: { xs: '10px', sm: '12px' },
                                  backgroundColor: key === "conclusion"
                                    ? value === "Positive" ? "#c8e6c9" :
                                    value === "Negative" ? "#ffcdd2" : "#fff9c4"
                                    : key === "positivePoints" ? "#c8e6c9" :
                                    key === "negativePoints" ? "#ffcdd2" : "#fff9c4",
                                  color: "#000",
                                  marginLeft: { xs: 0, sm: 1 },
                                  marginTop: { xs: 0.5, sm: 0 },
                                }}
                              />
                            </Paper>
                          );
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography>No data available for the selected category.</Typography>
        )}
      </Box>
    </Box>
  );
}
