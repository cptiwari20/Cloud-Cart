// test for AMAZON

// find add to cart button and add a new button over it.
const setAddToCCButtons = () => {
    if (window.location.href.includes("amazon")) {
        $('#ppd #addToCart_feature_div').each(function () {
            const btn = $(this)
            if (!btn.prev('.add-to-cloudCart').length) {
                btn.before('<button type="button" class="add-to-cloudCart">Add to the CloudCart</button>')
            btn.hide()   
            }
        })
    }
}
// get the inside the main content
// get name, description, url, prize, images, and quantity.
const getProductDetail = (btn) => {
    const containerDetail = btn.parentsUntil('#dp')
    const product = {}
    product.name = containerDetail.find('#titleSection #title span').text();
    product.description = 'Test'

    let images = [];
    containerDetail.find('.imgTagWrapper img').each(function () {
        images.push($(this).attr('src'));
      })
    product.image = images;
    product.price = containerDetail.find('#priceblock_ourprice_row #priceblock_ourprice').text()
    product.url = window.location.href
  
    return product
  }





// Add item to cloud cart
const addItemToCC = (btn) => {
    const data = getProductDetail(btn)
    chrome.storage.local.get(['cloudItems'], function(res){
        let newItem;
        if(Array.isArray(res.cloudItems)){
            newItem = [...res.cloudItems, data];
        }else{
            newItem = [data];
        }
        // add that data to local storage..
        chrome.storage.local.set({cloudItems: newItem}, function(params) {
            chrome.runtime.sendMessage({id: 'notifyItemAdded'}, function(response){})
        });
    })
}

// On Click
$('body')
    .on('click', '.add-to-cloudCart', function () {
        addItemToCC($(this))
        $this = $(this);
      })

// call a function in every 2 second, too find the button and add a new one.
setInterval(
    setAddToCCButtons,
    2000
)