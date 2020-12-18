window.onload = function() {
    chrome.runtime.sendMessage({id: 'getItemsData'}, function(response){
      if(response.data){
        if(response.data.length !==0){
            addItems(response);
        }else{
            clearListItem()
        }
      }
    //   console.log(response)
    })
}

const removeItem = (indexId) => {
    chrome.runtime.sendMessage({id: 'removeItem', indexId}, function(response){
        addItems(response)
    })
}

const addItems = (response) => {
    // clearListItem()
    console.log(response)
    $('#listItems').empty()
    response.data.forEach((element, index) => {
        $('#listItems').append(`
        <div class="card mb-2" style="width: 18rem;">
            <img class="card-img-top" src="${element.image[0]}" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">${element.name}</p>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><b>${element.price ? element.price : 'Unknown Price'}</b></p>
                    <a href='${element.url}' target='_blank' class="card-link">Go to product page</a>
                </div>
            <div class="card-footer">
                <button class='btn btn-sm btn-primary' disabled>Edit</button>
                <button class='btn btn-sm btn-danger remove-item' data-index='${index}'>Remove</button>
            </div>
        </div>`)
    });
}

const clearListItem = () => {
    $('#listItems').html(`
    <div class="card mb-2" style="width: 18rem;">
            <div class="card-body">
                <p class="card-text">Waiting for your new items.</p>
            </div>
        <div class="card-footer">
            <button class='btn btn-sm btn-primary' disabled>Explore More</button>
        </div>
    </div>`);
}

$('body')
    .on('click', '.remove-item', function () {
        $this = $(this);
        removeItem($this.attr('data-index'))
      })

//   <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
//                         <div class="carousel-inner">
//                             <div class="carousel-item active">
//                                 <img class="d-block w-100" src="${element.image[0]}" alt="Image slide">
//                             </div>
//                             <div class="carousel-item active">
//                                 <img class="d-block w-100" src="${element.image[1]}" alt="Image slide">
//                             </div>
//                             <div class="carousel-item active">
//                                 <img class="d-block w-100" src="${element.image[2]}" alt="Image slide">
//                             </div>
//                         </div>
//                         <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
//                             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                             <span class="sr-only">Previous</span>
//                         </a>
//                         <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
//                             <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                             <span class="sr-only">Next</span>
//                         </a>