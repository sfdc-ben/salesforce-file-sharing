({
    doInit : function (component, event, helper) {
        helper.loadFiles(component, event);
    },

    handlePicklistChange : function (component, event, helper) {
        var selectedVal = event.getParam("value");
        component.set("v.selectedValue", selectedVal);
        helper.loadFiles(component, event);
    },

    handleSearchTermChange : function (component, event, helper) {
        var delay=400;
        var timer = component.get("v.timer");
        clearTimeout(timer);

        var timer = setTimeout(function() {
            helper.loadFiles(component, event);
            clearTimeout(timer);
            component.set('v.timer', null);
        }, delay);

        component.set('v.timer', timer);
    }
})
