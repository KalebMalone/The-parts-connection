// import { useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import { useParams } from "react-router-dom";
// import styled from 'styled-components';

// function Category() {
//     const [category, setCategory] = useState({ exercises: [] });
//     const { categoryId } = useParams();

//     useEffect(() => {
//         (async () => {
//             const resp = await fetch(`/api/v1/categories/${categoryId}`);
//             const data = await resp.json();
//             if (resp.ok) {
//                 setCategory(data);
//             } else {
//                 toast.error(data.error);
//             }
//         })();
//     }, [categoryId]);

//     const { id, name, } = category;

//     return (
//         <CardDetail id={id}>
//             <h1>{name}</h1>
//             <div className="wrapper">
//             </div>
//         </CardDetail>
//     );
// }

// export default Category;

// const CardDetail = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 30px;
//   border-radius: 15px;
//   max-width: 900px;
//   margin: 30px auto;
//   background-color: #f9f9f9;
//   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
//   transition: transform 0.3s ease-in-out;
//   &:hover {
//     transform: scale(1.02);
//   }

//   h1 {
//     font-size: 2.5rem;
//     color: #2c3e50;
//     font-weight: 700;
//     text-align: center;
//     margin-bottom: 15px;
//   }

//   .wrapper {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-top: 20px;
//   }

//   h2 {
//     font-size: 1.8rem;
//     margin-top: 20px;
//     color: #34495e;
//     font-weight: 600;
//     margin-bottom: 20px;
//   }

//   ul {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr); /* 2 columns */
//     gap: 20px; /* Increased gap for more space between items */
//     margin-top: 20px;
//     padding: 0;
//     list-style-type: none;
//   }

//   li {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #fff;
//     border-radius: 10px;
//     box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
//     padding: 20px;
//     transition: transform 0.3s ease-in-out;
//     cursor: pointer;
//   }

//   li:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 4px 18px rgba(0, 0, 0, 0.15);
//   }

//   p {
//     color: #e74c3c;
//     font-size: 1.2rem;
//     text-align: center;
//     margin-top: 30px;
//   }
// `;