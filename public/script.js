const routineApiUrl = document.querySelector('meta[name="routine-api-url"]')?.content || "/api/routine";

const products = [
  {
    id: "revitalift-serum",
    brand: "L'Oréal Paris",
    name: "Revitalift 1.5% Pure Hyaluronic Acid Serum",
    category: "Serum",
    type: "Serums",
    price: "$29.99",
    image: "https://images.openbeautyfacts.org/images/products/007/124/937/7512/front_en.15.400.jpg",
    description: "A hydrating serum formulated with 1.5% pure hyaluronic acid to help plump the look of skin and reduce the appearance of fine lines.",
  },
  {
    id: "micellar-water",
    brand: "CeraVe",
    name: "CeraVe Hydrating Facial Cleanser",
    category: "Cleanser",
    type: "Cleansers",
    price: "$15.99",
    image: "https://images.openbeautyfacts.org/images/products/360/600/053/7675/front_en.3.400.jpg",
    description: "A fragrance-free, non-foaming facial cleanser with ceramides and hyaluronic acid that removes dirt and makeup while supporting the skin barrier.",
  },
  {
    id: "bright-reveal",
    brand: "L'Oréal Paris",
    name: "Bright Reveal Dark Spot Exfoliant",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "An exfoliating treatment designed to help improve skin tone and visibly reduce dark spots and uneven texture.",
  },
  {
    id: "uv-fluid",
    brand: "CeraVe",
    name: "CeraVe Hydrating Mineral Sunscreen SPF 50",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$19.99",
    image: "https://images.openbeautyfacts.org/images/products/360/600/051/4959/front_en.5.400.jpg",
    description: "A mineral broad-spectrum facial sunscreen with SPF 50, ceramides, and niacinamide that hydrates while helping protect skin from the sun.",
  },
  {
    id: "revitalift-cream",
    brand: "L'Oréal Paris",
    name: "Revitalift Anti-Wrinkle Firming Cream",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$26.99",
    image: "https://images.openbeautyfacts.org/images/products/360/052/345/6147/front_en.3.400.jpg",
    description: "A smoothing moisturizer that helps firm the feel of skin and visibly soften the appearance of wrinkles.",
  },
  {
    id: "glycolic-cleanser",
    brand: "CeraVe",
    name: "CeraVe Resurfacing Retinol Serum",
    category: "Treatment",
    type: "Serums",
    price: "$21.99",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=85",
    description: "A resurfacing serum with encapsulated retinol, ceramides, and niacinamide to help refine the look of pores and uneven skin texture.",
  },
  {
    id: "elvive-shampoo",
    brand: "L'Oréal Paris",
    name: "Elvive Hyaluron Moisture Shampoo",
    category: "Hair Shampoo",
    price: "$7.99",
    area: "Haircare",
    image: "https://images.unsplash.com/photo-1626015365107-9f6e7c0d45a0?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating shampoo for cleansing dry hair while helping it feel smoother and easier to manage.",
  },
  {
    id: "elvive-conditioner",
    brand: "L'Oréal Paris",
    name: "Elvive Hyaluron Moisture Conditioner",
    category: "Hair Conditioner",
    price: "$7.99",
    area: "Haircare",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A moisture-focused conditioner to soften lengths after shampooing and help reduce tangles.",
  },
  {
    id: "elvive-leave-in",
    brand: "L'Oréal Paris",
    name: "Elvive Total Repair 5 Protein Recharge Leave-In",
    category: "Hair Treatment",
    price: "$9.99",
    area: "Haircare",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A leave-in care treatment for damaged-feeling hair; apply as directed before styling.",
  },
  {
    id: "prime-lab-primer",
    brand: "L'Oréal Paris",
    name: "Prime Lab Up to 24H Pore Minimizer Primer",
    category: "Makeup Primer",
    price: "$15.99",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=85",
    description: "A smoothing primer that prepares skin for makeup and helps create an even-looking finish.",
  },
  {
    id: "infallible-foundation",
    brand: "Maybelline New York",
    name: "Fit Me Matte + Poreless Foundation",
    category: "Foundation",
    type: "Foundations",
    price: "$8.99",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/360/053/132/4483/front_nl.13.400.jpg",
    description: "A lightweight liquid foundation for normal to oily skin that provides a natural matte finish and helps minimize the appearance of pores.",
  },
  {
    id: "lash-paradise-mascara",
    brand: "Maybelline New York",
    name: "Lash Sensational Sky High Mascara",
    category: "Mascara",
    type: "Mascara",
    price: "$12.99",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/000/003/016/6967/front_nl.10.400.jpg",
    description: "A lengthening mascara with a flexible brush designed to lift, define, and extend lashes.",
  },
  {
    id: "neutrogena-hydro-boost",
    brand: "Neutrogena",
    name: "Hydro Boost Water Gel",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$21.99",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=85",
    description: "A lightweight gel moisturizer with hyaluronic acid that quenches dry skin and keeps it hydrated throughout the day.",
  },
  {
    id: "neutrogena-ultra-sheer",
    brand: "Neutrogena",
    name: "Ultra Sheer Dry-Touch Sunscreen SPF 55",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$12.99",
    image: "https://images.openbeautyfacts.org/images/products/006/260/095/3674/front_en.7.400.jpg",
    description: "A fast-absorbing broad-spectrum sunscreen with a non-greasy, dry-touch finish for everyday sun protection.",
  },
  {
    id: "lrp-toleriane-cleanser",
    brand: "La Roche-Posay",
    name: "Toleriane Hydrating Gentle Cleanser",
    category: "Cleanser",
    type: "Cleansers",
    price: "$16.99",
    image: "https://images.openbeautyfacts.org/images/products/333/787/554/5778/front_en.9.400.jpg",
    description: "A gentle cream cleanser with ceramides and niacinamide that removes impurities while respecting sensitive skin.",
  },
  {
    id: "lrp-anthelios",
    brand: "La Roche-Posay",
    name: "Anthelios Melt-In Milk Sunscreen SPF 60",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$35.99",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=85",
    description: "A fast-absorbing broad-spectrum SPF 60 sunscreen with a velvety finish for face and body.",
  },
  {
    id: "ordinary-niacinamide",
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1% Serum",
    category: "Serum",
    type: "Serums",
    price: "$6.50",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "A high-strength vitamin and mineral serum that helps reduce the look of blemishes and balance visible shine.",
  },
  {
    id: "ordinary-glycolic-toner",
    brand: "The Ordinary",
    name: "Glycolic Acid 7% Exfoliating Toner",
    category: "Toner",
    type: "Toners",
    price: "$9.00",
    image: "https://images.openbeautyfacts.org/images/products/076/991/519/0977/front_en.21.400.jpg",
    description: "An exfoliating toning solution with 7% glycolic acid to improve skin radiance and visible clarity.",
  },
  {
    id: "nyx-foundation",
    brand: "NYX Professional Makeup",
    name: "Can't Stop Won't Stop Full Coverage Foundation",
    category: "Foundation",
    type: "Foundations",
    price: "$17.99",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/080/089/715/7210/front_en.5.400.jpg",
    description: "A long-wearing, full-coverage liquid foundation with a natural matte finish that lasts all day.",
  },
  {
    id: "nyx-butter-gloss",
    brand: "NYX Professional Makeup",
    name: "Butter Gloss",
    category: "Lip Gloss",
    type: "Lip products",
    price: "$5.99",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/080/089/781/8586/front_nl.6.400.jpg",
    description: "A buttery-soft lip gloss that delivers sheer-to-medium color with a non-sticky, hydrating shine.",
  },
  {
    id: "olay-regenerist",
    brand: "Olay",
    name: "Regenerist Micro-Sculpting Cream",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$28.99",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=85",
    description: "A rich anti-aging moisturizer with niacinamide and peptides that hydrates and firms the look of skin.",
  },
  {
    id: "olay-eye-cream",
    brand: "Olay",
    name: "Eyes Ultimate Eye Cream",
    category: "Eye cream",
    type: "Eye creams",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A brightening eye cream that targets the look of dark circles, fine lines, and puffiness.",
  },
  {
    id: "garnier-micellar",
    brand: "Garnier",
    name: "SkinActive Micellar Cleansing Water",
    category: "Cleanser",
    type: "Cleansers",
    price: "$8.99",
    image: "https://images.openbeautyfacts.org/images/products/060/308/407/8028/front_en.3.400.jpg",
    description: "A no-rinse micellar water that gently lifts away makeup and impurities in one step.",
  },
  {
    id: "garnier-sheet-mask",
    brand: "Garnier",
    name: "SkinActive Moisture Bomb Sheet Mask",
    category: "Mask",
    type: "Masks",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating sheet mask soaked in hyaluronic acid serum for an instant boost of moisture.",
  },
  {
    id: "elf-camo-concealer",
    brand: "e.l.f. Cosmetics",
    name: "Camo Concealer",
    category: "Concealer",
    type: "Concealers",
    price: "$7.00",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/060/933/284/8238/front_nl.5.400.jpg",
    description: "A full-coverage, crease-resistant concealer that covers dark circles and blemishes with a matte finish.",
  },
  {
    id: "elf-holy-hydration",
    brand: "e.l.f. Cosmetics",
    name: "Holy Hydration! Face Cream",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$13.00",
    image: "https://images.openbeautyfacts.org/images/products/060/933/282/8292/front_nl.8.400.jpg",
    description: "A lightweight daily face cream with hyaluronic acid and peptides for soft, hydrated skin.",
  },

  // L'Oréal Paris — full skincare + makeup line
  {
    id: "loreal-pure-clay-cleanser",
    brand: "L'Oréal Paris",
    name: "Pure-Clay Detox & Brighten Cleanser",
    category: "Cleanser",
    type: "Cleansers",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=400&q=85",
    description: "A daily clay cleanser with charcoal that cleanses pores and helps brighten dull-looking skin.",
  },
  {
    id: "loreal-uv-defender",
    brand: "L'Oréal Paris",
    name: "Revitalift UV Defender Invisible Fluid SPF 50",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$26.99",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=85",
    description: "A lightweight daily facial sunscreen with broad-spectrum SPF 50 and an invisible, non-greasy finish.",
  },
  {
    id: "loreal-glycolic-toner",
    brand: "L'Oréal Paris",
    name: "Revitalift 5% Glycolic Acid Toner",
    category: "Toner",
    type: "Toners",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A resurfacing toner with 5% glycolic acid and aloe to smooth texture and even skin tone.",
  },
  {
    id: "loreal-eye-treatment",
    brand: "L'Oréal Paris",
    name: "Revitalift Triple Power Eye Treatment",
    category: "Eye cream",
    type: "Eye creams",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "An eye cream with pro-retinol and hyaluronic acid to reduce the look of wrinkles and under-eye puffiness.",
  },
  {
    id: "loreal-pure-clay-mask",
    brand: "L'Oréal Paris",
    name: "Pure-Clay Purify & Mattify Face Mask",
    category: "Mask",
    type: "Masks",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A clay mask with charcoal that draws out impurities and helps mattify oily, shiny skin.",
  },
  {
    id: "loreal-infallible-foundation",
    brand: "L'Oréal Paris",
    name: "Infallible Fresh Wear 24H Foundation",
    category: "Foundation",
    type: "Foundations",
    price: "$15.99",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=85",
    description: "A long-wearing, breathable liquid foundation with medium-to-full coverage and a fresh, natural finish.",
  },
  {
    id: "loreal-full-wear-concealer",
    brand: "L'Oréal Paris",
    name: "Infallible Full Wear Concealer",
    category: "Concealer",
    type: "Concealers",
    price: "$13.99",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/007/124/938/2417/front_fr.3.400.jpg",
    description: "A full-coverage, waterproof concealer that covers dark circles and blemishes and shapes the face.",
  },
  {
    id: "loreal-lash-paradise",
    brand: "L'Oréal Paris",
    name: "Voluminous Lash Paradise Mascara",
    category: "Mascara",
    type: "Mascara",
    price: "$12.99",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3a67b5?auto=format&fit=crop&w=400&q=85",
    description: "A volumizing mascara with a soft wavy brush that delivers full, feathery, intensely black lashes.",
  },
  {
    id: "loreal-colour-riche-lipstick",
    brand: "L'Oréal Paris",
    name: "Colour Riche Satin Lipstick",
    category: "Lipstick",
    type: "Lip products",
    price: "$9.99",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=85",
    description: "A creamy satin lipstick enriched with argan oil for rich, comfortable, long-lasting color.",
  },

  // CeraVe — skincare
  {
    id: "cerave-daily-lotion",
    brand: "CeraVe",
    name: "Daily Moisturizing Lotion",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$16.99",
    image: "https://images.openbeautyfacts.org/images/products/360/600/053/7743/front_en.55.400.jpg",
    description: "A lightweight, fragrance-free lotion with ceramides and hyaluronic acid for all-day hydration.",
  },
  {
    id: "cerave-hydrating-toner",
    brand: "CeraVe",
    name: "Hydrating Toner",
    category: "Toner",
    type: "Toners",
    price: "$13.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "An alcohol-free toner with ceramides and niacinamide that soothes and balances skin after cleansing.",
  },
  {
    id: "cerave-sa-treatment",
    brand: "CeraVe",
    name: "SA Smoothing Exfoliating Treatment",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A salicylic acid treatment with ceramides that gently exfoliates rough, bumpy skin.",
  },
  {
    id: "cerave-eye-repair",
    brand: "CeraVe",
    name: "Eye Repair Cream",
    category: "Eye cream",
    type: "Eye creams",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A fragrance-free eye cream with ceramides and niacinamide to brighten and hydrate the eye area.",
  },

  // Maybelline New York — makeup
  {
    id: "maybelline-age-rewind",
    brand: "Maybelline New York",
    name: "Instant Age Rewind Eraser Concealer",
    category: "Concealer",
    type: "Concealers",
    price: "$9.99",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/360/053/073/3842/front_en.3.400.jpg",
    description: "A medium-to-full coverage concealer with a cushion applicator that erases dark circles and fine lines.",
  },
  {
    id: "maybelline-superstay-ink",
    brand: "Maybelline New York",
    name: "SuperStay Matte Ink Liquid Lipstick",
    category: "Liquid Lipstick",
    type: "Lip products",
    price: "$9.49",
    area: "Makeup",
    image: "https://images.openbeautyfacts.org/images/products/004/155/449/6925/front_en.4.400.jpg",
    description: "A long-wearing liquid lipstick with an intense matte finish that lasts up to 16 hours.",
  },

  // Neutrogena — skincare
  {
    id: "neutrogena-acne-wash",
    brand: "Neutrogena",
    name: "Oil-Free Acne Wash",
    category: "Cleanser",
    type: "Cleansers",
    price: "$9.49",
    image: "https://images.openbeautyfacts.org/images/products/088/777/711/1111/front_xx.7.400.jpg",
    description: "A salicylic acid face wash that cleanses pores and helps treat and prevent breakouts.",
  },
  {
    id: "neutrogena-rapid-wrinkle",
    brand: "Neutrogena",
    name: "Rapid Wrinkle Repair Retinol Serum",
    category: "Serum",
    type: "Serums",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "An accelerated retinol serum that visibly smooths wrinkles and brightens skin tone.",
  },
  {
    id: "neutrogena-alcohol-free-toner",
    brand: "Neutrogena",
    name: "Alcohol-Free Toner",
    category: "Toner",
    type: "Toners",
    price: "$8.99",
    image: "https://images.openbeautyfacts.org/images/products/007/050/102/7004/front_en.4.400.jpg",
    description: "A gentle, alcohol-free toner that removes residue and refreshes skin without over-drying.",
  },
  {
    id: "neutrogena-pore-refining",
    brand: "Neutrogena",
    name: "Pore Refining Exfoliating Toner",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$10.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "An exfoliating toner with alpha and beta hydroxy acids that refines the look of pores.",
  },
  {
    id: "neutrogena-hydro-eye",
    brand: "Neutrogena",
    name: "Hydro Boost Eye Gel-Cream",
    category: "Eye cream",
    type: "Eye creams",
    price: "$17.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating eye gel-cream with hyaluronic acid that cools and refreshes the under-eye area.",
  },
  {
    id: "neutrogena-hydro-mask",
    brand: "Neutrogena",
    name: "Hydro Boost Hydrating Face Mask",
    category: "Mask",
    type: "Masks",
    price: "$3.49",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A single-use sheet mask soaked in hyaluronic acid serum for an instant hydration boost.",
  },

  // La Roche-Posay — skincare
  {
    id: "lrp-double-repair",
    brand: "La Roche-Posay",
    name: "Toleriane Double Repair Face Moisturizer",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$21.99",
    image: "https://images.openbeautyfacts.org/images/products/333/787/554/5846/front_en.3.400.jpg",
    description: "An oil-free moisturizer with ceramides and niacinamide that restores the skin barrier for 48 hours.",
  },
  {
    id: "lrp-hyalu-b5",
    brand: "La Roche-Posay",
    name: "Hyalu B5 Pure Hyaluronic Acid Serum",
    category: "Serum",
    type: "Serums",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "A plumping serum with two types of hyaluronic acid and vitamin B5 to hydrate and repair skin.",
  },
  {
    id: "lrp-serozinc",
    brand: "La Roche-Posay",
    name: "Serozinc Mattifying Toner",
    category: "Toner",
    type: "Toners",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A lightweight toning mist with zinc that soothes and mattifies oily, blemish-prone skin.",
  },
  {
    id: "lrp-effaclar-gel",
    brand: "La Roche-Posay",
    name: "Effaclar Micro-Peeling Purifying Gel",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A purifying gel with salicylic and glycolic acids that gently exfoliates and unclogs pores.",
  },
  {
    id: "lrp-hyalu-eye",
    brand: "La Roche-Posay",
    name: "Hyalu B5 Eye Serum",
    category: "Eye cream",
    type: "Eye creams",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "An eye serum with hyaluronic acid and caffeine to hydrate and reduce the look of puffiness.",
  },
  {
    id: "lrp-effaclar-mask",
    brand: "La Roche-Posay",
    name: "Effaclar Clarifying Clay Mask",
    category: "Mask",
    type: "Masks",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A dual-clay mask that absorbs excess oil and refines the appearance of pores.",
  },

  // The Ordinary — skincare
  {
    id: "ordinary-nmf-moisturizer",
    brand: "The Ordinary",
    name: "Natural Moisturizing Factors + HA",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$8.90",
    image: "https://images.openbeautyfacts.org/images/products/076/991/519/0731/front_en.3.400.jpg",
    description: "A non-greasy moisturizer with amino acids and hyaluronic acid for everyday surface hydration.",
  },
  {
    id: "ordinary-squalane-cleanser",
    brand: "The Ordinary",
    name: "Squalane Cleanser",
    category: "Cleanser",
    type: "Cleansers",
    price: "$9.90",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=400&q=85",
    description: "A gentle balm-to-oil cleanser with squalane that melts away makeup while conditioning skin.",
  },
  {
    id: "ordinary-aha-bha-peel",
    brand: "The Ordinary",
    name: "AHA 30% + BHA 2% Peeling Solution",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$9.50",
    image: "https://images.openbeautyfacts.org/images/products/076/991/519/5606/front_en.6.400.jpg",
    description: "A 10-minute exfoliating facial with alpha and beta hydroxy acids for brighter, smoother skin.",
  },
  {
    id: "ordinary-caffeine-eye",
    brand: "The Ordinary",
    name: "Caffeine Solution 5% + EGCG",
    category: "Eye cream",
    type: "Eye creams",
    price: "$8.90",
    image: "https://images.openbeautyfacts.org/images/products/076/991/519/0670/front_en.21.400.jpg",
    description: "A lightweight eye serum with caffeine to reduce the look of puffiness and dark circles.",
  },
  {
    id: "ordinary-salicylic-mask",
    brand: "The Ordinary",
    name: "Salicylic Acid 2% Masque",
    category: "Mask",
    type: "Masks",
    price: "$12.90",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A rinse-off clay masque with 2% salicylic acid and charcoal to decongest and clarify skin.",
  },
  {
    id: "ordinary-mineral-spf",
    brand: "The Ordinary",
    name: "Mineral UV Filters SPF 30 with Antioxidants",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$13.90",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=85",
    description: "A mineral sunscreen with SPF 30 and antioxidants that protects skin with a hydrating finish.",
  },

  // NYX Professional Makeup — makeup
  {
    id: "nyx-hd-concealer",
    brand: "NYX Professional Makeup",
    name: "HD Studio Photogenic Concealer Wand",
    category: "Concealer",
    type: "Concealers",
    price: "$6.00",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=85",
    description: "A creamy, buildable concealer wand that covers blemishes and dark circles with a natural finish.",
  },
  {
    id: "nyx-liftscara",
    brand: "NYX Professional Makeup",
    name: "On The Rise Volume Liftscara",
    category: "Mascara",
    type: "Mascara",
    price: "$12.00",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3a67b5?auto=format&fit=crop&w=400&q=85",
    description: "A volumizing mascara with a lifting brush that adds dramatic volume and curl to lashes.",
  },

  // Olay — skincare
  {
    id: "olay-cream-cleanser",
    brand: "Olay",
    name: "Regenerist Cream Cleanser",
    category: "Cleanser",
    type: "Cleansers",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating cream cleanser with amino-peptides that cleanses without stripping moisture.",
  },
  {
    id: "olay-vitc-serum",
    brand: "Olay",
    name: "Regenerist Vitamin C + Peptide 24 Serum",
    category: "Serum",
    type: "Serums",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "A brightening serum with vitamin C and peptides that evens tone and boosts radiance.",
  },
  {
    id: "olay-whip-spf",
    brand: "Olay",
    name: "Regenerist Whip SPF 25 Moisturizer",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$28.99",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=85",
    description: "A whipped daily moisturizer with SPF 25 that absorbs quickly for a weightless, matte feel.",
  },
  {
    id: "olay-clay-mask",
    brand: "Olay",
    name: "Regenerist Detoxifying Clay Mask",
    category: "Mask",
    type: "Masks",
    price: "$13.99",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "A charcoal clay mask that draws out impurities and leaves skin feeling clean and renewed.",
  },
  {
    id: "olay-detox-scrub",
    brand: "Olay",
    name: "Regenerist Detox & Hydrate Facial Scrub",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A charcoal facial scrub that exfoliates and purifies while keeping skin hydrated.",
  },
  {
    id: "olay-essence-toner",
    brand: "Olay",
    name: "Regenerist Hydrating Essence Toner",
    category: "Toner",
    type: "Toners",
    price: "$17.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating essence toner with niacinamide that preps skin and boosts moisture before serums.",
  },

  // Garnier — skincare
  {
    id: "garnier-moisture-gel",
    brand: "Garnier",
    name: "SkinActive Moisture Rescue Gel Cream",
    category: "Moisturizer",
    type: "Moisturizers",
    price: "$8.49",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=85",
    description: "A fast-absorbing gel moisturizer with hyaluronic acid for lightweight all-day hydration.",
  },
  {
    id: "garnier-vitc-serum",
    brand: "Garnier",
    name: "Vitamin C Brightening Serum",
    category: "Serum",
    type: "Serums",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "A brightening serum with vitamin C and niacinamide to visibly reduce dark spots and dullness.",
  },
  {
    id: "garnier-ambre-solaire",
    brand: "Garnier",
    name: "Ambre Solaire Super UV Face Sunscreen SPF 50",
    category: "Sunscreen",
    type: "Sunscreens",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating facial sunscreen with broad-spectrum SPF 50 and a lightweight, invisible finish.",
  },
  {
    id: "garnier-brighter-toner",
    brand: "Garnier",
    name: "SkinActive Clearly Brighter Toner",
    category: "Toner",
    type: "Toners",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A brightening toner with vitamin C and antioxidants that refreshes and evens skin tone.",
  },
  {
    id: "garnier-brighter-scrub",
    brand: "Garnier",
    name: "SkinActive Clearly Brighter Exfoliating Scrub",
    category: "Exfoliant",
    type: "Exfoliants",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A daily scrub with vitamin C that gently exfoliates to reveal smoother, brighter skin.",
  },
  {
    id: "garnier-eye-roller",
    brand: "Garnier",
    name: "SkinActive Clearly Brighter Eye Roller",
    category: "Eye cream",
    type: "Eye creams",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A cooling eye roller with caffeine and vitamin C to brighten and de-puff the under-eye area.",
  },

  // e.l.f. Cosmetics — makeup + skincare
  {
    id: "elf-flawless-foundation",
    brand: "e.l.f. Cosmetics",
    name: "Flawless Finish Foundation",
    category: "Foundation",
    type: "Foundations",
    price: "$8.00",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=85",
    description: "A lightweight, semi-matte liquid foundation with buildable medium coverage for a flawless finish.",
  },
  {
    id: "elf-lash-n-roll",
    brand: "e.l.f. Cosmetics",
    name: "Lash 'N Roll Mascara",
    category: "Mascara",
    type: "Mascara",
    price: "$8.00",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3a67b5?auto=format&fit=crop&w=400&q=85",
    description: "A lifting and curling mascara with a hourglass brush that volumizes lashes from root to tip.",
  },
  {
    id: "elf-glossy-lip-stain",
    brand: "e.l.f. Cosmetics",
    name: "Glossy Lip Stain",
    category: "Lip Stain",
    type: "Lip products",
    price: "$4.00",
    area: "Makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=85",
    description: "A long-lasting lip stain with a glossy finish that delivers buildable, hydrating color.",
  },
  {
    id: "elf-hydration-serum",
    brand: "e.l.f. Cosmetics",
    name: "Holy Hydration! Daily Hydration Serum",
    category: "Serum",
    type: "Serums",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "A lightweight serum with hyaluronic acid and niacinamide for a daily boost of hydration.",
  },
  {
    id: "elf-pure-skin-cleanser",
    brand: "e.l.f. Cosmetics",
    name: "Pure Skin Cleanser",
    category: "Cleanser",
    type: "Cleansers",
    price: "$8.00",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=400&q=85",
    description: "A gentle gel cleanser with blemish-fighting ingredients that cleanses without over-drying.",
  },
  {
    id: "elf-hydration-mask",
    brand: "e.l.f. Cosmetics",
    name: "Holy Hydration! Face Mask",
    category: "Mask",
    type: "Masks",
    price: "$10.00",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=85",
    description: "An overnight gel mask with hyaluronic acid and peptides for deeply hydrated, soft skin.",
  },
  {
    id: "elf-illuminating-eye",
    brand: "e.l.f. Cosmetics",
    name: "Holy Hydration! Illuminating Eye Cream",
    category: "Eye cream",
    type: "Eye creams",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "A brightening eye cream with caffeine and hyaluronic acid that hydrates and illuminates.",
  },
];

