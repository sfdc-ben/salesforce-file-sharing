({
    doInit : function(component, event, helper) {
        var delay=500; //4 seconds
        setTimeout(function() {
            $A.get('e.force:refreshView').fire();
        }, delay);
    },
    
    handleUploadFinished : function (component, event) {
        var uploadedFiles = event.getParam("files");
        var publicFileName = component.get("v.publicFileName");
        var record = component.get("v.recordId");
        console.log(uploadedFiles[0]);
        var action = component.get("c.createSharing");
        action.setParams({
            "documentId" : uploadedFiles[0].documentId,
            "fileName" : publicFileName,
            "recordId" : record
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                var toastEvent = $A.get("e.force:showToast");
                component.set("v.publicFileName", "");
                component.set("v.sectionOpen", false);
                component.find('recordLoader').reloadRecord(true); 
                toastEvent.setParams({
                    "title" : "Upload Successful",
                    "type" : "Success",
                    "message" : "The new file has been uploaded and a sharing link created"
                });
                toastEvent.fire();
            } else {
                // Add some error handler
            }
        });
        $A.enqueueAction(action);
    },

    handleSectionSwitch : function (component, event, helper) {
        var sectionOpen = component.get("v.sectionOpen");
        component.set("v.sectionOpen", !sectionOpen);
    },

    handleCopyLink : function (component, event, helper) {
        var url = component.get("v.fileRecord.Sharing_URL__c")
        var hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("value", url);
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        document.execCommand("copy");
        document.body.removeChild(hiddenInput);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title" : "Copied!",
            "type" : "Success",
            "message" : "The public file link has been copied to your clipboard"
        });
        toastEvent.fire();
    },
})
