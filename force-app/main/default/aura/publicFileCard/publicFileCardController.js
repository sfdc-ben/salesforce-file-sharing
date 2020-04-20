({
    handleCopyLink : function(component, event, helper) {
        var url = component.get("v.fileCard.Sharing_URL__c")
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
    }
})
