import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

const FilterComponent = ({ brands, categories, filters, setFilters }) => {
  const handleBrandFilters = (e) => {
    const filterSet = new Set(filters.brand);

    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }

    const filterArray = Array.from(filterSet);
    setFilters({ ...filters, brand: filterArray });
  };

  const handleCategoryFilters = (e) => {
    const filterSet = new Set(filters.category);

    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }

    const filterArray = Array.from(filterSet);
    setFilters({ ...filters, category: filterArray });
  };

  return (
    <>
      <Stack mt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="brand-filters"
            id="brand-filters"
          >
            <Typography>Brands</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <FormGroup>
              {brands?.map((brand) => (
                <motion.div
                  key={brand._id}
                  style={{ width: "fit-content" }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FormControlLabel
                    sx={{ ml: 1 }}
                    control={
                        <Checkbox
                        checked={filters?.brand?.includes(brand._id)}
                        onChange={handleBrandFilters}
                        value={brand._id || ""}
                      />
                    }
                    label={brand.name}
                  />
                </motion.div>
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Stack mt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="category-filters"
            id="category-filters"
          >
            <Typography>Category</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <FormGroup>
              {categories?.map((category) => (
                <motion.div
                  key={category._id}
                  style={{ width: "fit-content" }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FormControlLabel
                    sx={{ ml: 1 }}
                    control={
                        <Checkbox
                            checked={filters?.category?.includes(category._id)}
                        onChange={handleCategoryFilters}
                        value={category._id || ""}
                      />
                    }
                    label={category.name}
                  />
                </motion.div>
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
};

export default FilterComponent;