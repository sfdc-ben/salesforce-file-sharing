({
    loadFiles : function (component, event) {
        var searchTerm = component.get("v.searchKeyWord");
        var selectedValue = component.get("v.selectedValue");
        var fieldName = component.get("v.picklistToFilter");
        var action = component.get("c.loadFiles");
        action.setParams({
            "searchTerm": searchTerm,
            "value": selectedValue,
            "field": fieldName
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.files", storeResponse);
                console.log(storeResponse);
            };
        });
        $A.enqueueAction(action);
    }
})
