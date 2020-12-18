chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.id === 'getItemsData'){
        chrome.storage.local.get(['cloudItems'], function(res){
            return sendResponse({status: true, data: res.cloudItems})
        }) 
    }
    if(request.id === 'removeItem'){
        console.log({request})
        chrome.storage.local.get(['cloudItems'], function(res){
            let updatedItems = res.cloudItems
            updatedItems.splice(request.indexId, 1)
            chrome.storage.local.set({cloudItems: updatedItems}, function(res){
                chrome.notifications.create('Somedata', {
                    type: 'basic',
                    title: 'Item Removed',
                    message: 'One item Has been removed.',
                    iconUrl: 'asset/images/logo.png'
                })
                return sendResponse({status: true, data: updatedItems})
            })
        }) 
    }

    if(request.id === 'notifyItemAdded'){
        chrome.notifications.create('Somedata', {
            type: 'basic',
            title: 'Item added',
            message: 'New Item has been added',
            iconUrl: 'asset/images/logo.png'
        })
    }

    
    return true
})
