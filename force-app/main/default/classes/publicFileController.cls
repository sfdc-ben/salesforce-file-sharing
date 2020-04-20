public with sharing class publicFileController {
    @AuraEnabled
    public static string createSharing(String documentId, String fileName, String recordId) {
        
        ContentDocument thisDocTitle = [SELECT Title FROM ContentDocument WHERE Id =:documentId];
        
        if (String.isBlank(fileName)) {
            fileName = thisDocTitle.Title;
        }

        ContentVersion thisDocVers = [SELECT Id FROM ContentVersion WHERE ContentDocumentId =:documentId AND IsLatest = TRUE];
        
        ContentDistribution newDistribution = new ContentDistribution(ContentVersionId=thisDocVers.Id, Name=fileName, RelatedRecordId=recordId, PreferencesAllowOriginalDownload=True, PreferencesAllowPDFDownload=True, PreferencesAllowViewInBrowser=True, PreferencesLinkLatestVersion=True, PreferencesNotifyOnVisit=False, PreferencesNotifyRndtnComplete=False);
        insert newDistribution;
        system.debug(newDistribution);

        ContentDistribution thisDistribution = [SELECT Id, DistributionPublicUrl FROM ContentDistribution WHERE Id= :newDistribution.Id];
        
        Public_File__c thisPublicFile = new Public_File__c(Id=recordId, Name=fileName, File_Identifier__c=documentId, Original_File_Name__c=thisDocTitle.Title, Sharing_URL__c=thisDistribution.DistributionPublicUrl);
        update thisPublicFile;

        String returnId = thisDistribution.Id;
        return returnId;
    }

    @AuraEnabled
    public static string moveFileCreateSharing(String documentId, String fileName, String recordId) {
        
        ContentDocumentLink docLink = new ContentDocumentLink(ContentDocumentId=documentId, LinkedEntityId=recordId);
        system.debug(docLink);
        insert docLink;

        
        ContentDocument thisDocTitle = [SELECT Title FROM ContentDocument WHERE Id =:documentId];
        
        if (String.isBlank(fileName)) {
            fileName = thisDocTitle.Title;
        }

        ContentVersion thisDocVers = [SELECT Id FROM ContentVersion WHERE ContentDocumentId =:documentId AND IsLatest = TRUE];
        
        ContentDistribution newDistribution = new ContentDistribution(ContentVersionId=thisDocVers.Id, Name=fileName, RelatedRecordId=recordId, PreferencesAllowOriginalDownload=True, PreferencesAllowPDFDownload=True, PreferencesAllowViewInBrowser=True, PreferencesLinkLatestVersion=True, PreferencesNotifyOnVisit=False, PreferencesNotifyRndtnComplete=False);
        insert newDistribution;
        system.debug(newDistribution);

        ContentDistribution thisDistribution = [SELECT Id, DistributionPublicUrl FROM ContentDistribution WHERE Id= :newDistribution.Id];
        
        Public_File__c thisPublicFile = new Public_File__c(Id=recordId, Name=fileName, File_Identifier__c=documentId, Original_File_Name__c=thisDocTitle.Title, Sharing_URL__c=thisDistribution.DistributionPublicUrl);
        update thisPublicFile;

        String returnId = thisDistribution.Id;
        return returnId;
    }
}