const brandSites = {
  "L'Oréal Paris": "https://www.lorealparisusa.com/",
  CeraVe: "https://www.cerave.com/",
  "Maybelline New York": "https://www.maybelline.com/",
  Neutrogena: "https://www.neutrogena.com/",
  "La Roche-Posay": "https://www.laroche-posay.us/",
  "The Ordinary": "https://theordinary.com/",
  "NYX Professional Makeup": "https://www.nyxcosmetics.com/",
  Olay: "https://www.olay.com/",
  Garnier: "https://www.garnierusa.com/",
  "e.l.f. Cosmetics": "https://www.elfcosmetics.com/",
};

// Categories the AI assistant can discover products from via web search.
const discoveryCategories = [
  "Cleansers", "Moisturizers", "Serums", "Sunscreens", "Toners",
  "Exfoliants", "Eye creams", "Masks", "Foundations", "Concealers",
  "Mascara", "Lip products",
];

const productTranslations = {
  es: {
    "revitalift-serum": ["Sérum Revitalift Ácido Hialurónico Puro 1.5%", "Sérum", "Un sérum hidratante formulado con ácido hialurónico puro al 1.5% para ayudar a rellenar la piel y reducir líneas finas."],
    "micellar-water": ["Limpiador Facial Hidratante CeraVe", "Limpiador", "Un limpiador suave y sin perfume para eliminar suciedad y maquillaje respetando la barrera de la piel."],
    "bright-reveal": ["Bright Reveal Exfoliante para Manchas Oscuras", "Exfoliante", "Un tratamiento exfoliante que ayuda a mejorar el tono de la piel y reduce visiblemente manchas oscuras y textura irregular."],
    "uv-fluid": ["Protector Solar Mineral Hidratante CeraVe SPF 50", "Protector solar", "Un protector solar mineral hidratante de amplio espectro para la piel facial."],
    "revitalift-cream": ["Crema Reafirmante Antarrugas Revitalift", "Hidratante", "Una crema suavizante que ayuda a reafirmar la piel y reduce visiblemente la apariencia de arrugas."],
    "glycolic-cleanser": ["Sérum Resurfacing con Retinol CeraVe", "Tratamiento", "Un sérum con retinol encapsulado que ayuda a mejorar la apariencia de textura y poros."],
    "elvive-shampoo": ["Champú Hidratante Elvive Hyaluron", "Champú capilar", "Un champú hidratante que limpia el cabello seco y ayuda a dejarlo suave y manejable."],
    "elvive-conditioner": ["Acondicionador Hidratante Elvive Hyaluron", "Acondicionador capilar", "Un acondicionador que suaviza las puntas después del champú y ayuda a desenredar."],
    "elvive-leave-in": ["Tratamiento Sin Aclarado Elvive Total Repair 5", "Tratamiento capilar", "Un cuidado sin aclarado para cabello con aspecto dañado; usar según las indicaciones antes del peinado."],
    "prime-lab-primer": ["Primer Prime Lab Minimizador de Poros Hasta 24H", "Primer de maquillaje", "Un primer que alisa la piel, la prepara para el maquillaje y ayuda a crear un acabado uniforme."],
    "infallible-foundation": ["Base Fit Me Matte + Poreless de Maybelline", "Base de maquillaje", "Una base de cobertura natural diseñada para matificar y mejorar la apariencia de los poros."],
    "lash-paradise-mascara": ["Máscara Lash Sensational Sky High de Maybelline", "Máscara", "Una máscara diseñada para alargar y elevar las pestañas con una definición flexible."],
  },
  zh: {
    "revitalift-serum": ["Revitalift 1.5% 纯玻尿酸精华", "精华液", "含有1.5%纯玻尿酸的保湿精华，可帮助饱满肌肤、减少细纹外观。"],
    "micellar-water": ["CeraVe 保湿洁面乳", "洁面", "温和无香洁面乳，可清洁污垢和彩妆，同时呵护肌肤屏障。"],
    "bright-reveal": ["亮白焕采暗斑去角质产品", "去角质", "有助于改善肤色、淡化暗斑并提升肌肤质感的焕肤护理。"],
    "uv-fluid": ["CeraVe 保湿矿物防晒 SPF 50", "防晒", "适用于面部的保湿广谱矿物防晒产品。"],
    "revitalift-cream": ["Revitalift 抗皱紧致面霜", "保湿霜", "帮助提升肌肤紧致感，并淡化皱纹外观的平滑型保湿霜。"],
    "glycolic-cleanser": ["CeraVe 焕肤视黄醇精华", "护理", "含包裹式视黄醇的精华，可改善肌肤纹理和毛孔外观。"],
    "elvive-shampoo": ["Elvive 玻尿酸保湿洗发水", "洗发水", "保湿洗发水，清洁干燥发丝并令头发更柔顺、易于打理。"],
    "elvive-conditioner": ["Elvive 玻尿酸保湿护发素", "护发素", "用于洗发后柔顺发丝并帮助减少打结的护发素。"],
    "elvive-leave-in": ["Elvive Total Repair 5 免洗修护乳", "护发护理", "适用于受损发质的免洗护理，造型前按说明使用。"],
    "prime-lab-primer": ["Prime Lab 24小时控毛孔妆前乳", "妆前乳", "柔滑妆前乳，为上妆做准备并帮助打造均匀妆感。"],
    "infallible-foundation": ["Maybelline Fit Me Matte + Poreless 粉底", "粉底", "自然遮瑕粉底，可控油并改善毛孔外观。"],
    "lash-paradise-mascara": ["Maybelline Lash Sensational Sky High 睫毛膏", "睫毛膏", "用于拉长、提拉并灵活分明睫毛的睫毛膏。"],
  },
  pt: {
    "revitalift-serum": ["Sérum Revitalift Ácido Hialurônico Puro 1.5%", "Sérum", "Um sérum hidratante com 1.5% de ácido hialurônico puro para ajudar a preencher a pele e suavizar linhas finas."],
    "micellar-water": ["Limpador Facial Hidratante CeraVe", "Limpeza", "Um limpador suave e sem fragrância para remover sujeira e maquiagem respeitando a barreira da pele."],
    "bright-reveal": ["Bright Reveal Esfoliante para Manchas", "Esfoliante", "Um tratamento esfoliante que ajuda a uniformizar o tom da pele e reduzir visivelmente manchas escuras e textura irregular."],
    "uv-fluid": ["Protetor Solar Mineral Hidratante CeraVe FPS 50", "Protetor solar", "Um protetor solar mineral hidratante de amplo espectro para o rosto."],
    "revitalift-cream": ["Creme Firmador Antirrugas Revitalift", "Hidratante", "Um creme suavizante que ajuda a firmar a pele e reduzir visivelmente a aparência de rugas."],
    "glycolic-cleanser": ["Sérum Resurfacing Retinol CeraVe", "Tratamento", "Um sérum com retinol encapsulado que ajuda a melhorar a aparência da textura e dos poros."],
    "elvive-shampoo": ["Shampoo Hidratante Elvive Hyaluron", "Shampoo capilar", "Um shampoo hidratante que limpa cabelos ressecados e ajuda a deixá-los macios e fáceis de cuidar."],
    "elvive-conditioner": ["Condicionador Hidratante Elvive Hyaluron", "Condicionador capilar", "Um condicionador que suaviza os fios depois do shampoo e ajuda a desembaraçar."],
    "elvive-leave-in": ["Tratamento Sem Enxágue Elvive Total Repair 5", "Tratamento capilar", "Um cuidado sem enxágue para cabelos com aspecto danificado; aplique como indicado antes de modelar."],
    "prime-lab-primer": ["Primer Prime Lab Minimizador de Poros Até 24H", "Primer de maquiagem", "Um primer alisante que prepara a pele para maquiagem e ajuda a criar um acabamento uniforme."],
    "infallible-foundation": ["Base Fit Me Matte + Poreless Maybelline", "Base", "Uma base de cobertura natural criada para matificar e melhorar a aparência dos poros."],
    "lash-paradise-mascara": ["Máscara Lash Sensational Sky High Maybelline", "Máscara", "Uma máscara criada para alongar e levantar os cílios com definição flexível."],
  },
};

