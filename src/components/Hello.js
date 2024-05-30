import React from 'react'

export default function hello() {
  return (
    <div>
      <div style={{width:'1500px',height:'700px',marginLeft:'20px',marginTop:'20px',display:'flex'}}>

        <div style={{height:'698px',width:'300px',paddingLeft:'40px',paddingTop:'50px',backgroundColor:'black',color:'white',borderRadius:'20px'}}>
            <h1 style={{marginLeft:'30px',color:'red'}}>Hello</h1>
            <ul style={{marginTop:'50px',fontSize:'25px'}}>
             <li style={{marginBottom:'60px'}} >abc</li><li style={{marginBottom:'60px'}} >abc</li><li style={{marginBottom:'60px'}} >abc</li><li style={{marginBottom:'60px'}} >abc</li>
            </ul>
        </div>
        <div style={{height:'698px',width:'1000px'}}>white </div>
        <div style={{height:'698px',width:'300px'}}>green</div>
      </div>
    </div>
  )
}
