({
    doInit : function(component, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        component.set("v.userId", userId);
        component.find("recordLoader").getNewRecord(
            "Public_File__c",
            null,
            false,
            $A.getCallback(function() {
                var rec = component.get("v.fileRecord");
                var error = component.get("v.recordError");
                if (error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
            })
        );    
    },

    saveRecord : function(component, event, helper) {
        var publicName = component.get("v.publicFileName");
        component.set("v.fileRecord.Name", publicName);
        var tempRec = component.find("recordLoader");
        tempRec.saveRecord($A.getCallback(function(result) {
            console.log(result.state);
            var resultsToast = $A.get("e.force:showToast");
            if (result.state === "SUCCESS") {
                var recId = result.recordId;
                helper.updateFileLocation(component, recId);                
            } else if (result.state === "ERROR") {
                console.log('Error: ' + JSON.stringify(result.error));
                resultsToast.setParams({
                    "title": "Error",
                    "message": "There was an error saving the record: " + JSON.stringify(result.error)
                });
                resultsToast.fire();
            } else {
                console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
            }
        }));
    },

    handleUploadFinished : function (component, event) {
        var uploadedFiles = event.getParam("files");
        component.set("v.uploadedFiles", uploadedFiles);
        component.set("v.fileUploaded", true);
        console.log(uploadedFiles[0]);
    },

    cancelDialog: function(component, event, helper) {
        var homeEvt = $A.get("e.force:navigateToObjectHome");
        homeEvt.setParams({
            "scope": "Public_File__c"
        });
        homeEvt.fire();
    },
})
