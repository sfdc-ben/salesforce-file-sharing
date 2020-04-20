({
    doInit : function(component, event, helper) {
        var field = component.get("v.fieldName")
        console.log(field);
        if (field != "") {
            console.log("running");
            var action = component.get("c.getPickListValuesIntoObj");
            action.setParams({
                objectType: component.get("v.sObjectName"),
                selectedField: field
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    component.set("v.picklistName", storeResponse.name)
                    var list = storeResponse.values;
                    var valObj = list.map(val => {
                        console.log(val);
                        const label = val;
                        const value = val;
                        return {
                            label : label, value : value
                        };
                    });
                    component.set("v.picklistValues", valObj);
                } else {
                    // Error
                }
            })
            $A.enqueueAction(action);
        }
    }
})
