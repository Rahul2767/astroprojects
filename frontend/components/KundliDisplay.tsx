"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid, Paper, TextField, List, ListItem, ListItemButton, IconButton, Drawer, Chip } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface KundliDisplayProps {
  html: string;
}

function processInput(input) {
  // Convert input to an array if it's a single string
  const inputArr = Array.isArray(input) ? input : [input];

  const outputMap = new Map();

  inputArr.forEach(element => {
    const [number, flag] = element.split('-');

    if (number) {
      if (!outputMap.has(number)) {
        outputMap.set(number, flag || '');
      } else {
        const existingFlag = outputMap.get(number) || '';
        if (existingFlag !== flag && existingFlag !== '' && flag !== '') {
          outputMap.set(number, 'PN');
        }
      }
    }
  });

  const outputArr = Array.from(outputMap.entries()).map(([number, flag]) => {
    return flag ? `${number}-${flag}` : number.toString();
  });


  return outputArr
}

export default function KundliDisplay({ html }: KundliDisplayProps) {
  if (!html) return null;

  // Memoize the parsed response to avoid re-parsing on every render
  const { response, activePlanets, planetaryDetails } = useMemo(() => JSON.parse(html), [html]);

  // State to handle the selected category and search input
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false); // Handle sidebar on mobile

  // Get category names for sidebar
  const categories = Object.keys(response).filter((category) => {
    // Check if the category has at least one subcategory and matches the search query
    return (
      Object.keys(response[category]).length > 0 &&
      category.replace(/[._]/g, " ").toLowerCase().includes(searchQuery.toLowerCase())
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

  // Render the sidebar
  const sidebar = (
    <Box
      sx={{
        width: { xs: "100%", md: "250px" },
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        maxHeight: "80vh",
        overflowY: "auto",
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
                backgroundColor: selectedCategory === category ? "#171717" : "transparent",
                color: selectedCategory === category ? "#fff" : "#000",
                borderRadius: 1,
                padding: 1,
                marginBottom: 1,
                fontSize: "12px",
              }}
            >
              {category.replace(/[._]/g, " ").toUpperCase()}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Render the main content (cards)
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "80vh" }}>
      {/* App bar for mobile view */}
      <Box sx={{ display: { xs: "block", md: "none" }, padding: 2, backgroundColor: "#171717", color: "white" }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
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
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: "80%" },
        }}
      >
        {sidebar}
      </Drawer>

      {/* Sidebar for desktop */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>{sidebar}</Box>

      {/* Main content area to display cards of the selected category */}
      <Box sx={{ flex: 1, padding: 2 }}>
        {selectedCategory && Object.keys(response[selectedCategory]).length ? (
          <Box
            sx={{
              marginBottom: 2,
              backgroundColor: "#171717",
              padding: 2,
              borderRadius: 5,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#2b2b2b",
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                textTransform: "uppercase",
                fontSize: { xs: "16px", sm: "20px" },
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
                      backgroundColor:
                        activePlanets[0] === subCategory
                          ? "#C3E2C2"
                          : activePlanets[1] === subCategory
                            ? "#C3E2C2"
                            : activePlanets[2] === subCategory
                              ? "#C3E2C2"
                              : "linear-gradient(135deg, #ffffff, #f5f5f5)",
                      padding: { xs: 1, sm: 2, md: 3 },
                      margin: { xs: 1, sm: 2 },
                      borderRadius: "12px",
                      maxWidth: "100%",
                    }}
                  >
                    <CardContent sx={{ padding: { xs: "4px !important", sm: "8px !important" } }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "14px" },
                          textAlign: "center",
                          marginBottom: { xs: 1, sm: 2 },
                          color: "#333",
                        }}
                      >
                        {subCategory.replace(/_/g, " ").toUpperCase()}{" "}
                        {activePlanets[0] === subCategory
                          ? "(Dasha)"
                          : activePlanets[1] === subCategory
                            ? "(Bhukti)"
                            : activePlanets[2] === subCategory
                              ? "(Antra)"
                              : ""}
                      </Typography>


                      <Box display="flex" flexDirection="column" gap={1}>
                        {Object.keys(response[selectedCategory][subCategory]).map((key, index) => {
                          const planetData = Object.keys(planetaryDetails[selectedCategory][subCategory]).map(
                            (key) => {
                              const value = planetaryDetails[selectedCategory][subCategory][key];
                              return {
                                planet: key.split("_")[0],
                                value: value,
                              };
                            }
                          );
                          const planetValue = planetData[index]?.planet;
                          const planetCombination = processInput(planetData[index]?.value);

                          return (
                            <Paper
                              key={key}
                              elevation={3}
                              sx={{
                                padding: 0.5,
                                marginBottom: 1,
                                borderRadius: 1,
                                display: "flex",
                                alignItems: 'start',
                                justifyContent: "start",
                                flexDirection: { xs: "column", sm: "row" },
                                backgroundColor: "#fafafa",
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontSize: { xs: "12px", sm: "14px" },
                                    color: "#444",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {planetValue}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 0.5, marginLeft: 1 }}>
                                  {planetCombination.map((val, i) => (
                                    <Box
                                      key={i}
                                      sx={{
                                        background: val.includes("PN")
                                          ? "linear-gradient(45deg, #34C759 50%, #FF8A65 50%)"
                                          : val.includes("P")
                                            ? "#34C759"
                                            : val.includes("N")
                                              ? "#FF8A65"
                                              : "lightgrey",
                                        color: "#000",
                                        padding: 0,
                                        fontSize: '11px',
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                      }}
                                    >
                                      {val.includes("P") || val.includes("N") || val.includes("PN")
                                        ? val.split("-")[0]
                                        : val}
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            </Paper>
                          );
                        })}
                      </Box>
                    </CardContent>
                    <Box display='flex' justifyContent='space-evenly'>
                        {Object.keys(response[selectedCategory][subCategory]).map((key, index) => {
                          const value = response[selectedCategory][subCategory][key];
                          return (
                            <Typography
                              key={key}
                              variant="body1"
                              sx={{
                                fontSize: { xs: "10px", sm: "12px" },
                                marginBottom: { xs: 0.5, sm: 0 },
                                color: "#000",
                              }}
                            >
                              <Chip
                                variant="outlined"
                                label={value}
                                sx={{
                                  backgroundColor: key === 'positivePoints' ? '#34C759' :
                                    key === 'negativePoints' ? '#FF8A65' :
                                      key === 'conclusion' && value === 'Positive' ? '#34C759' :
                                        value === 'Negative' ? '#FF8A65' : 'lightgrey'
                                }}
                                icon={
                                  key === 'positivePoints' ? <AddCircleIcon color="success" /> :
                                    key === 'negativePoints' ? <RemoveCircleIcon color='error' /> :
                                      key === 'conclusion' ? null : undefined
                                }
                              />


                            </Typography>
                          );
                        })}
                      </Box>
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
