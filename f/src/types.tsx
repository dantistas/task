
interface CVE_Data_Meta {
    ID:string;
    ASSIGNER:string;
}

interface Problemtype_Data{
    problemtype_data:{
        description:{
            lang:string;
            value:string; 
        }[]
    }[]
}

interface Reference_Data {
    url:string;
    name:string;
    refsource:string;
    tags:string[]
}

interface References {
    reference_data: Reference_Data[]
}

interface Description {
    description_data:{
        lang:string;
        value:string;
    }[]
}

interface Configurations{
    CVE_data_version:string;
    nodes:{
        operator:string;
        cpe_match:{
            vulnerable:boolean;
            cpe23Uri:string;
            versionEndExcluding:string
        }[]
    }[]
}

interface Impact{
    baseMetricV2:{
        cvssV2:{
            version:string;
            vectorString:string;
            accessVector:string;
            accessComplexity:string;
            authentication:string;
            confidentialityImpact:string;
            integrityImpact:string;
            availabilityImpact:string;
            baseScore:number;
        };
        severity:string;
        exploitabilityScore:number;
        impactScore:number;
        acInsufInfo:boolean;
        obtainAllPrivilege:boolean;
        obtainUserPrivilege:boolean;
        obtainOtherPrivilege:boolean;
        userInteractionRequired:boolean;
    }
}

interface CVE {
    data_type:string;
    data_format:string;
    data_version:string;
    CVE_data_meta:CVE_Data_Meta;
    problemtype:Problemtype_Data;
    references:References;
    description: Description;
}

export interface CVE_Item {
    cve:CVE;
    configurations:Configurations;
    impact: Impact;
    publishedDate:string;
    lastModifiedDate:string
  }
  
  export interface Data {
    CVE_data_type: string;
    CVE_data_format: string;
    CVE_data_version: string;
    CVE_data_numberOfCVEs: string;
    CVE_data_timestamp:string;
    CVE_Items: CVE_Item[];
  
  }
  