function localizedProduct(product) {
  if (currentLanguage === "en") return product;
  const translated = productTranslations[currentLanguage]?.[product.id];
  return translated ? { ...product, name: translated[0], category: translated[1], description: translated[2] } : product;
}

const selected = new Set();
const grid = document.querySelector("#product-grid");
const selectedList = document.querySelector("#selected-list");
const selectionCount = document.querySelector("#selection-count");
const generateButton = document.querySelector("#generate-button");
const chat = document.querySelector("#chat");
const chatMessages = document.querySelector("#chat-messages");
const closeChat = document.querySelector("#close-chat");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatSend = document.querySelector("#chat-send");
const clearSelectionButton = document.querySelector("#clear-selection");
const productDialog = document.querySelector("#product-dialog");
const dialogName = document.querySelector("#dialog-name");
const dialogCategory = document.querySelector("#dialog-category");
const dialogDescription = document.querySelector("#dialog-description");
const dialogClose = document.querySelector("#dialog-close");
const productSearch = document.querySelector("#product-search");
const categoryFilters = document.querySelector("#category-filters");
const noResults = document.querySelector("#no-results");
const languageSelect = document.querySelector("#language-select");
const floatingChatToggle = document.querySelector("#floating-chat-toggle");
const floatingChatPanel = document.querySelector("#floating-chat-panel");
const floatingChatClose = document.querySelector("#floating-chat-close");
const floatingChatForm = document.querySelector("#floating-chat-form");
const floatingChatInput = document.querySelector("#floating-chat-input");
const floatingChatMessages = document.querySelector("#floating-chat-messages");
const floatingChatRefresh = document.querySelector("#floating-chat-refresh");
let conversation = [];
let floatingConversation = [];
let activeCategory = "All";
let activeBrand = "All";
const flippedProducts = new Set();

