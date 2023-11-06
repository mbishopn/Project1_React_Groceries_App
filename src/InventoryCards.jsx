/* This component will render product related info according to 
object contents passed as parameter.
it receives to props:
- item, is an object from products db
- onClick, function to handle click on add-to-cart button

*/


export default function InventoryCards({item, onClick})
{

//let's convert the object into array to use map and render its contents in return function
const info=Object.entries(item)
return(
        <div className="Inventory-Card" >
                {
                    info.map((data)=>(  
                        (
                            // looking for simplicity I used ternary operator to handle id, images and other data
                            // also I decided to handle presentation throug css instead of adding an element for every
                            // key/value in the array. I'm not sure if this is better but it helped me to remember
                            // some css. NOTE: for sure there's something simpler and easier to understand but I
                            // already had this I was to tired to change it before submitting, I'll try later :)
                            (data[0]==="id")                                                    // is this the id?, then create the button
                            ?<button key={data[0]} onClick={onClick} value={data[1]}>Add to cart</button>
                            : (data[0]==="image")                                               // image? then put it in a img tag
                            ? <img key={data[0]} src={data[1]}/>
                            : <div key={data[0]} className="Inventory-data">{data[1]}</div>     // otherwise just use a div to render other info
                        )
                        ))
               }
                    
        </div>
    )
}

//<input type="hidden" name="id" value={crypto.randomUUID()}></input>