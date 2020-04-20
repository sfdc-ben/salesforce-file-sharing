public with sharing class PicklistController {
    @AuraEnabled        
    public static PicklistDetails getPickListValuesIntoObj(String objectType, String selectedField){
        PicklistDetails thisPicklistObj = new PicklistDetails();
        
        List<String> pickListValuesList = new List<String>();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        String fieldName = fieldResult.getLabel();
        thisPicklistObj.name = fieldName;
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }
        thisPicklistObj.values = pickListValuesList;     
        return thisPicklistObj;
    }

    class PicklistDetails {
        @AuraEnabled
        public String name{get; set;}
        @AuraEnabled
        public List<String> values{get; set;}
    }
}
