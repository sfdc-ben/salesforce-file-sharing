({
    updateFileLocation : function (component, recId) {
        var uploadedFiles = component.get("v.uploadedFiles");
        console.log(uploadedFiles);
        var publicFileName = component.get("v.publicFileName");
        var action = component.get("c.moveFileCreateSharing");
        action.setParams({
            "documentId" : uploadedFiles[0].documentId,
            "fileName" : publicFileName,
            "recordId" : recId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log(storeResponse);
                var delay=500; //4 seconds
                setTimeout(function() {
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": recId
                    });
                    navEvt.fire();
                }, delay);
                
            } else {
                // Add some error handler
            }
        });
        $A.enqueueAction(action);
    }
})