const storageKey = "loreal-routine-selected-products";
const languageStorageKey = "loreal-routine-language";
let currentLanguage = localStorage.getItem(languageStorageKey) || "en";

const translations = {
  en: {
    eyebrow: "BEAUTY ROUTINE", heroTitle: "Build your perfect routine",
    intro: "Choose your skincare, haircare, or makeup products, and we'll organize them into a routine in the right order.",
    step: "STEP 1 OF 2", chooseProducts: "Choose your products", clearAll: "Clear all",
    searchProducts: "Search products", searchPlaceholder: "Search by name or keyword",
    noResults: "No matching products found.", selectedProducts: "Your selected products",
    generateRoutine: "Generate my routine", yourPlan: "YOUR PERSONALIZED PLAN", yourRoutine: "Your routine",
    followUpLabel: "Ask a follow-up question", followUpPlaceholder: "Ask a follow-up...",
    send: "Send", beautyLabel: "LOREAL BEAUTY", assistantTitle: "Beauty Routine Assistant",
    assistantGreeting: "Hi! Ask me about skincare, haircare, makeup, or your selected routine.",
    assistantLabel: "Ask the beauty assistant", assistantPlaceholder: "Ask a question...",
    chat: "Chat", refreshChat: "Refresh chat", sources: "Sources", thinking: "Thinking...", generating: "Generating...", shopProduct: "Shop Product",
    discoverLabel: "Discover products by category", discoverFind: "Find products",
    selectedCount: (count) => `${count} selected`, noSelected: "No products selected",
    senderYou: "You", senderAssistant: "Assistant",
  },
  es: {
    eyebrow: "RUTINA DE BELLEZA", heroTitle: "Crea tu rutina perfecta",
    intro: "Elige tus productos de cuidado facial, capilar o maquillaje y los organizaremos en el orden correcto.",
    step: "PASO 1 DE 2", chooseProducts: "Elige tus productos", clearAll: "Borrar todo",
    searchProducts: "Buscar productos", searchPlaceholder: "Busca por nombre o palabra clave",
    noResults: "No se encontraron productos.", selectedProducts: "Tus productos seleccionados",
    generateRoutine: "Crear mi rutina", yourPlan: "TU PLAN PERSONALIZADO", yourRoutine: "Tu rutina",
    followUpLabel: "Haz una pregunta de seguimiento", followUpPlaceholder: "Haz una pregunta...",
    send: "Enviar", beautyLabel: "LOREAL BEAUTY", assistantTitle: "Asistente de rutinas de belleza",
    assistantGreeting: "¡Hola! Pregúntame sobre el cuidado de la piel, el cabello, el maquillaje o tu rutina seleccionada.",
    assistantLabel: "Pregunta al asistente de belleza", assistantPlaceholder: "Haz una pregunta...",
    chat: "Chat", refreshChat: "Actualizar chat", sources: "Fuentes", thinking: "Pensando...", generating: "Creando...", shopProduct: "Ver producto",
    discoverLabel: "Descubre productos por categoría", discoverFind: "Buscar productos",
    selectedCount: (count) => `${count} seleccionados`, noSelected: "No hay productos seleccionados",
    senderYou: "Tú", senderAssistant: "Asistente",
  },
  zh: {
    eyebrow: "美妆流程", heroTitle: "打造您的专属美妆流程",
    intro: "选择护肤、护发或彩妆产品，我们会将它们整理成正确的日常使用顺序。",
    step: "第 1 步，共 2 步", chooseProducts: "选择您的产品", clearAll: "全部清除",
    searchProducts: "搜索产品", searchPlaceholder: "按名称或关键词搜索",
    noResults: "未找到匹配的产品。", selectedProducts: "您选择的产品",
    generateRoutine: "生成我的护肤流程", yourPlan: "您的个性化方案", yourRoutine: "您的护肤流程",
    followUpLabel: "提出后续问题", followUpPlaceholder: "提出问题...",
    send: "发送", beautyLabel: "LOREAL BEAUTY", assistantTitle: "美妆流程助手",
    assistantGreeting: "你好！可以询问护肤、护发、化妆或您选择的流程。",
    assistantLabel: "询问美妆助手", assistantPlaceholder: "请输入问题...",
    chat: "聊天", refreshChat: "刷新聊天", sources: "来源", thinking: "正在思考...", generating: "正在生成...", shopProduct: "查看产品",
    discoverLabel: "按类别发现产品", discoverFind: "查找产品",
    selectedCount: (count) => `已选择 ${count} 件`, noSelected: "未选择任何产品",
    senderYou: "你", senderAssistant: "助手",
  },
  pt: {
    eyebrow: "ROTINA DE BELEZA", heroTitle: "Crie sua rotina perfeita",
    intro: "Escolha produtos de cuidados com a pele, cabelos ou maquiagem, e nós os organizaremos na ordem correta.",
    step: "ETAPA 1 DE 2", chooseProducts: "Escolha seus produtos", clearAll: "Limpar tudo",
    searchProducts: "Pesquisar produtos", searchPlaceholder: "Pesquise por nome ou palavra-chave",
    noResults: "Nenhum produto correspondente.", selectedProducts: "Produtos selecionados",
    generateRoutine: "Gerar minha rotina", yourPlan: "SEU PLANO PERSONALIZADO", yourRoutine: "Sua rotina",
    followUpLabel: "Faça uma pergunta complementar", followUpPlaceholder: "Faça uma pergunta...",
    send: "Enviar", beautyLabel: "LOREAL BEAUTY", assistantTitle: "Assistente de rotinas de beleza",
    assistantGreeting: "Olá! Pergunte sobre cuidados com a pele, cabelo, maquiagem ou sua rotina selecionada.",
    assistantLabel: "Pergunte ao assistente de beleza", assistantPlaceholder: "Faça uma pergunta...",
    chat: "Chat", refreshChat: "Atualizar chat", sources: "Fontes", thinking: "Pensando...", generating: "Gerando...", shopProduct: "Ver produto",
    discoverLabel: "Descubra produtos por categoria", discoverFind: "Buscar produtos",
    selectedCount: (count) => `${count} selecionados`, noSelected: "Nenhum produto selecionado",
    senderYou: "Você", senderAssistant: "Assistente",
  },
};

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = "ltr";
  languageSelect.value = currentLanguage;
  localStorage.setItem(languageStorageKey, currentLanguage);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) element.textContent = translations[currentLanguage][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = translations[currentLanguage][key];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", translations[currentLanguage][key]);
    element.title = translations[currentLanguage][key];
  });
  renderCategoryFilters();
  renderProducts();
  renderSelection();
}

languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));

function isSafeWebUrl(value) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function appendFormattedMessage(element, text, allowedUrls = []) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).filter(Boolean);
  element.textContent = "";
  const allowed = new Set(allowedUrls.filter(isSafeWebUrl));

  parts.forEach((part) => {
    const isBold = part.startsWith("**") && part.endsWith("**");
    if (isBold) {
      const strong = document.createElement("strong");
      strong.textContent = part.slice(2, -2);
      element.appendChild(strong);
      return;
    }

    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link && allowed.has(link[2])) {
      const anchor = document.createElement("a");
      anchor.className = "inline-product-link";
      anchor.href = link[2];
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = link[1];
      element.appendChild(anchor);
      return;
    }

    const textNode = document.createElement("span");
    textNode.textContent = link ? link[1] : part;
    element.appendChild(textNode);
  });
}

function appendProductRecommendations(container, recommendations = []) {
  const validProducts = recommendations
    .filter((product) => product && typeof product.name === "string" && isSafeWebUrl(product.url))
    .map((product) => {
      // Enrich local-catalog items (image, price, localized name) by id; web-discovered items use their own data.
      const match = product.id ? products.find((item) => item.id === product.id) : null;
      const localized = match ? localizedProduct(match) : null;
      return {
        brand: product.brand || match?.brand || "",
        name: localized?.name || product.name,
        category: localized?.category || "",
        price: product.price || match?.price || "",
        image: match?.image || product.image || "",
        description: product.description || localized?.description || "",
        url: product.url,
      };
    });
  if (validProducts.length === 0) return;

  const section = document.createElement("section");
  section.className = "recommended-products";
  const heading = document.createElement("h3");
  heading.textContent = { en: "Recommended products", es: "Productos recomendados", zh: "推荐产品", pt: "Produtos recomendados" }[currentLanguage];
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "recommended-products-grid";
  validProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "recommended-product-card";

    if (product.image) {
      const image = document.createElement("img");
      image.className = "recommended-product-image";
      image.src = product.image;
      image.alt = "";
      image.loading = "lazy";
      card.appendChild(image);
    }

    if (product.brand) {
      const brand = document.createElement("p");
      brand.className = "recommended-product-brand";
      brand.textContent = product.brand;
      card.appendChild(brand);
    }

    const title = document.createElement("h4");
    const titleLink = document.createElement("a");
    titleLink.href = product.url;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = product.name;
    title.appendChild(titleLink);
    card.appendChild(title);

    if (product.category || product.price) {
      const meta = document.createElement("p");
      meta.className = "recommended-product-meta";
      const category = document.createElement("span");
      category.className = "recommended-product-category";
      category.textContent = product.category;
      const price = document.createElement("span");
      price.className = "recommended-product-price";
      price.textContent = product.price;
      meta.append(category, price);
      card.appendChild(meta);
    }

    if (typeof product.description === "string" && product.description.trim()) {
      const description = document.createElement("p");
      description.className = "recommended-product-description";
      description.textContent = product.description;
      card.appendChild(description);
    }

    const shopLink = document.createElement("a");
    shopLink.className = "recommended-product-action";
    shopLink.href = product.url;
    shopLink.target = "_blank";
    shopLink.rel = "noopener noreferrer";
    shopLink.textContent = translations[currentLanguage].shopProduct;
    card.appendChild(shopLink);
    grid.appendChild(card);
  });
  section.appendChild(grid);
  container.appendChild(section);
}

