import images from "../Image/images"

// Header
export const navOption = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Our Store",
    to: "/products",
  },
  {
    title: "Blogs",
    to: "/blogs",
  },
  {
    title: "Contact",
    to: "/contact",
  },
]

//Home
interface ISmallerCart {
  title: string
  product: string
  info: string
  image: string
  to: string
}

export const smallerCart: ISmallerCart[] = [
  {
    title: "BEST SALE",
    product: "MacBook",
    info: `From $999.0 `,
    image: images.catBanner1,
    to: "/products/Mac/1",
  },
  {
    title: "15% OFF",
    product: "Apple Watch 9",
    info: "Shop the latest band styles and colors",
    image: images.catBanner2,
    to: "/products/Apple%20Watch/17",
  },
  {
    title: "NEW ARRIVAL",
    product: "Buy IPad Air",
    info: "From $599",
    image: images.catBanner3,
    to: "/products/iPad/12",
  },

  {
    title: "FREE ENGRAVING",
    product: "AirPods Max",
    info: "High-fidelity playback & ultra-low distortion",
    image: images.catBanner4,
    to: "/products/Airpods/22",
  },
]

export interface ITotalCart {
  image: string
  title: string
  info: string
}

export const totalServices: ITotalCart[] = [
  {
    image: images.service1,
    title: "Free Shipping",
    info: "From all orders over $100",
  },
  {
    image: images.service2,
    title: "Daily Surprise Offers",
    info: "Save up to 25% off",
  },
  {
    image: images.service3,
    title: "Support 24/7",
    info: "Shop with an expert",
  },
  {
    image: images.service4,
    title: "Affordable Prices",
    info: "Get factory direct price",
  },
  {
    image: images.service5,
    title: "Secure Payments",
    info: "100% protected payment",
  },
]

export interface ICategory {
  image: string
  product: string
  quantity: number
}

export const categories: ICategory[] = [
  {
    image: images.laptop,
    product: "Computers & Laptop",
    quantity: 10,
  },
  {
    image: images.camera,
    product: "Cameras & Videos",
    quantity: 10,
  },
  {
    image: images.smartTV,
    product: "Smart Televison",
    quantity: 10,
  },
  {
    image: images.smartWatchs,
    product: "Smart Watches",
    quantity: 10,
  },
  {
    image: images.gaming,
    product: "Music & Gaming",
    quantity: 10,
  },
  {
    image: images.mobile,
    product: "Mobiles & Tablets",
    quantity: 10,
  },
  {
    image: images.headphone,
    product: "Headphone",
    quantity: 10,
  },
  {
    image: images.airpod,
    product: "Accesories",
    quantity: 10,
  },
  {
    image: images.speaker,
    product: "Portable Speaker",
    quantity: 10,
  },
  {
    image: images.appliance,
    product: "Home Appliances",
    quantity: 10,
  },
]

export const brandList: string[] = [
  images.brand1,
  images.brand2,
  images.brand3,
  images.brand4,
  images.brand5,
  images.brand6,
  images.brand7,
  images.brand8,
]

export interface IBlogList {
  date: string
  image: string
  title: string
}

export const blogList: IBlogList[] = [
  {
    date: "05 Oct, 2023",
    image: images.blog1,
    title: "A Beutiful Sunday Morning Renaissance...",
  },
  {
    date: "05 Oct, 2023",
    image: images.blog2,
    title: "A Beutiful Sunday Morning Renaissance...",
  },
  {
    date: "05 Oct, 2023",

    image: images.blog3,
    title: "A Beutiful Sunday Morning Renaissance...",
  },
  {
    date: "05 Oct, 2023",

    image: images.blog4,
    title: "A Beutiful Sunday Morning Renaissance...",
  },
]

export interface IProductList {
  defaultImage: string
  hoverImage: string
  price: number
  title: string
  brand: string
}

export const productList: IProductList[] = [
  {
    brand: "Havels",
    defaultImage: images.smartWatchs,
    hoverImage: images.smartWatchs2,
    price: 100,
    title: "Headphone",
  },
  {
    brand: "Havels",
    defaultImage: images.smartWatchs,
    hoverImage: images.smartWatchs2,
    price: 100,
    title: "Headphone",
  },
  {
    brand: "Havels",
    defaultImage: images.smartWatchs,
    hoverImage: images.smartWatchs2,
    price: 100,
    title: "Headphone",
  },
  {
    brand: "Havels",
    defaultImage: images.smartWatchs,
    hoverImage: images.smartWatchs2,
    price: 100,
    title: "Headphone",
  },
]

export const productCardActionIcons: string[] = [
  images.prodCompare,
  images.view,
  images.addcart,
]

export interface IFamousList {
  image: string
  detail: string
  productname: string
  description: string
  to: string
  categoryId: number
}

export const famousList: IFamousList[] = [
  {
    image: images.famous1,
    detail: "Big Screen",
    productname: "Apple Watch Collection",
    description: "From $249",
    to: "/products/Apple%20Watch",
    categoryId: 4,
  },
  {
    image: images.famous2,
    detail: "Studio Display",
    productname: "MacBook Collection",
    description: "From $249",
    to: "/products/Mac",
    categoryId: 1,
  },
  {
    image: images.famous3,
    detail: "iPhone",
    productname: "iPhone Collection",
    description: "From $429 ",
    to: "/products/iPhone",
    categoryId: 2,
  },
  {
    image: images.famous4,
    detail: "Home Speaker",
    productname: "HomePod Collection",
    description: "From $699",
    to: "/products/HomePod",
    categoryId: 6,
  },
]

export interface ISelectFilter {
  value: number
  label: string
  disabled?: boolean
  selected?: boolean
}

export const selectFilterData: ISelectFilter[] = [
  { value: 0, label: "Features", disabled: true, selected: true },
  { value: 1, label: "Alphabetically, A-Z" },
  { value: 2, label: "Alphabetically, Z-A" },
  { value: 3, label: "Price, low to high" },
  { value: 4, label: "Price, high to low" },
]

export const featureImages: string[] = [
  images.electronics,
  images.jewelry,
  images.menClothing,
  images.womenClothing,
]
