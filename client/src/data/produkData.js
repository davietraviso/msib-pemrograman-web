import produk1 from '../assets/img/produk/produk_minyak.png'
import produk2 from '../assets/img/produk/produk_maggot.png'
import produk3 from '../assets/img/produk/produk_larva.png'
import produk4 from '../assets/img/produk/produk_pellet.png'

const productsData = [ 
    {
      id: 1,
      image: produk1, 
      name: "Minyak Maggot Premium",
      stok: 25,
      desc_title: "Deskripsi",
      description: [ "Minyak Maggot berkualitas tinggi, kaya akan asam lemak dan protein. Cocok sebagai nutrisi tambahan untuk pakan ternak dan bahan baku kosmetik alami. Mendukung pertumbuhan hewan secara optimal."],
      price: "30000",
    },
    {
      id: 2,
      image: produk2,
      name: "Maggot Kering Nutrisi Tinggi",
      stok: 16,
      desc_title: "Deskripsi",
      description: [ "Maggot kering kaya protein dan lemak sehat, pilihan sempurna untuk pakan ternak alami. Tahan lama dan mudah disimpan, cocok untuk bisnis peternakan maupun hobi."],
      price: "40000",
    },
    {
        id: 3,
        image: produk3,
        name: "Larva Maggot Hidup Segar",
        stok: 16,
        desc_title: "Deskripsi",
        description: [ "Larva maggot hidup segar, cocok untuk pakan ikan, unggas, dan reptil. Mengandung nutrisi alami untuk mendukung kesehatan dan pertumbuhan ternak Anda."],
        price: "50000",
      },
      {
        id: 4,
        image: produk4,
        name: "Pelet Larva Maggot",
        stok: 16,
        desc_title: "Deskripsi",
        description: [ "Pelet praktis dari larva maggot yang kaya nutrisi, ideal untuk pakan ternak. Dikeringkan dan diproses dengan teknologi terbaru untuk kandungan nutrisi yang terjaga."],
        price: "60000",
      },
      
    // Add more products as needed
  ];
  
  export default productsData;
  