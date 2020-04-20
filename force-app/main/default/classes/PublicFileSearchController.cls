public with sharing class PublicFileSearchController {
    @AuraEnabled
    public static List<Public_File__c> loadFiles(String searchTerm, String value, String field) {

        if (searchTerm == null) {
            searchTerm = '%';
        } else {
            searchTerm = searchTerm.trim();
            searchTerm = '%'+ searchTerm + '%';
        }

        if (value == null) {
            value = '%';
        } else if (value == '') {
            value = '%';
        }

        system.debug('term='+searchTerm+' value='+value+' field='+field);

        if (field == null) {
            list<Public_File__c> files = Database.query('SELECT Id, Name, File_Identifier__c, Sharing_URL__c FROM Public_File__c WHERE Name LIKE :searchTerm ORDER BY Name ASC LIMIT 3');
            system.debug('null');
            return files;
        } else if (field == '') {
            list<Public_File__c> files = Database.query('SELECT Id, Name, File_Identifier__c, Sharing_URL__c FROM Public_File__c WHERE Name LIKE :searchTerm ORDER BY Name ASC LIMIT 3');
            system.debug('empty');
            return files;
        } else {
            list<Public_File__c> files = Database.query('SELECT Id, Name, File_Identifier__c, Sharing_URL__c FROM Public_File__c WHERE ' + field + ' LIKE :value AND Name LIKE :searchTerm ORDER BY Name ASC LIMIT 3');
            system.debug('category');
            return files;
        }

        
    }
}