function appendChatResponse(routine, citations = [], recommendations = []) {
  const turn = document.createElement("div");
  turn.className = "chat-turn assistant";
  const sender = document.createElement("span");
  sender.className = "chat-sender";
  sender.textContent = translations[currentLanguage].senderAssistant;
  const message = document.createElement("p");
  message.className = "chat-message";
  appendFormattedMessage(message, routine, recommendations.map((product) => product.url));
  turn.append(sender, message);
  chatMessages.appendChild(turn);
  appendProductRecommendations(chatMessages, recommendations);

  if (citations.length > 0) {
    const sources = document.createElement("div");
    sources.className = "chat-citations";

    const heading = document.createElement("p");
    heading.className = "chat-citations-heading";
    heading.textContent = translations[currentLanguage].sources;
    sources.appendChild(heading);

    const list = document.createElement("ol");
    citations.forEach((citation) => {
      if (!citation || !isSafeWebUrl(citation.url)) return;
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = citation.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = citation.title;
      item.appendChild(link);
      list.appendChild(item);
    });
    sources.appendChild(list);
    chatMessages.appendChild(sources);
  }
}

async function readRoutineResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.toLowerCase().includes("application/json");
  if (!isJson) {
    if (!response.ok) throw new Error(`${fallbackMessage} (HTTP ${response.status})`);
    throw new Error(`${fallbackMessage} (invalid JSON response)`);
  }

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    console.error("Unable to parse the routine response.");
  }

  if (!response.ok) {
    if (typeof data?.error === "string" && data.error) throw new Error(data.error);
    throw new Error(`${fallbackMessage} (HTTP ${response.status})`);
  }

  if (!data || typeof data.routine !== "string" || !data.routine) {
    throw new Error(`${fallbackMessage} (invalid JSON response)`);
  }
  return data;
}

