/*
This component controls the logic of application, it will manage interaction between
products dabase allocated in products.js,
Inventory display handled with InventoryCards component and
Cart info rendered with CartList component
*/

// first let's import all files containgin our code/db
import { useState } from "react"  // to use hooks/states
import {products} from "./data/products.js" // our products DB
import CartList from "./cartList.jsx" // component rendering cart
import InventoryCards from "./inventoryCards.jsx" // component rendering inventory

export default function GroceriesApp(){

// we'll use cartItem variable to add new elements to our Cart, I'm not using a hook here because
// I don't really need to hold its state
let cartItem={
    uuid:"",
    name:"",
    price:0
}

const [cart, setCart]= useState([]) // this array is my Cart list, initially it's empty but it will be filled with cartItem objects
const [Total, setTotal]=useState(0) // hook for Total amount of current sale

// ----------- handleSubmission FUNCTION ---------------------------------------
// will be passed to Inventory Card to handle every time we click on Add to cart buttons 
// when the button is clicked I use that event to get the product id stored in button tag value
const handleSubmission = (evt) => {
//console.log(evt.target.value)
// Fill cartItem object acording the product Id selected in the Inventory
cartItem.uuid=crypto.randomUUID()
cartItem.name=products.find((product)=>product.id===evt.target.value).productName
cartItem.price=products.find((product)=>product.id===evt.target.value).price

setCart((prevCart)=>{return[...prevCart,{cartItem}]}) // Now, insert the new cartItem in the cart Array
setTotal((prevTotal)=>{ return prevTotal+parseFloat(cartItem.price.replace(/\$/,""))}) // every time an item is added, we add the price to the Total

}

// ---------------- removeItem FUNCTION -----------------------------------------
// will remove items from our cart, using random uuid to identify them
const removeItem=(uuid)=> {
setCart((prevcart)=>{    return prevcart.filter((item)=> item["cartItem"].uuid!==uuid)}) // remove cartItem from cart Array
setTotal((prevTotal)=>{return prevTotal- parseFloat(cart.find((item)=>item["cartItem"].uuid===uuid)["cartItem"].price.replace(/\$/,""))}) // substracts cartItem price from Total
}

 // --------------- emptyCart FUNCTION ------------------------------------------
 // just deletes the whole cart and reinitialize Total to 0 
const emptyCart = ()=> {
    setCart((prevCart)=>{return prevCart=[]})
    setTotal((prevTotal)=>{return prevTotal=0})
}


return(
        <div className="GroceriesApp-Container">
        {
            <div className="Inventory-Container">
            {   // by mapping products array, every product in database is passed as prop "item" for InventoryCards component, 
                products.map((product)=>(
                    <InventoryCards         // THIS COMPONENT renders inventory items
                        key={product.id}    // only to get rid of the keys error
                        item={product}      // every item in inventory
                        onClick={handleSubmission} // passing the function to Add current item to Cart
                    />
                    )
                )
            }
            </div>
        }
            {/* This component renders our lovely Cart */}
            <CartList
                cart={cart}             // the array containing all items in the cart
                emptyCart={emptyCart}   // function to get the cart empty
                removeItem={removeItem} // function to remove 1 item by clicking on its remove button
                Total={Total}           // Variable to print total addition
            />
        </div>
    )
}