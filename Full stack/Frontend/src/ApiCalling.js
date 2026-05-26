import React, { useEffect, useState } from 'react'
import Header from './Header'


const ApiCalling = () => {
 
  
  const [products, setProducts] = useState([])

  useEffect(() => {

    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products)
      })
      .catch((error) => {
        console.log("Error:", error)
      })

  }, [])

  return (
    <>
    <Header></Header>
    <div style={{ padding: "20px" }}>

      <h1>Products List</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}
      >

        {
          products.map((product) => (

            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px"
              }}
            >

              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <h2>${product.price}</h2>

            </div>

          ))
        }

      </div>

    </div>
    </>
  )
}

export default ApiCalling