function loadSelection() {
  try {
    const savedIds = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(savedIds)) return;

    const validIds = new Set(products.map((product) => product.id));
    savedIds.forEach((id) => {
      if (validIds.has(id)) selected.add(id);
    });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function persistSelection() {
  localStorage.setItem(storageKey, JSON.stringify([...selected]));
}

function selectedProductsForRequest() {
  return products
    .filter((product) => selected.has(product.id))
    .map((product) => {
      const localized = localizedProduct(product);
      return {
        name: localized.name,
        brand: product.brand,
        category: localized.category,
        area: product.area || "Skincare",
        description: localized.description,
      };
    });
}

// Full catalog sent to the Worker so the AI can recommend any product by id.
function catalogForRequest() {
  return products.map((product) => {
    const localized = localizedProduct(product);
    return {
      id: product.id,
      name: localized.name,
      brand: product.brand,
      category: localized.category,
      area: product.area || "Skincare",
      price: product.price || "",
      description: localized.description,
      url: brandSites[product.brand] || "",
    };
  });
}

function renderCategoryFilters() {
  const allLabel = { en: "All", es: "Todos", zh: "全部", pt: "Todos" }[currentLanguage];
  const categories = ["All", ...discoveryCategories];
  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="category-filter${activeCategory === category ? " active" : ""}"
          type="button"
          data-category="${category}"
          aria-pressed="${activeCategory === category}"
        >
          ${category === "All" ? allLabel : category}
        </button>
      `,
    )
    .join("");
}

function getFilteredProducts() {
  const query = productSearch.value.trim().toLowerCase();
  return products.filter((product) => {
    const localized = localizedProduct(product);
    const productArea = product.area || "Skincare";
    const matchesCategory = activeCategory === "All" || product.type === activeCategory;
    const matchesBrand = activeBrand === "All" || product.brand === activeBrand;
    const searchableText = `${localized.name} ${localized.category} ${localized.description} ${productArea} ${product.brand}`.toLowerCase();
    return matchesCategory && matchesBrand && (!query || searchableText.includes(query));
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  noResults.hidden = filteredProducts.length > 0;
  grid.innerHTML = filteredProducts
    .map((product) => {
      const localized = localizedProduct(product);
      const viewDetails = { en: "View details", es: "Ver detalles", zh: "查看详情", pt: "Ver detalhes" }[currentLanguage];
      const flipBack = { en: "Back", es: "Volver", zh: "返回", pt: "Voltar" }[currentLanguage];
      return `
        <article class="product-item${flippedProducts.has(product.id) ? " flipped" : ""}" data-flip-card="${product.id}">
          <div class="product-flipper">
            <div class="product-front">
              <button
                class="product-card${selected.has(product.id) ? " selected" : ""}"
                type="button"
                data-product-id="${product.id}"
                aria-pressed="${selected.has(product.id)}"
                aria-label="${selected.has(product.id) ? "Unselect" : "Select"} ${localized.name}"
              >
                <img class="product-image" src="${product.image}" alt="" />
                <span class="product-meta">
                  <span class="product-category">${product.brand} · ${localized.category}</span>
                  <span class="product-name">${localized.name}</span>
                </span>
              </button>
              <button class="details-toggle" type="button" data-flip-id="${product.id}" aria-expanded="${flippedProducts.has(product.id)}">
                ${viewDetails} <span aria-hidden="true">↻</span>
              </button>
            </div>
            <div class="product-back" aria-label="${localized.name}">
              <span class="product-category">${localized.category}</span>
              <h3>${localized.name}</h3>
              <p>${localized.description}</p>
              <a class="brand-site-link" href="${brandSites[product.brand]}" target="_blank" rel="noopener noreferrer">Visit ${product.brand}</a>
              <button class="details-toggle back-toggle" type="button" data-flip-id="${product.id}" aria-expanded="${flippedProducts.has(product.id)}">
                ${flipBack} <span aria-hidden="true">↻</span>
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSelection() {
  const count = selected.size;
  selectionCount.textContent = translations[currentLanguage].selectedCount(count);
  generateButton.disabled = count === 0;
  clearSelectionButton.hidden = count === 0;

  if (count === 0) {
    selectedList.innerHTML = `<p class="empty-selection">${translations[currentLanguage].noSelected}</p>`;
    return;
  }

  selectedList.innerHTML = products
    .filter((product) => selected.has(product.id))
    .map((product) => {
      const localized = localizedProduct(product);
      return `
        <span class="selected-chip">
          ${localized.name}
          <button class="chip-remove" type="button" data-remove-id="${product.id}" aria-label="Remove ${localized.name}">
            ×
          </button>
        </span>
      `;
    })
    .join("");
}

function toggleProduct(productId) {
  if (selected.has(productId)) {
    selected.delete(productId);
  } else {
    selected.add(productId);
  }

  persistSelection();
  renderProducts();
  renderSelection();
}

function openProductDetails(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const localized = localizedProduct(product);

  dialogName.textContent = localized.name;
  dialogCategory.textContent = localized.category;
  dialogDescription.textContent = localized.description;
  productDialog.showModal();
}

clearSelectionButton.addEventListener("click", () => {
  selected.clear();
  persistSelection();
  conversation = [];
  chat.hidden = true;
  renderProducts();
  renderSelection();
});

productSearch.addEventListener("input", renderProducts);

categoryFilters.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-category]");
  if (!filter) return;
  activeCategory = filter.dataset.category;
  renderCategoryFilters();
  renderProducts();
});

function setFloatingChatOpen(isOpen) {
  floatingChatPanel.hidden = !isOpen;
  floatingChatToggle.setAttribute("aria-expanded", String(isOpen));
  floatingChatToggle.setAttribute("aria-label", isOpen ? "Close beauty chat" : "Open beauty chat");
  if (isOpen) floatingChatInput.focus();
}

floatingChatToggle.addEventListener("click", () => {
  setFloatingChatOpen(floatingChatPanel.hidden);
});

