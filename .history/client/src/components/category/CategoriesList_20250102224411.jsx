// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// function CategoriesList() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       const resp = await fetch('/api/v1/categories');
//       const data = await resp.json();

//       if (resp.ok) {
//         setCategories(data);
//       } else {
//         toast.error(data.error);
//       }
//     })();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/categories/${categoryId}/products`);
//   };

//   return (
//     <CategoriesContainer>
//       <h1>Explore Our Categories</h1>
//       <CategoriesGrid>
//         {categories.map((category) => (
//           <CategoryCard key={category.id} onClick={() => handleCategoryClick(category.id)}>
//             <img src={`/image/${category.image_url}`} alt={category.name} />
//             <h2>{category.name}</h2>
//           </CategoryCard>
//         ))}
//       </CategoriesGrid>
//     </CategoriesContainer>
//   );
// }

// export default CategoriesList;

// const CategoriesContainer = styled.div`
//   max-width: 1200px;
//   margin: 40px auto;
//   padding: 30px;
//   background-color: #ffffff;
//   border-radius: 10px;
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
//   text-align: center;

//   h1 {
//     font-size: 36px;
//     color: #333;
//     font-weight: 600;
//     margin-bottom: 40px;
//     font-family: 'Roboto', sans-serif;
//   }
// `;

// const CategoriesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//   gap: 40px;
// `;

// const CategoryCard = styled.div`
//   background-color: #fff;
//   border: 1px solid #f1f1f1;
//   border-radius: 12px;
//   padding: 35px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
//   cursor: pointer;

//   &:hover {
//     transform: translateY(-8px);
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
//     background-color: #fafafa;
//   }

//   img {
//     max-width: 100%;
//     height: 200px; /* Adjust to suit your design */
//     object-fit: cover; /* Ensures the image is cropped to fit */
//     border-radius: 10px;
//     margin-bottom: 20px;
//   }

//   h2 {
//     font-size: 32px;
//     font-weight: 500;
//     color: #333;
//     margin: 0;
//     transition: color 0.3s ease;
//   }

//   &:hover h2 {
//     color: #007bff;
//   }
// `;