floatingChatClose.addEventListener("click", () => setFloatingChatOpen(false));

function resetFloatingChat() {
  floatingConversation = [];
  floatingChatInput.value = "";
  floatingChatMessages.replaceChildren();

  const turn = document.createElement("div");
  turn.className = "floating-chat-turn assistant";
  const sender = document.createElement("span");
  sender.className = "floating-chat-sender";
  sender.textContent = translations[currentLanguage].senderAssistant;
  const message = document.createElement("p");
  message.className = "floating-chat-message assistant";
  message.textContent = translations[currentLanguage].assistantGreeting;
  turn.append(sender, message);
  floatingChatMessages.appendChild(turn);
}

floatingChatRefresh.addEventListener("click", resetFloatingChat);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !floatingChatPanel.hidden) setFloatingChatOpen(false);
});

floatingChatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  return submitFloatingQuestion(floatingChatInput.value.trim());
});

async function submitFloatingQuestion(question) {
  if (!question) return;

  const selectedProducts = selectedProductsForRequest();
  floatingConversation.push({ role: "user", content: question });
  floatingChatInput.value = "";

  const userTurn = document.createElement("div");
  userTurn.className = "floating-chat-turn user";
  const userSender = document.createElement("span");
  userSender.className = "floating-chat-sender";
  userSender.textContent = translations[currentLanguage].senderYou;
  const userMessage = document.createElement("p");
  userMessage.className = "floating-chat-message user";
  userMessage.textContent = question;
  userTurn.append(userSender, userMessage);
  floatingChatMessages.appendChild(userTurn);

  const loadingMessage = document.createElement("p");
  loadingMessage.className = "floating-chat-message loading";
  loadingMessage.textContent = translations[currentLanguage].thinking;
  floatingChatMessages.appendChild(loadingMessage);
  floatingChatMessages.scrollTop = floatingChatMessages.scrollHeight;

try {
  const response = await fetch(routineApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: selectedProducts,
      conversation: floatingConversation,
      catalog: catalogForRequest(),
    }),
  });

  const data = await readRoutineResponse(
    response,
    "Unable to answer that question."
  );
  
    loadingMessage.remove();
    const assistantTurn = document.createElement("div");
    assistantTurn.className = "floating-chat-turn assistant";
    const assistantSender = document.createElement("span");
    assistantSender.className = "floating-chat-sender";
    assistantSender.textContent = translations[currentLanguage].senderAssistant;
    const assistantMessage = document.createElement("p");
    assistantMessage.className = "floating-chat-message assistant";
    appendFormattedMessage(assistantMessage, data.routine, (data.products || []).map((product) => product.url));
    assistantTurn.append(assistantSender, assistantMessage);
    floatingChatMessages.appendChild(assistantTurn);
    floatingConversation.push({ role: "assistant", content: data.routine });
    appendProductRecommendations(floatingChatMessages, data.products);

    if (Array.isArray(data.citations) && data.citations.length > 0) {
      const sources = document.createElement("p");
      sources.className = "floating-chat-citations";
      const label = document.createElement("span");
      label.textContent = `${translations[currentLanguage].sources}: `;
      sources.appendChild(label);
      data.citations.forEach((citation, index) => {
        if (!citation || !isSafeWebUrl(citation.url)) return;
        const link = document.createElement("a");
        link.href = citation.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = citation.title;
        sources.appendChild(link);
        if (index < data.citations.length - 1) sources.appendChild(document.createTextNode(" · "));
      });
      floatingChatMessages.appendChild(sources);
    }
  } catch (error) {
    loadingMessage.remove();
    const errorMessage = document.createElement("p");
    errorMessage.className = "floating-chat-message error";
    errorMessage.textContent = error instanceof Error ? error.message : "Unable to answer that question.";
    floatingChatMessages.appendChild(errorMessage);
  } finally {
    floatingChatMessages.scrollTop = floatingChatMessages.scrollHeight;
  }
}

grid.addEventListener("click", (event) => {
  const flipButton = event.target.closest("[data-flip-id]");
  if (flipButton) {
    const productId = flipButton.dataset.flipId;
    if (flippedProducts.has(productId)) {
      flippedProducts.delete(productId);
    } else {
      flippedProducts.add(productId);
    }
    const card = document.querySelector(`[data-flip-card="${productId}"]`);
    card?.classList.toggle("flipped", flippedProducts.has(productId));
    card?.querySelectorAll("[data-flip-id]").forEach((button) => {
      button.setAttribute("aria-expanded", String(flippedProducts.has(productId)));
    });
    return;
  }

  const card = event.target.closest("[data-product-id]");
  if (card) {
    toggleProduct(card.dataset.productId);
  }
});

selectedList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-id]");
  if (removeButton) {
    toggleProduct(removeButton.dataset.removeId);
  }
});

generateButton.addEventListener("click", async () => {
  if (selected.size === 0) return;

  const selectedProducts = selectedProductsForRequest();
  conversation = [];
  chat.hidden = false;
  const creatingText = {
    en: "Creating your personalized routine...",
    es: "Creando tu rutina personalizada...",
    zh: "正在创建您的个性化护肤流程...",
    pt: "Criando sua rotina personalizada...",
  }[currentLanguage];
  chatMessages.innerHTML = `<p class="chat-message loading">${creatingText}</p>`;
  generateButton.disabled = true;
  generateButton.innerHTML = `${translations[currentLanguage].generating} <span aria-hidden="true">·</span>`;

  try {
    const response = await fetch(routineApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts, conversation, catalog: catalogForRequest() }),
    });

    const data = await readRoutineResponse(response, "Unable to generate a routine.");

    chatMessages.innerHTML = "";
    appendChatResponse(data.routine, data.citations, data.products);
    conversation.push({ role: "assistant", content: data.routine });
    chat.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    chatMessages.innerHTML = "";
    const message = document.createElement("p");
    message.className = "chat-message error";
    message.textContent = error.message;
    chatMessages.appendChild(message);
  } finally {
    generateButton.disabled = selected.size === 0;
    generateButton.innerHTML = `<span data-i18n="generateRoutine">${translations[currentLanguage].generateRoutine}</span> <span aria-hidden="true">→</span>`;
  }
});

closeChat.addEventListener("click", () => {
  chat.hidden = true;
});

dialogClose.addEventListener("click", () => productDialog.close());

productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question || chatSend.disabled) return;

  const selectedProducts = selectedProductsForRequest();
  conversation.push({ role: "user", content: question });
  chatInput.value = "";

  const userTurn = document.createElement("div");
  userTurn.className = "chat-turn user";
  const sender = document.createElement("span");
  sender.className = "chat-sender";
  sender.textContent = translations[currentLanguage].senderYou;
  const userMessage = document.createElement("p");
  userMessage.className = "chat-message";
  userMessage.textContent = question;
  userTurn.append(sender, userMessage);
  chatMessages.appendChild(userTurn);

  const loadingMessage = document.createElement("p");
  loadingMessage.className = "chat-message loading";
  loadingMessage.textContent = translations[currentLanguage].thinking;
  chatMessages.appendChild(loadingMessage);
  chatSend.disabled = true;

  try {
    const response = await fetch(routineApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts, conversation, catalog: catalogForRequest() }),
    });

    const data = await readRoutineResponse(response, "Unable to answer that question.");

    loadingMessage.remove();
    appendChatResponse(data.routine, data.citations, data.products);
    conversation.push({ role: "assistant", content: data.routine });
  } catch (error) {
    loadingMessage.remove();
    const errorMessage = document.createElement("p");
    errorMessage.className = "chat-message error";
    errorMessage.textContent = error instanceof Error ? error.message : "Unable to answer that question.";
    chatMessages.appendChild(errorMessage);
  } finally {
    chatSend.disabled = false;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

loadSelection();
applyLanguage(localStorage.getItem(languageStorageKey) || "en");
